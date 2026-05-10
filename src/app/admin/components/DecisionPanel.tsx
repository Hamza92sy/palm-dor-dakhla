'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Decision = 'accepted' | 'rejected'

type Props = {
  leadId:        string
  leadEmail:     string | null
  currentStatus: string
  initialNote:   string | null
  compact?:      boolean
}

export default function DecisionPanel({
  leadId,
  leadEmail,
  currentStatus,
  initialNote,
  compact = false,
}: Props) {
  const router                    = useRouter()
  const [note, setNote]           = useState(initialNote ?? '')
  const [loading, setLoading]     = useState<Decision | null>(null)
  const [error, setError]         = useState<string | null>(null)
  const [justDecided, setJustDecided] = useState(false)

  const isDecided = currentStatus === 'accepted' || currentStatus === 'rejected'

  async function decide(decision: Decision) {
    if (loading || isDecided) return
    setLoading(decision)
    setError(null)

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          status:        decision,
          decision_note: compact ? null : (note.trim() || null),
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(d.error ?? 'Erreur serveur')
      }
      setJustDecided(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur — réessayer')
    } finally {
      setLoading(null)
    }
  }

  // ── Compact mode (inline in table row) ──────────────────────────────────────
  if (compact) {
    if (isDecided) {
      return (
        <div className="flex flex-col gap-0.5">
          <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap ${
            currentStatus === 'accepted' ? 'text-green-700' : 'text-red-600'
          }`}>
            {currentStatus === 'accepted' ? '✓ Accepté' : '✗ Refusé'}
          </span>
          {justDecided && (
            <span className="text-[9px] text-amber-500 font-medium tracking-wide whitespace-nowrap">
              → Confirmer via WA
            </span>
          )}
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => decide('accepted')}
            disabled={!!loading}
            className="text-[10px] tracking-[0.05em] uppercase font-medium
              bg-green-50 text-green-700 hover:bg-green-100 border border-green-200
              disabled:opacity-40 disabled:cursor-not-allowed
              px-2.5 py-1 rounded-sm transition-all duration-200 whitespace-nowrap"
          >
            {loading === 'accepted' ? '…' : '✓ Accepter'}
          </button>
          <button
            onClick={() => decide('rejected')}
            disabled={!!loading}
            className="text-[10px] tracking-[0.05em] uppercase font-medium
              bg-red-50 text-red-600 hover:bg-red-100 border border-red-200
              disabled:opacity-40 disabled:cursor-not-allowed
              px-2.5 py-1 rounded-sm transition-all duration-200 whitespace-nowrap"
          >
            {loading === 'rejected' ? '…' : '✗ Refuser'}
          </button>
        </div>
        {error && <span className="text-[10px] text-red-500">{error}</span>}
      </div>
    )
  }

  // ── Full mode (in expanded panel) ───────────────────────────────────────────
  return (
    <div className="space-y-2.5">
      <span className="text-[10px] tracking-[0.15em] uppercase text-palm-blue/40 font-medium">
        Décision
      </span>

      {isDecided ? (
        <>
          <div className="flex items-start gap-2">
            <span className={`text-[11px] font-medium tracking-wide ${
              currentStatus === 'accepted' ? 'text-green-700' : 'text-red-600'
            }`}>
              {currentStatus === 'accepted' ? '✓ Accepté' : '✗ Refusé'}
            </span>
            {initialNote && (
              <span className="text-[11px] text-palm-blue/40">— {initialNote}</span>
            )}
          </div>
          {justDecided && (
            <p className="text-[11px] text-amber-600">
              Email envoyé. Si le client ne confirme pas réception, contacter via WhatsApp.
            </p>
          )}
        </>
      ) : (
        <>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            placeholder="Note optionnelle (visible par le client)..."
            className="w-full border border-palm-gold/20 bg-white/60 rounded-sm px-3 py-2
              text-[12px] text-palm-blue placeholder:text-palm-blue/25
              focus:outline-none focus:border-palm-gold transition-colors resize-none"
          />

          {!leadEmail && (
            <p className="text-[11px] text-palm-blue/40">
              Pas d&apos;email — notification automatique indisponible
            </p>
          )}

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => decide('accepted')}
              disabled={!!loading}
              className="flex items-center gap-1.5
                text-[11px] tracking-[0.08em] uppercase font-medium
                bg-green-50 text-green-700 hover:bg-green-100 border border-green-200
                disabled:opacity-40 disabled:cursor-not-allowed
                px-4 py-2 rounded-sm transition-all duration-200"
            >
              {loading === 'accepted' ? (
                <span className="animate-pulse">…</span>
              ) : '✓ Accepter'}
            </button>

            <button
              onClick={() => decide('rejected')}
              disabled={!!loading}
              className="flex items-center gap-1.5
                text-[11px] tracking-[0.08em] uppercase font-medium
                bg-red-50 text-red-600 hover:bg-red-100 border border-red-200
                disabled:opacity-40 disabled:cursor-not-allowed
                px-4 py-2 rounded-sm transition-all duration-200"
            >
              {loading === 'rejected' ? (
                <span className="animate-pulse">…</span>
              ) : '✗ Refuser'}
            </button>

            {error && (
              <span className="text-[11px] text-red-500">{error}</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
