'use client'

import { useState } from 'react'
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
  id:             string
  created_at:     string
  name:           string
  phone:          string
  service:        string
  message:        string | null
  status:         string
  language:       string
  email:          string | null
  notes:          string | null
  check_in:       string | null
  check_out:      string | null
  apartment_type: string | null
  decision_at:    string | null
  decision_note:  string | null
}

type Props = {
  lead:  Lead
  index: number
}

export default function LeadRow({ lead, index }: Props) {
  const [expanded, setExpanded] = useState(false)

  const waPhone = lead.phone.replace(/\D/g, '')
  const waText  = encodeURIComponent(
    `Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla, nous vous confirmons...`
  )

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

        {/* Nom */}
        <td className="px-4 py-3 text-palm-blue font-medium">
          {lead.name}
        </td>

        {/* Téléphone */}
        <td className="px-4 py-3 text-palm-blue/65 whitespace-nowrap text-[12px]">
          {lead.phone}
        </td>

        {/* Service */}
        <td className="px-4 py-3">
          <span className="text-[10px] tracking-[0.1em] uppercase text-palm-gold font-medium">
            {SERVICE_LABELS[lead.service] ?? lead.service}
          </span>
        </td>

        {/* Message */}
        <td className="px-4 py-3 max-w-[180px]">
          {lead.message ? (
            <span
              className="text-[12px] text-palm-blue/55 block truncate"
              title={lead.message}
            >
              {lead.message}
            </span>
          ) : (
            <span className="text-[11px] text-palm-blue/20 italic">—</span>
          )}
        </td>

        {/* Statut */}
        <td className="px-4 py-3">
          {lead.status === 'accepted' ? (
            <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-sm bg-green-50 text-green-700">
              Accepté
            </span>
          ) : lead.status === 'rejected' ? (
            <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-sm bg-red-50 text-red-600">
              Refusé
            </span>
          ) : (
            <StatusSelect id={lead.id} currentStatus={lead.status} />
          )}
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${waPhone}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.08em] uppercase font-medium
                text-[#1a9e51] hover:text-[#25D366] transition-colors whitespace-nowrap"
            >
              Contacter
            </a>
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-[11px] tracking-[0.08em] uppercase font-medium
                text-palm-blue/35 hover:text-palm-blue transition-colors whitespace-nowrap"
              title={expanded ? 'Réduire' : 'Détails'}
            >
              {expanded ? '▲' : '▼'}
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className={`border-t border-palm-gold/10 ${index % 2 === 0 ? 'bg-white/50' : 'bg-white/25'}`}>
          <td colSpan={7} className="px-4 py-4">
            <div className="flex flex-col gap-4 max-w-2xl">

              {/* Accommodation-specific fields */}
              {lead.service === 'accommodation' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ApartmentSelect id={lead.id} initialType={lead.apartment_type} />
                  <DateRangePicker
                    id={lead.id}
                    initialCheckIn={lead.check_in}
                    initialCheckOut={lead.check_out}
                  />
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

              {/* Decision */}
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
