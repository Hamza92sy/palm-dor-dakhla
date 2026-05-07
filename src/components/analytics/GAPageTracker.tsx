'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackPageView } from '@/lib/tracking'

// Fires a GA4 page_view on every client-side route change.
// Skips the initial mount — the layout's gtag('config') already fires the
// first page_view, so we only track navigations AFTER the initial load.
export function GAPageTracker() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    trackPageView(pathname)
  }, [pathname])

  return null
}
