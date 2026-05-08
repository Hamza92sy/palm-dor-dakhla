import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { assertServerEnv } from '@/lib/env'
import { sendLeadNotification } from '@/lib/email'

const VALID_SERVICES  = ['accommodation', 'restaurant', 'cafe', 'car_rental'] as const
const VALID_LANGUAGES = ['fr', 'en'] as const

type Service  = (typeof VALID_SERVICES)[number]
type Language = (typeof VALID_LANGUAGES)[number]

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
  lang: Language,
  svc: Service,
  name: string,
  phone: string,
  msg: string | null
): string {
  const label = SERVICE_LABELS[lang][svc]

  if (lang === 'fr') {
    const parts = [
      'Bonjour,',
      '',
      'Je souhaite faire une demande pour :',
      `Service : ${label}`,
      '',
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
    ]
    if (msg) parts.push('', 'Message :', msg)
    parts.push('', 'Merci de me confirmer la disponibilité.')
    return parts.join('\n')
  }

  const parts = [
    'Hello,',
    '',
    'I would like to request:',
    `Service: ${label}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
  ]
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

  const { name, phone, service, message, language = 'fr' } = body

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

  const lang = language as Language
  const svc  = service  as Service
  const cleanName    = (name as string).trim()
  const cleanPhone   = (phone as string).trim()
  const cleanMessage = typeof message === 'string' ? message.trim() || null : null

  const { error } = await supabaseAdmin.from('leads').insert({
    name:     cleanName,
    phone:    cleanPhone,
    service:  svc,
    message:  cleanMessage,
    language: lang,
    source:   'website',
  })

  if (error) {
    console.error('[api/lead] insert error:', error.message)
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }

  // Fire-and-forget — email failure never blocks the lead or the redirect
  sendLeadNotification({ name: cleanName, phone: cleanPhone, service: svc, message: cleanMessage, language: lang })
    .catch((err: unknown) => console.error('[api/lead] email notification failed:', err))

  const waText     = buildWhatsAppMessage(lang, svc, cleanName, cleanPhone, cleanMessage)
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`

  return NextResponse.json({ success: true, whatsappUrl })
}
