'use client'

import { useState } from 'react'

type Props = {
  id:           string
  initialCheckIn:  string | null
  initialCheckOut: string | null
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function DateRangePicker({ id, initialCheckIn, initialCheckOut }: Props) {
  const [checkIn,  setCheckIn]  = useState(initialCheckIn  ?? '')
  const [checkOut, setCheckOut] = useState(initialCheckOut ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [dateError, setDateError] = useState('')

  async function save(field: 'check_in' | 'check_out', value: string, other: string) {
    const inVal  = field === 'check_in'  ? value : other
    const outVal = field === 'check_out' ? value : other

    if (inVal && outVal && outVal < inVal) {
      setDateError('Check-out doit être après check-in')
      return
    }
    setDateError('')
    setSaveState('saving')

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ [field]: value || null }),
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
          Période de séjour
        </span>
        {indicator && (
          <span className={`text-[10px] ${saveState === 'error' ? 'text-red-500' : 'text-palm-gold'}`}>
            {indicator}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-0.5">
          <label className="text-[9px] text-palm-blue/35 uppercase tracking-widest">Arrivée</label>
          <input
            type="date"
            value={checkIn}
            onChange={e => { setCheckIn(e.target.value); setSaveState('idle'); setDateError('') }}
            onBlur={e => save('check_in', e.target.value, checkOut)}
            className="w-full border border-palm-gold/20 bg-white/60 rounded-sm px-2 py-1.5
              text-[11px] text-palm-blue focus:outline-none focus:border-palm-gold transition-colors"
          />
        </div>
        <span className="text-palm-blue/25 text-sm mt-4">→</span>
        <div className="flex-1 space-y-0.5">
          <label className="text-[9px] text-palm-blue/35 uppercase tracking-widest">Départ</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={e => { setCheckOut(e.target.value); setSaveState('idle'); setDateError('') }}
            onBlur={e => save('check_out', e.target.value, checkIn)}
            className="w-full border border-palm-gold/20 bg-white/60 rounded-sm px-2 py-1.5
              text-[11px] text-palm-blue focus:outline-none focus:border-palm-gold transition-colors"
          />
        </div>
      </div>
      {dateError && (
        <p className="text-[10px] text-red-500">{dateError}</p>
      )}
      {checkIn && checkOut && !dateError && (
        <p className="text-[10px] text-palm-blue/35 tracking-[0.08em]">
          {Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)} nuitée(s)
        </p>
      )}
    </div>
  )
}
