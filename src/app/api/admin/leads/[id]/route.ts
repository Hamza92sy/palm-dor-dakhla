import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const VALID_STATUSES = ['new', 'contacted', 'confirmed', 'cancelled'] as const
type Status = (typeof VALID_STATUSES)[number]

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

  const { status } = body

  if (typeof status !== 'string' || !VALID_STATUSES.includes(status as Status)) {
    return NextResponse.json(
      { error: `status doit être : ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('[api/admin/leads] update error:', error.message)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
