'use client'

import { useState } from 'react'
import { APARTMENT_MAP } from '@/lib/apartments'
import StatusSelect    from './StatusSelect'
import LeadNotes       from './LeadNotes'
import DateRangePicker from './DateRangePicker'
import ApartmentSelect from './ApartmentSelect'
import DecisionPanel   from './DecisionPanel'

const SERVICE_LABELS: Record<string, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location',
}

type Lead = {
  id:                string
  created_at:        string
  name:              string
  phone:             string
  service:           string
  message:           string | null
  status:            string
  language:          string
  email:             string | null
  notes:             string | null
  check_in:          string | null
  check_out:         string | null
  apartment_type:    string | null
  decision_at:       string | null
  decision_note:     string | null
  email_status:      string | null
  email_provider_id: string | null
  email_status_at:   string | null
}

const EMAIL_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  sent:       { label: '✉ Envoyé',    color: 'text-blue-400' },
  delivered:  { label: '✓ Délivré',   color: 'text-emerald-600' },
  bounced:    { label: '✗ Bounce',    color: 'text-red-500' },
  complained: { label: '⚠ Plainte',   color: 'text-amber-500' },
  failed:     { label: '✗ Échec',     color: 'text-red-500' },
}

function EmailStatusBadge({ status, statusAt }: { status: string | null; statusAt: string | null }) {
  if (!status) return null
  const c = EMAIL_STATUS_CONFIG[status]
  if (!c) return null
  if (status === 'sent' && statusAt) {
    const ageMs = Date.now() - new Date(statusAt).getTime()
    if (ageMs > 60 * 60 * 1000) {
      return <span className="text-[9px] font-medium tracking-wide text-amber-500" title="Email envoyé mais réception non confirmée — vérifier Resend ou contacter via WA">✉ Non confirmé</span>
    }
  }
  return <span className={`text-[9px] font-medium tracking-wide ${c.color}`}>{c.label}</span>
}

type Props = {
  lead:  Lead
  index: number
}

function aptShortLabel(id: string | null): string {
  if (!id) return '—'
  const apt = APARTMENT_MAP[id]
  if (apt) return apt.name
  const legacy: Record<string, string> = {
    'standard':        'Standard',
    '2-chambres':      '2 Chambres',
    'grande-capacite': 'Grande cap.',
  }
  return legacy[id] ?? id
}

function formatSejour(checkIn: string | null, checkOut: string | null): string {
  if (!checkIn) return '—'
  const dateStr = new Date(checkIn).toLocaleDateString('fr-FR', {
    day:      'numeric',
    month:    'short',
    timeZone: 'Africa/Casablanca',
  })
  if (!checkOut) return dateStr
  const nights = Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  )
  return `${dateStr} · ${nights} nuit${nights > 1 ? 's' : ''}`
}

export default function LeadRow({ lead, index }: Props) {
  const [expanded, setExpanded] = useState(false)

  const waPhone = lead.phone.replace(/\D/g, '')
  const waText  = encodeURIComponent(
    `Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla, nous vous confirmons...`
  )
  const waUrl           = `https://wa.me/${waPhone}?text=${waText}`
  const isAccommodation = lead.service === 'accommodation'

  return (
    <>
      <tr
        className={`border-t border-palm-gold/10 transition-colors hover:bg-palm-gold/5
          ${index % 2 === 0 ? 'bg-white/50' : 'bg-white/25'}`}
      >
        {/* Date */}
        <td className="px-4 py-3 text-palm-blue/50 text-[11px] whitespace-nowrap">
          {new Date(lead.created_at).toLocaleDateString('fr-FR', {
            day:   '2-digit',
            month: '2-digit',
            year:  '2-digit',
          })}
          <br />
          <span className="text-palm-blue/30">
            {new Date(lead.created_at).toLocaleTimeString('fr-FR', {
              hour:   '2-digit',
              minute: '2-digit',
            })}
          </span>
        </td>

        {/* Nom + service */}
        <td className="px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-palm-blue font-medium text-[13px] whitespace-nowrap">
              {lead.name}
            </span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-palm-gold/70 font-medium">
              {SERVICE_LABELS[lead.service] ?? lead.service}
            </span>
          </div>
        </td>

        {/* Téléphone */}
        <td className="px-4 py-3 text-palm-blue/65 whitespace-nowrap text-[12px]">
          {lead.phone}
        </td>

        {/* Email */}
        <td className="px-4 py-3 max-w-[160px]">
          {lead.email ? (
            <span className="text-[12px] text-palm-blue/65 block truncate" title={lead.email}>
              {lead.email}
            </span>
          ) : (
            <span className="text-[11px] text-palm-blue/20 italic">—</span>
          )}
        </td>

        {/* Appartement */}
        <td className="px-4 py-3 text-[12px] whitespace-nowrap">
          {isAccommodation ? (
            <span className="text-palm-blue/70">{aptShortLabel(lead.apartment_type)}</span>
          ) : (
            <span className="text-palm-blue/20 italic text-[11px]">—</span>
          )}
        </td>

        {/* Séjour */}
        <td className="px-4 py-3 text-[12px] whitespace-nowrap">
          {isAccommodation ? (
            <span className="text-palm-blue/65">{formatSejour(lead.check_in, lead.check_out)}</span>
          ) : (
            <span className="text-palm-blue/20 italic text-[11px]">—</span>
          )}
        </td>

        {/* Statut */}
        <td className="px-4 py-3">
          {lead.status === 'accepted' ? (
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-sm bg-green-50 text-green-700">
                Accepté
              </span>
              <EmailStatusBadge status={lead.email_status} statusAt={lead.email_status_at} />
            </div>
          ) : lead.status === 'rejected' ? (
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-sm bg-red-50 text-red-600">
                Refusé
              </span>
              <EmailStatusBadge status={lead.email_status} statusAt={lead.email_status_at} />
            </div>
          ) : (
            <StatusSelect id={lead.id} currentStatus={lead.status} />
          )}
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1.5">
            {/* Quick decision — accommodation only */}
            {isAccommodation && (
              <DecisionPanel
                compact
                leadId={lead.id}
                leadEmail={lead.email}
                currentStatus={lead.status}
                initialNote={null}
              />
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[11px] tracking-[0.08em] uppercase font-medium
                  transition-colors whitespace-nowrap ${
                  ['bounced', 'complained', 'failed'].includes(lead.email_status ?? '')
                    ? 'text-red-500 hover:text-red-600 font-semibold'
                    : 'text-[#1a9e51] hover:text-[#25D366]'
                }`}
              >
                {['bounced', 'complained', 'failed'].includes(lead.email_status ?? '')
                  ? 'WA !'
                  : 'WA'}
              </a>
              <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                className="text-[11px] tracking-[0.08em] uppercase font-medium
                  text-palm-blue/50 hover:text-palm-blue
                  border border-palm-blue/20 hover:border-palm-blue/40
                  px-2.5 py-1 rounded-sm transition-all duration-200 whitespace-nowrap"
              >
                {expanded ? 'Réduire' : 'Détails'}
              </button>
            </div>
          </div>
        </td>
      </tr>

      {/* Expanded detail panel */}
      {expanded && (
        <tr className={`border-t border-palm-gold/10 ${index % 2 === 0 ? 'bg-white/50' : 'bg-white/25'}`}>
          <td colSpan={8} className="px-4 py-4">
            <div className="flex flex-col gap-4 max-w-2xl">

              {/* Accommodation-specific fields */}
              {isAccommodation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ApartmentSelect id={lead.id} initialType={lead.apartment_type} />
                  <DateRangePicker
                    id={lead.id}
                    initialCheckIn={lead.check_in}
                    initialCheckOut={lead.check_out}
                  />
                </div>
              )}

              {/* Message client */}
              {lead.message && (
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-palm-blue/40 font-medium">
                    Message client
                  </span>
                  <p className="text-[12px] text-palm-blue/65 leading-relaxed">{lead.message}</p>
                </div>
              )}

              {/* Email client (read-only) */}
              {lead.email && (
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-palm-blue/40 font-medium">
                    Email client
                  </span>
                  <p className="text-[12px] text-palm-blue/70">{lead.email}</p>
                </div>
              )}

              {/* Full decision panel — with note textarea */}
              <DecisionPanel
                leadId={lead.id}
                leadEmail={lead.email}
                currentStatus={lead.status}
                initialNote={lead.decision_note}
              />

              {/* Internal notes */}
              <LeadNotes id={lead.id} initialNotes={lead.notes} />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
