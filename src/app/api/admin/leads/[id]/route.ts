import { NextRequest, NextResponse, after } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendLeadDecisionEmail } from '@/lib/email'
import { ALL_VALID_APARTMENT_IDS, APARTMENTS } from '@/lib/apartments'

export const runtime = 'nodejs'

const VALID_STATUSES        = ['new', 'contacted', 'confirmed', 'cancelled', 'accepted', 'rejected'] as const
const DATE_RE               = /^\d{4}-\d{2}-\d{2}$/

type Status        = (typeof VALID_STATUSES)[number]

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  let decidedStatus: 'accepted' | 'rejected' | null = null

  if ('status' in body) {
    const { status } = body
    if (typeof status !== 'string' || !VALID_STATUSES.includes(status as Status)) {
      return NextResponse.json(
        { error: `status doit être : ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      )
    }
    updates.status = status
    if (status === 'accepted' || status === 'rejected') {
      decidedStatus      = status
      updates.decision_at = new Date().toISOString()
    }
  }

  if ('decision_note' in body) {
    const { decision_note } = body
    if (decision_note !== null && typeof decision_note !== 'string') {
      return NextResponse.json({ error: 'decision_note doit être une chaîne ou null' }, { status: 400 })
    }
    updates.decision_note = typeof decision_note === 'string' && decision_note.trim()
      ? decision_note.trim()
      : null
  }

  if ('notes' in body) {
    const { notes } = body
    if (notes !== null && typeof notes !== 'string') {
      return NextResponse.json({ error: 'notes doit être une chaîne ou null' }, { status: 400 })
    }
    updates.notes = notes === '' ? null : notes
  }

  if ('check_in' in body) {
    const { check_in } = body
    if (check_in !== null && (typeof check_in !== 'string' || !DATE_RE.test(check_in))) {
      return NextResponse.json({ error: 'check_in doit être une date YYYY-MM-DD ou null' }, { status: 400 })
    }
    updates.check_in = check_in
  }

  if ('check_out' in body) {
    const { check_out } = body
    if (check_out !== null && (typeof check_out !== 'string' || !DATE_RE.test(check_out))) {
      return NextResponse.json({ error: 'check_out doit être une date YYYY-MM-DD ou null' }, { status: 400 })
    }
    updates.check_out = check_out
  }

  if ('apartment_type' in body) {
    const { apartment_type } = body
    if (apartment_type !== null && !ALL_VALID_APARTMENT_IDS.includes(apartment_type as string)) {
      return NextResponse.json(
        { error: `apartment_type doit être : ${APARTMENTS.map(a => a.id).join(', ')} ou null` },
        { status: 400 }
      )
    }
    updates.apartment_type = apartment_type
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Aucun champ valide fourni' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('leads')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('[api/admin/leads] update error:', error.message)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }

  // Fire-and-forget decision email — never blocks the response
  if (decidedStatus) {
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('name, email, phone, service, check_in, check_out, apartment_type')
      .eq('id', id)
      .single()

    if (lead?.email) {
      const note   = typeof updates.decision_note === 'string' ? updates.decision_note : null
      const status = decidedStatus
      const leadId = id
      after(async () => {
        try {
          const emailId = await sendLeadDecisionEmail(
            {
              name:           lead.name,
              email:          lead.email,
              phone:          lead.phone,
              service:        lead.service,
              check_in:       lead.check_in  ?? null,
              check_out:      lead.check_out ?? null,
              apartment_type: lead.apartment_type ?? null,
            },
            status,
            note,
          )
          if (emailId) {
            console.log(`[api/admin/leads] ${leadId} — email dispatched to ${lead.email}, provider_id: ${emailId}`)
            const { data: updated, error: dbErr } = await supabaseAdmin
              .from('leads')
              .update({
                email_provider_id: emailId,
                email_status:      'sent',
                email_status_at:   new Date().toISOString(),
              })
              .eq('id', leadId)
              .select('id')
            if (dbErr) console.error(`[api/admin/leads] ${leadId} — email_status update failed:`, dbErr.message)
            else console.log(`[api/admin/leads] ${leadId} — email_status=sent persisted (${updated?.length ?? 0} row(s))`)
          } else {
            console.warn(`[api/admin/leads] ${leadId} — sendLeadDecisionEmail returned null (env vars missing?)`)
          }
        } catch (err) {
          console.error(`[api/admin/leads] ${leadId} — email send failed for ${lead.email}:`, err instanceof Error ? err.message : err)
          const { error: dbErr } = await supabaseAdmin.from('leads').update({
            email_status:    'failed',
            email_status_at: new Date().toISOString(),
          }).eq('id', leadId)
          if (dbErr) console.error(`[api/admin/leads] ${leadId} — email_status=failed update failed:`, dbErr.message)
        }
      })
    } else {
      console.log('[api/admin/leads] decision made — no email on file for lead:', id)
    }
  }

  return NextResponse.json({ success: true })
}
