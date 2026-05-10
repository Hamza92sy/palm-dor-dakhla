import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

// Resend uses Svix-style HMAC-SHA256 signatures — no extra dependency needed.
// Signed content: "{svix-id}.{svix-timestamp}.{rawBody}"
// Secret format:  "whsec_<base64>" — strip prefix, base64-decode, use as HMAC key.
function verifySignature(rawBody: string, headers: Headers, secret: string): boolean {
  const msgId  = headers.get('svix-id')
  const msgTs  = headers.get('svix-timestamp')
  const msgSig = headers.get('svix-signature')
  if (!msgId || !msgTs || !msgSig) return false

  const key       = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const toSign    = `${msgId}.${msgTs}.${rawBody}`
  const computed  = crypto.createHmac('sha256', key).update(toSign).digest('base64')

  return msgSig.split(' ').some(part => {
    const [, sig] = part.split(',')
    return sig === computed
  })
}

const EVENT_STATUS: Record<string, string> = {
  'email.delivered':  'delivered',
  'email.bounced':    'bounced',
  'email.complained': 'complained',
}

type ResendEvent = {
  type: string
  data: { email_id: string }
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook/resend] RESEND_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  // Log receipt immediately — confirms the webhook URL is correct and reachable
  const svixId = req.headers.get('svix-id') ?? 'no-svix-id'
  console.log(`[webhook/resend] received — svix-id: ${svixId}`)

  const rawBody = await req.text()

  if (!verifySignature(rawBody, req.headers, secret)) {
    console.warn(`[webhook/resend] invalid signature for svix-id: ${svixId}`)
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as ResendEvent
  const newStatus = EVENT_STATUS[event.type]

  if (!newStatus) {
    console.log(`[webhook/resend] untracked event type: ${event.type} — acknowledged`)
    return NextResponse.json({ ok: true })
  }

  const emailId = event.data?.email_id
  if (!emailId) {
    console.warn(`[webhook/resend] ${event.type} — missing email_id in payload`)
    return NextResponse.json({ ok: true })
  }

  const { data: updated, error } = await supabaseAdmin
    .from('leads')
    .update({
      email_status:    newStatus,
      email_status_at: new Date().toISOString(),
    })
    .eq('email_provider_id', emailId)
    .select('id')

  if (error) {
    console.error(`[webhook/resend] DB update failed for provider_id ${emailId}:`, error.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  const rowsUpdated = updated?.length ?? 0
  if (rowsUpdated === 0) {
    console.warn(`[webhook/resend] ${event.type} — no lead matched provider_id: ${emailId} (0 rows updated — possible tracking mismatch)`)
  } else {
    console.log(`[webhook/resend] ${event.type} → ${newStatus} (provider_id: ${emailId}) — ${rowsUpdated} lead(s) updated`)
  }

  return NextResponse.json({ ok: true })
}
