'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Mot de passe incorrect')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-palm-cream px-5">
      <div className="w-full max-w-xs">

        {/* Brand */}
        <div className="text-center mb-10">
          <p className="font-display text-3xl font-light italic text-palm-blue">
            Palm d&apos;Or
          </p>
          <p className="text-[9px] tracking-[0.45em] uppercase text-palm-gold mt-1.5 font-medium">
            Administration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[10px] tracking-[0.25em] uppercase text-palm-blue/55 font-medium"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full border border-palm-gold/30 bg-white/70 rounded-sm px-4 py-3
                text-palm-blue text-sm
                focus:outline-none focus:border-palm-gold
                transition-colors duration-200"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-600 tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-palm-blue hover:bg-palm-blue/90 disabled:opacity-50
              text-white text-[11px] tracking-[0.22em] uppercase font-medium
              py-3 rounded-sm transition-colors duration-200 mt-1"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Discrete back link */}
        <p className="text-center mt-8">
          <a
            href="/"
            className="text-[10px] text-palm-blue/30 hover:text-palm-blue/55 tracking-[0.1em] transition-colors"
          >
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  )
}
