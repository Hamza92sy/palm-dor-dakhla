import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { assertServerEnv } from '@/lib/env'
import { sendLeadNotification } from '@/lib/email'
import { ALL_VALID_APARTMENT_IDS, APARTMENTS, getApartmentLabel, getApartmentLabelEn } from '@/lib/apartments'

export const runtime = 'nodejs'

// ── Rate limiting ─────────────────────────────────────────────────────────────
// In-memory store — resets on cold start, sufficient for low-volume protection.
// Upgrade to Vercel KV / Upstash if traffic scales to multi-instance levels.
const RL_MAX    = 5    // requests per window per IP
const RL_WINDOW = 600  // seconds (10 minutes)

const rlMap = new Map<string, { count: number; resetAt: number }>()

function getIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd ? fwd.split(',')[0].trim() : 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Math.floor(Date.now() / 1000)

  // Purge expired entries when map grows large
  if (rlMap.size > 500) {
    for (const [k, v] of rlMap) {
      if (now >= v.resetAt) rlMap.delete(k)
    }
  }

  const entry = rlMap.get(ip)
  if (!entry || now >= entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + RL_WINDOW })
    return { allowed: true, retryAfter: 0 }
  }
  if (entry.count >= RL_MAX) {
    return { allowed: false, retryAfter: entry.resetAt - now }
  }
  entry.count++
  return { allowed: true, retryAfter: 0 }
}

// ─────────────────────────────────────────────────────────────────────────────

const VALID_SERVICES        = ['accommodation', 'restaurant', 'cafe', 'car_rental'] as const
const VALID_LANGUAGES       = ['fr', 'en'] as const
const DATE_RE               = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_RE              = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Service       = (typeof VALID_SERVICES)[number]
type Language      = (typeof VALID_LANGUAGES)[number]

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
    if (apartmentType) parts.push(`Appartement : ${getApartmentLabel(apartmentType)}`)
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
  if (apartmentType) parts.push(`Apartment: ${getApartmentLabelEn(apartmentType)}`)
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

  const ip = getIp(req)
  const { allowed, retryAfter } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
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
  if (typeof message === 'string' && message.length > 2000) {
    return NextResponse.json({ error: 'message trop long (2000 caractères max)' }, { status: 400 })
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

    if (!check_in || typeof check_in !== 'string' || !DATE_RE.test(check_in)) {
      return NextResponse.json(
        { error: 'check_in est requis pour les réservations hébergement (format YYYY-MM-DD)' },
        { status: 400 }
      )
    }
    cleanCheckIn = check_in

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

    if (!apartment_type || !ALL_VALID_APARTMENT_IDS.includes(apartment_type as string)) {
      return NextResponse.json(
        { error: `apartment_type est requis pour les réservations hébergement. Valeurs acceptées : ${APARTMENTS.map(a => a.id).join(', ')}` },
        { status: 400 }
      )
    }
    cleanApartmentType = apartment_type as string
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
