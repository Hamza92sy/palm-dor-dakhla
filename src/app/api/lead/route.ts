import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const VALID_SERVICES  = ['accommodation', 'restaurant', 'cafe', 'car_rental'] as const
const VALID_LANGUAGES = ['fr', 'en'] as const

type Service  = (typeof VALID_SERVICES)[number]
type Language = (typeof VALID_LANGUAGES)[number]

const WA_MESSAGES: Record<Language, Record<Service, string>> = {
  fr: {
    accommodation: "Bonjour, je souhaite réserver un hébergement à Palm d'Or Dakhla.",
    restaurant:    "Bonjour, je souhaite réserver une table au restaurant Palm d'Or Dakhla.",
    cafe:          "Bonjour, je souhaite visiter le café Palm d'Or Dakhla.",
    car_rental:    "Bonjour, je souhaite louer un véhicule via Palm d'Or Dakhla.",
  },
  en: {
    accommodation: "Hello, I would like to book accommodation at Palm d'Or Dakhla.",
    restaurant:    "Hello, I would like to book a table at Palm d'Or Dakhla restaurant.",
    cafe:          "Hello, I would like to visit Palm d'Or Dakhla café.",
    car_rental:    "Hello, I would like to rent a car through Palm d'Or Dakhla.",
  },
}

export async function POST(req: NextRequest) {
  // Guard: numéro WhatsApp obligatoire côté serveur
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!waNumber) {
    console.error('[api/lead] NEXT_PUBLIC_WHATSAPP_NUMBER non configuré')
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
  }

  // Parse body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête JSON invalide' }, { status: 400 })
  }

  const { name, phone, service, message, language = 'fr' } = body

  // Validation
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

  // Insert lead — service_role bypasse RLS, lecture bloquée pour anon
  const { error } = await supabaseAdmin.from('leads').insert({
    name:     name.trim(),
    phone:    phone.trim(),
    service:  svc,
    message:  typeof message === 'string' ? message.trim() || null : null,
    language: lang,
    source:   'website',
  })

  if (error) {
    console.error('[api/lead] insert error:', error.message)
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }

  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(WA_MESSAGES[lang][svc])}`

  return NextResponse.json({ success: true, whatsappUrl })
}
