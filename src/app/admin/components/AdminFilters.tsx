'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useRef } from 'react'

const SERVICES = [
  { value: '',              label: 'Tous les services' },
  { value: 'accommodation', label: 'Hébergement' },
  { value: 'restaurant',   label: 'Restaurant' },
  { value: 'cafe',         label: 'Café' },
  { value: 'car_rental',   label: 'Location' },
]

const STATUSES = [
  { value: '',          label: 'Tous les statuts' },
  { value: 'new',       label: 'Nouveau' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'confirmed', label: 'Confirmé' },
  { value: 'cancelled', label: 'Annulé' },
  { value: 'accepted',  label: 'Accepté' },
  { value: 'rejected',  label: 'Refusé' },
]

export default function AdminFilters() {
  const router      = useRouter()
  const pathname    = usePathname()
  const searchParams = useSearchParams()
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const buildParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, val] of Object.entries(updates)) {
        if (val) {
          params.set(key, val)
        } else {
          params.delete(key)
        }
      }
      return params.toString()
    },
    [searchParams]
  )

  function handleSelect(name: string, value: string) {
    router.push(pathname + '?' + buildParams({ [name]: value }))
  }

  function handleSearch(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      router.push(pathname + '?' + buildParams({ q: value }))
    }, 350)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
      <input
        type="search"
        placeholder="Rechercher nom ou téléphone..."
        defaultValue={searchParams.get('q') ?? ''}
        onChange={e => handleSearch(e.target.value)}
        className="flex-1 min-w-0 border border-palm-gold/25 bg-white/70 rounded-sm px-4 py-2.5
          text-palm-blue text-sm placeholder:text-palm-blue/30
          focus:outline-none focus:border-palm-gold transition-colors"
      />
      <select
        aria-label="Filtrer par service"
        defaultValue={searchParams.get('service') ?? ''}
        onChange={e => handleSelect('service', e.target.value)}
        className="border border-palm-gold/25 bg-white/70 rounded-sm px-3 py-2.5
          text-palm-blue text-sm focus:outline-none focus:border-palm-gold
          transition-colors cursor-pointer"
      >
        {SERVICES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <select
        aria-label="Filtrer par statut"
        defaultValue={searchParams.get('status') ?? ''}
        onChange={e => handleSelect('status', e.target.value)}
        className="border border-palm-gold/25 bg-white/70 rounded-sm px-3 py-2.5
          text-palm-blue text-sm focus:outline-none focus:border-palm-gold
          transition-colors cursor-pointer"
      >
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  )
}
