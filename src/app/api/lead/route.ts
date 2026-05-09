import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { assertServerEnv } from '@/lib/env'
import { sendLeadNotification } from '@/lib/email'

export const runtime = 'nodejs'

const VALID_SERVICES        = ['accommodation', 'restaurant', 'cafe', 'car_rental'] as const
const VALID_LANGUAGES       = ['fr', 'en'] as const
const VALID_APARTMENT_TYPES = ['standard', '2-chambres', 'grande-capacite'] as const
const DATE_RE               = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_RE              = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Service       = (typeof VALID_SERVICES)[number]
type Language      = (typeof VALID_LANGUAGES)[number]
type ApartmentType = (typeof VALID_APARTMENT_TYPES)[number]

const SERVICE_LABELS: Record<Language, Record<Service, string>> = {
  fr: {
    accommodation: 'Hébergement',
    restaurant:    'Restaurant',
    cafe:          'Café',
    car_rental:    'Location de voiture',
  },
  en: {
    accommodation: 'Accommodation',
    restaurant:    'Restaurant',
    cafe:          'Café',
    car_rental:    'Car rental',
  },
}

const APARTMENT_TYPE_LABELS: Record<Language, Record<string, string>> = {
  fr: {
    'standard':        'Standard (500 DH/nuit)',
    '2-chambres':      '2 Chambres (650 DH/nuit)',
    'grande-capacite': 'Grande capacité (750 DH/nuit)',
  },
  en: {
    'standard':        'Standard (500 DH/night)',
    '2-chambres':      '2 Bedrooms (650 DH/night)',
    'grande-capacite': 'Large capacity (750 DH/night)',
  },
}

function buildWhatsAppMessage(
  lang:          Language,
  svc:           Service,
  name:          string,
  phone:         string,
  msg:           string | null,
  checkIn:       string | null,
  checkOut:      string | null,
  apartmentType: string | null,
): string {
  const label = SERVICE_LABELS[lang][svc]

  if (lang === 'fr') {
    const parts = [
      'Bonjour,',
      '',
      'Je souhaite faire une demande pour :',
      `Service : ${label}`,
    ]
    if (apartmentType) parts.push(`Appartement : ${APARTMENT_TYPE_LABELS.fr[apartmentType] ?? apartmentType}`)
    if (checkIn)       parts.push(`Arrivée : ${checkIn}`)
    if (checkOut)      parts.push(`Départ : ${checkOut}`)
    parts.push('', `Nom : ${name}`, `Téléphone : ${phone}`)
    if (msg) parts.push('', 'Message :', msg)
    parts.push('', 'Merci de me confirmer la disponibilité.')
    return parts.join('\n')
  }

  const parts = [
    'Hello,',
    '',
    'I would like to request:',
    `Service: ${label}`,
  ]
  if (apartmentType) parts.push(`Apartment: ${APARTMENT_TYPE_LABELS.en[apartmentType] ?? apartmentType}`)
  if (checkIn)       parts.push(`Check-in: ${checkIn}`)
  if (checkOut)      parts.push(`Check-out: ${checkOut}`)
  parts.push('', `Name: ${name}`, `Phone: ${phone}`)
  if (msg) parts.push('', 'Message:', msg)
  parts.push('', 'Please confirm availability.')
  return parts.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    assertServerEnv()
  } catch (e) {
    console.error(e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête JSON invalide' }, { status: 400 })
  }

  const { name, phone, service, message, language = 'fr', email } = body

  // ── Required fields ──────────────────────────────────────────────────────
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'name est requis (min 2 caractères)' }, { status: 400 })
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
    return NextResponse.json({ error: 'phone est requis (min 8 caractères)' }, { status: 400 })
  }
  if (!service || !VALID_SERVICES.includes(service as Service)) {
    return NextResponse.json(
      { error: `service doit être : ${VALID_SERVICES.join(', ')}` },
      { status: 400 }
    )
  }
  if (!VALID_LANGUAGES.includes(language as Language)) {
    return NextResponse.json(
      { error: `language doit être : ${VALID_LANGUAGES.join(', ')}` },
      { status: 400 }
    )
  }
  if (message !== undefined && message !== null && typeof message !== 'string') {
    return NextResponse.json({ error: 'message doit être une chaîne' }, { status: 400 })
  }

  // ── Email — required for accommodation, optional + validated for others ──
  const rawEmail = typeof email === 'string' ? email.trim() : null
  if (service === 'accommodation') {
    if (!rawEmail || !EMAIL_RE.test(rawEmail)) {
      return NextResponse.json(
        { error: 'Email requis et valide pour les réservations hébergement' },
        { status: 400 }
      )
    }
  } else if (rawEmail && !EMAIL_RE.test(rawEmail)) {
    return NextResponse.json({ error: 'Format email invalide' }, { status: 400 })
  }
  const cleanEmail = rawEmail && EMAIL_RE.test(rawEmail) ? rawEmail : null

  // ── Optional accommodation fields (ignored for other services) ───────────
  let cleanCheckIn:       string | null = null
  let cleanCheckOut:      string | null = null
  let cleanApartmentType: string | null = null

  if (service === 'accommodation') {
    const { check_in, check_out, apartment_type } = body

    if (check_in != null) {
      if (typeof check_in !== 'string' || !DATE_RE.test(check_in)) {
        return NextResponse.json(
          { error: 'check_in doit être une date YYYY-MM-DD' },
          { status: 400 }
        )
      }
      cleanCheckIn = check_in
    }

    if (check_out != null) {
      if (typeof check_out !== 'string' || !DATE_RE.test(check_out)) {
        return NextResponse.json(
          { error: 'check_out doit être une date YYYY-MM-DD' },
          { status: 400 }
        )
      }
      cleanCheckOut = check_out
    }

    if (cleanCheckIn && cleanCheckOut && cleanCheckOut < cleanCheckIn) {
      return NextResponse.json(
        { error: 'check_out doit être après check_in' },
        { status: 400 }
      )
    }

    if (apartment_type != null) {
      if (!VALID_APARTMENT_TYPES.includes(apartment_type as ApartmentType)) {
        return NextResponse.json(
          { error: `apartment_type doit être : ${VALID_APARTMENT_TYPES.join(', ')}` },
          { status: 400 }
        )
      }
      cleanApartmentType = apartment_type as ApartmentType
    }
  }

  const lang          = language      as Language
  const svc           = service       as Service
  const cleanName     = (name as string).trim()
  const cleanPhone    = (phone as string).trim()
  const cleanMessage  = typeof message === 'string' ? message.trim() || null : null

  const { error } = await supabaseAdmin.from('leads').insert({
    name:           cleanName,
    phone:          cleanPhone,
    email:          cleanEmail,
    service:        svc,
    message:        cleanMessage,
    language:       lang,
    source:         'website',
    check_in:       cleanCheckIn,
    check_out:      cleanCheckOut,
    apartment_type: cleanApartmentType,
  })

  if (error) {
    console.error('[api/lead] insert error:', error.message)
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }

  // Fire-and-forget — email failure never blocks the lead or the redirect
  sendLeadNotification({
    name:           cleanName,
    phone:          cleanPhone,
    service:        svc,
    message:        cleanMessage,
    language:       lang,
    check_in:       cleanCheckIn,
    check_out:      cleanCheckOut,
    apartment_type: cleanApartmentType,
  }).catch((err: unknown) => console.error('[api/lead] email notification failed:', err))

  const waText      = buildWhatsAppMessage(lang, svc, cleanName, cleanPhone, cleanMessage, cleanCheckIn, cleanCheckOut, cleanApartmentType)
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`

  return NextResponse.json({ success: true, whatsappUrl })
}
