declare global {
  interface Window {
    fbq?: (method: string, event: string, params?: Record<string, unknown>) => void
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

// Fired by GAPageTracker on every client-side navigation (not initial load)
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return
  window.gtag?.('config', gaId, { page_path: path })
}

// source='form' → submitted via lead form (also fires trackLead)
// source='button' → direct WhatsApp button click (no form)
export function trackWhatsApp(source: 'form' | 'button' = 'button') {
  if (typeof window === 'undefined') return
  window.fbq?.('track', 'Contact', { content_name: source })
  window.gtag?.('event', 'contact', { method: 'whatsapp', source })
}

// service = 'accommodation' | 'restaurant' | 'cafe' | 'car_rental'
export function trackLead(service: string) {
  if (typeof window === 'undefined') return
  window.fbq?.('track', 'Lead')
  window.gtag?.('event', 'generate_lead', { service })
}
