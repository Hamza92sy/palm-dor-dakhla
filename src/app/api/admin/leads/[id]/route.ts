import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const VALID_STATUSES        = ['new', 'contacted', 'confirmed', 'cancelled'] as const
const VALID_APARTMENT_TYPES = ['standard', '2-chambres', 'grande-capacite'] as const
const DATE_RE               = /^\d{4}-\d{2}-\d{2}$/

type Status        = (typeof VALID_STATUSES)[number]
type ApartmentType = (typeof VALID_APARTMENT_TYPES)[number]

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

  if ('status' in body) {
    const { status } = body
    if (typeof status !== 'string' || !VALID_STATUSES.includes(status as Status)) {
      return NextResponse.json(
        { error: `status doit être : ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      )
    }
    updates.status = status
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
    if (apartment_type !== null && !VALID_APARTMENT_TYPES.includes(apartment_type as ApartmentType)) {
      return NextResponse.json(
        { error: `apartment_type doit être : ${VALID_APARTMENT_TYPES.join(', ')} ou null` },
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

  return NextResponse.json({ success: true })
}
