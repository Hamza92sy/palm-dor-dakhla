declare global {
  interface Window {
    fbq?: (method: string, event: string, params?: Record<string, unknown>) => void
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

export function trackLead() {
  if (typeof window === 'undefined') return
  window.fbq?.('track', 'Lead')
  window.gtag?.('event', 'generate_lead')
}

export function trackWhatsApp() {
  if (typeof window === 'undefined') return
  window.fbq?.('track', 'Contact')
  window.gtag?.('event', 'contact')
}
