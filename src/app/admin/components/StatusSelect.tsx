'use client'

import { useState } from 'react'

const VALID_STATUSES = ['new', 'contacted', 'confirmed', 'cancelled'] as const
type Status = (typeof VALID_STATUSES)[number]

const STATUS_LABELS: Record<Status, string> = {
  new:       'Nouveau',
  contacted: 'Contacté',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
}

const STATUS_STYLES: Record<Status, string> = {
  new:       'bg-blue-50   text-blue-700',
  contacted: 'bg-amber-50  text-amber-700',
  confirmed: 'bg-green-50  text-green-700',
  cancelled: 'bg-red-50    text-red-600',
}

function toStatus(val: string): Status {
  return VALID_STATUSES.includes(val as Status) ? (val as Status) : 'new'
}

export default function StatusSelect({
  id,
  currentStatus,
}: {
  id:            string
  currentStatus: string
}) {
  const [status,  setStatus]  = useState<Status>(toStatus(currentStatus))
  const [saving,  setSaving]  = useState(false)
  const [failed,  setFailed]  = useState(false)

  async function handleChange(next: Status) {
    if (next === status) return
    setSaving(true)
    setFailed(false)

    const res = await fetch(`/api/admin/leads/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status: next }),
    })

    if (res.ok) {
      setStatus(next)
    } else {
      setFailed(true)
    }
    setSaving(false)
  }

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={status}
        onChange={e => handleChange(e.target.value as Status)}
        disabled={saving}
        className={`text-[10px] tracking-[0.08em] font-medium rounded-sm px-2.5 py-1.5
          border-0 outline-none cursor-pointer
          transition-opacity disabled:opacity-50
          ${STATUS_STYLES[status]}`}
      >
        {VALID_STATUSES.map(s => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      {saving && (
        <span className="text-[9px] text-palm-blue/40 tracking-wide">...</span>
      )}
      {failed && !saving && (
        <span className="text-[9px] text-red-500 tracking-wide">Erreur</span>
      )}
    </div>
  )
}
