'use client'

import { useState } from 'react'
import { APARTMENTS } from '@/lib/apartments'

type Props = {
  id:          string
  initialType: string | null
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function ApartmentSelect({ id, initialType }: Props) {
  const [value, setValue]         = useState(initialType ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
    setValue(next)
    setSaveState('saving')

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ apartment_type: next || null }),
      })
      setSaveState(res.ok ? 'saved' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  const indicator =
    saveState === 'saving' ? 'Enregistrement…' :
    saveState === 'saved'  ? 'Enregistré ✓'    :
    saveState === 'error'  ? 'Erreur ✗'        : ''

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] uppercase text-palm-blue/40 font-medium">
          Type d&apos;appartement
        </span>
        {indicator && (
          <span className={`text-[10px] ${saveState === 'error' ? 'text-red-500' : 'text-palm-gold'}`}>
            {indicator}
          </span>
        )}
      </div>
      <select
        value={value}
        onChange={handleChange}
        aria-label="Type d'appartement"
        className="w-full border border-palm-gold/20 bg-white/60 rounded-sm px-3 py-2
          text-[12px] text-palm-blue focus:outline-none focus:border-palm-gold
          transition-colors cursor-pointer"
      >
        <option value="">Non précisé</option>
        {APARTMENTS.map(a => (
          <option key={a.id} value={a.id}>{a.name} — {a.price} DH/nuit</option>
        ))}
      </select>
    </div>
  )
}
