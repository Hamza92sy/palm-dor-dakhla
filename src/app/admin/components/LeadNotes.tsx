'use client'

import { useRef, useState } from 'react'

type Props = {
  id:           string
  initialNotes: string | null
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function LeadNotes({ id, initialNotes }: Props) {
  const [value, setValue]     = useState(initialNotes ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value
    setValue(next)
    setSaveState('idle')

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => save(next), 800)
  }

  async function save(notes: string) {
    setSaveState('saving')
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ notes: notes.trim() || null }),
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
          Notes internes
        </span>
        {indicator && (
          <span className={`text-[10px] ${saveState === 'error' ? 'text-red-500' : 'text-palm-gold'}`}>
            {indicator}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        rows={3}
        placeholder="Notes internes (non visible par le client)..."
        className="w-full border border-palm-gold/20 bg-white/60 rounded-sm px-3 py-2
          text-[12px] text-palm-blue placeholder:text-palm-blue/25
          focus:outline-none focus:border-palm-gold transition-colors resize-none"
      />
    </div>
  )
}
