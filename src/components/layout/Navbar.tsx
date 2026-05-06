'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/config'
import { trackWhatsApp } from '@/lib/tracking'

const navLinks = [
  { label: 'Hébergements', href: '/hebergements' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Café', href: '/cafe' },
  { label: 'Location', href: '/location-voiture' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        bg-palm-cream/96 backdrop-blur-md border-b border-palm-gold/15
        ${scrolled ? 'shadow-[0_2px_24px_rgba(24,54,79,0.07)]' : ''}
      `}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group shrink-0">
            <span className="font-display text-xl md:text-2xl font-light italic tracking-wide text-palm-blue group-hover:text-palm-gold transition-colors duration-300">
              Palm d&apos;Or
            </span>
            <span className="font-sans text-[9px] tracking-[0.45em] text-palm-gold uppercase mt-0.5 font-medium">
              Dakhla
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] tracking-[0.18em] uppercase text-palm-blue/60 hover:text-palm-blue transition-colors duration-300
                  after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full
                  after:bg-palm-gold after:scale-x-0 after:origin-left
                  hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language toggle */}
            <div className="flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-medium">
              <Link
                href="/fr"
                className="text-palm-blue hover:text-palm-gold transition-colors duration-200"
              >
                FR
              </Link>
              <span className="block w-px h-3 bg-palm-gold/30" />
              <Link
                href="/en"
                className="text-palm-blue/35 hover:text-palm-gold transition-colors duration-200"
              >
                EN
              </Link>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsApp}
              className="group flex items-center gap-2 border border-palm-gold/60 text-palm-blue hover:bg-palm-gold hover:border-palm-gold hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-5 py-2.5 rounded-full transition-all duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              Réserver
            </a>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver via WhatsApp"
              onClick={trackWhatsApp}
              className="flex items-center justify-center w-11 h-11 border border-[#25D366] text-[#1a9e51] hover:bg-[#25D366] hover:text-white rounded-full transition-all duration-300"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex items-center justify-center w-11 h-11 text-palm-blue/70 hover:text-palm-blue transition-colors duration-200"
            >
              {isOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-palm-cream border-t border-palm-gold/15">
          <div className="max-w-7xl mx-auto px-5 pt-8 pb-10 flex flex-col">

            {/* Links */}
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-light italic text-palm-blue/70 hover:text-palm-blue
                    py-4 transition-colors duration-200
                    ${i < navLinks.length - 1 ? 'border-b border-palm-gold/10' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom: lang + CTA */}
            <div className="flex items-center justify-between pt-8 mt-2">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase font-medium">
                <Link
                  href="/fr"
                  onClick={() => setIsOpen(false)}
                  className="text-palm-blue hover:text-palm-gold transition-colors duration-200"
                >
                  Français
                </Link>
                <span className="block w-px h-3 bg-palm-gold/30" />
                <Link
                  href="/en"
                  onClick={() => setIsOpen(false)}
                  className="text-palm-blue/35 hover:text-palm-gold transition-colors duration-200"
                >
                  English
                </Link>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsApp}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DAF57] text-white
                  text-[11px] tracking-[0.12em] uppercase font-medium
                  px-5 py-2.5 rounded-full transition-colors duration-300"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                Réserver
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
