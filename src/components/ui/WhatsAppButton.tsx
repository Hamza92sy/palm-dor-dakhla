'use client'

import { WHATSAPP_URL } from '@/lib/config'
import { trackWhatsApp } from '@/lib/tracking'

interface Props {
  href?: string      // optionnel — overrides WHATSAPP_URL (ex: URL spécifique par service)
  className?: string
  children: React.ReactNode
}

export default function WhatsAppButton({ href, className, children }: Props) {
  return (
    <a
      href={href ?? WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={trackWhatsApp}
    >
      {children}
    </a>
  )
}
