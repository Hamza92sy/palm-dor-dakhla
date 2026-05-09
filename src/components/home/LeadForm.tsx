'use client'

import { useState } from 'react'
import { trackLead } from '@/lib/tracking'
import { APARTMENTS } from '@/lib/apartments'

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

type Service = 'accommodation' | 'restaurant' | 'cafe' | 'car_rental'

const SERVICES: { value: Service; label: string }[] = [
  { value: 'accommodation', label: 'Hébergement' },
  { value: 'restaurant',    label: 'Restaurant' },
  { value: 'cafe',          label: 'Café' },
  { value: 'car_rental',    label: 'Location de voiture' },
]


const INPUT_CLASS = `
  w-full bg-white border border-palm-gold/25 rounded-sm px-4 py-3.5
  text-sm text-palm-blue placeholder:text-palm-blue/25
  focus:outline-none focus:border-palm-gold/70 transition-colors duration-200
  focus-visible:ring-2 focus-visible:ring-palm-gold/40 focus-visible:ring-offset-1
  disabled:opacity-50 disabled:cursor-not-allowed
`.trim()

export default function LeadForm() {
  const [name,          setName]          = useState('')
  const [phone,         setPhone]         = useState('')
  const [service,       setService]       = useState<Service>('accommodation')
  const [message,       setMessage]       = useState('')
  const [checkIn,       setCheckIn]       = useState('')
  const [nights,        setNights]        = useState<number | ''>('')
  const [apartmentType, setApartmentType] = useState('')
  const [email,         setEmail]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState<string | null>(null)
  const [success,       setSuccess]       = useState(false)
  const [whatsappUrl,   setWhatsappUrl]   = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  function handleServiceChange(next: Service) {
    setService(next)
    if (next !== 'accommodation') {
      setCheckIn('')
      setNights('')
      setApartmentType('')
    }
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (service === 'accommodation' && !EMAIL_RE.test(email.trim())) {
      setError('Email requis pour les réservations hébergement.')
      return
    }
    if (service === 'accommodation' && (nights === '' || nights < 1)) {
      setError('Le nombre de nuitées doit être au moins 1.')
      return
    }

    setLoading(true)
    setError(null)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    try {
      const res = await fetch('/api/lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email.trim() || null,
          service,
          message,
          language: 'fr',
          ...(service === 'accommodation' && {
            check_in:       checkIn || null,
            check_out:      checkIn && typeof nights === 'number' && nights >= 1 ? addDays(checkIn, nights) : null,
            apartment_type: apartmentType || null,
          }),
        }),
        signal: controller.signal,
      })

      const data: { success?: boolean; whatsappUrl?: string; error?: string } = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Une erreur est survenue, veuillez réessayer.')
        return
      }

      trackLead(service)
      setWhatsappUrl(data.whatsappUrl ?? null)
      setSuccess(true)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('La requête a pris trop de temps. Vérifiez votre connexion et réessayez.')
      } else {
        setError('Connexion impossible. Vérifiez votre connexion et réessayez.')
      }
    } finally {
      clearTimeout(timeout)
      setLoading(false)
    }
  }

  return (
    <section className="bg-palm-cream-dark py-20 md:py-28" id="reservation">
      <div className="max-w-lg mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="text-[9px] tracking-[0.5em] uppercase text-palm-gold font-medium">
            Réservation
          </p>
          <h2 className="font-display font-light italic text-4xl md:text-5xl text-palm-blue">
            Faites votre demande
          </h2>
          <div className="w-8 h-px bg-palm-gold/50 mt-1" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-palm-blue/40">
            Réponse rapide garantie
          </p>
        </div>

        {/* Form / Success */}
        {success ? (
          <div className="flex flex-col items-center text-center gap-6 py-8">
            <div className="w-14 h-14 rounded-full bg-palm-gold/10 flex items-center justify-center">
              <CheckIcon className="w-7 h-7 text-palm-gold" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-light italic text-2xl text-palm-blue">
                Demande envoyée
              </h3>
              <p className="text-sm text-palm-blue/60 leading-relaxed max-w-xs mx-auto">
                Votre demande a bien été envoyée. Notre équipe vous contactera rapidement.
              </p>
            </div>
            {whatsappUrl && (
              <div className="border-t border-palm-gold/20 pt-5 w-full flex flex-col items-center gap-2.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-palm-blue/40">
                  Besoin urgent ?
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] text-xs font-medium hover:underline"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Contactez-nous sur WhatsApp
                </a>
              </div>
            )}
          </div>
        ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-name" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
              Votre nom <span className="text-palm-gold">*</span>
            </label>
            <input
              id="lead-name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              placeholder="Prénom et nom"
              className={INPUT_CLASS}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-phone" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
              WhatsApp / Téléphone <span className="text-palm-gold">*</span>
            </label>
            <input
              id="lead-phone"
              type="tel"
              required
              minLength={8}
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={loading}
              placeholder="+212 6XX XXX XXX"
              className={INPUT_CLASS}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-email" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
              Email{' '}
              {service === 'accommodation' ? (
                <span className="text-palm-gold">*</span>
              ) : (
                <span className="normal-case tracking-normal font-normal text-palm-blue/30">(facultatif)</span>
              )}
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              placeholder="votre@email.com"
              className={INPUT_CLASS}
            />
          </div>

          {/* Service */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-service" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
              Service <span className="text-palm-gold">*</span>
            </label>
            <select
              id="lead-service"
              required
              autoComplete="off"
              value={service}
              onChange={e => handleServiceChange(e.target.value as Service)}
              disabled={loading}
              className={`${INPUT_CLASS} cursor-pointer`}
            >
              {SERVICES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Accommodation-specific fields */}
          {service === 'accommodation' && (
            <div className="flex flex-col gap-4 border-t border-palm-gold/15 pt-4">
              <p className="text-[9px] tracking-[0.4em] uppercase text-palm-gold/70 font-medium -mb-1">
                Détails du séjour
              </p>

              {/* Apartment type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lead-apt-type" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
                  Type d&apos;appartement{' '}
                  <span className="normal-case tracking-normal font-normal text-palm-blue/30">(facultatif)</span>
                </label>
                <select
                  id="lead-apt-type"
                  autoComplete="off"
                  value={apartmentType}
                  onChange={e => setApartmentType(e.target.value)}
                  disabled={loading}
                  className={`${INPUT_CLASS} cursor-pointer`}
                >
                  <option value="">Type non précisé</option>
                  {APARTMENTS.map(a => (
                    <option key={a.id} value={a.id}>{a.name} — {a.price} DH/nuit</option>
                  ))}
                </select>
              </div>

              {/* Check-in / Nights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lead-check-in" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
                    Arrivée
                  </label>
                  <input
                    id="lead-check-in"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    disabled={loading}
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lead-nights" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
                    Nombre de nuitées <span className="text-palm-gold">*</span>
                  </label>
                  <input
                    id="lead-nights"
                    type="number"
                    required
                    min={1}
                    max={60}
                    step={1}
                    value={nights}
                    onChange={e => setNights(e.target.value === '' ? '' : Math.floor(Number(e.target.value)))}
                    disabled={loading}
                    placeholder="ex. 3"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-message" className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/50 font-medium">
              Message{' '}
              <span className="normal-case tracking-normal font-normal text-palm-blue/30">
                (facultatif)
              </span>
            </label>
            <textarea
              id="lead-message"
              rows={3}
              autoComplete="off"
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={loading}
              placeholder={
                service === 'accommodation'
                  ? 'Nombre de personnes, questions…'
                  : 'Dates souhaitées, nombre de personnes…'
              }
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="text-xs text-red-500/80 text-center tracking-wide py-1">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex items-center justify-center gap-2.5 mt-1
              bg-palm-blue hover:bg-palm-blue/90 disabled:bg-palm-blue/40
              text-white text-[11px] tracking-[0.2em] uppercase font-medium
              px-8 py-4 rounded-full transition-all duration-300
              shadow-[0_4px_20px_rgba(26,49,84,0.15)]
              hover:shadow-[0_6px_28px_rgba(26,49,84,0.25)]
              disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <>
                <Spinner />
                Envoi en cours…
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                Envoyer ma demande
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-palm-blue/25 tracking-widest">
            Nous vous répondons rapidement pour confirmer votre demande.
          </p>
        </form>
        )}
      </div>
    </section>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
