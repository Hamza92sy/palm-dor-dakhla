import Link from 'next/link'
import {
  BUSINESS_ADDRESS_LINE_1,
  BUSINESS_ADDRESS_LINE_2,
  BUSINESS_COUNTRY,
  BUSINESS_EMAIL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_PHONE_DISPLAY,
} from '@/lib/config'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const navLinks = [
  { label: 'Hébergements',    href: '/hebergements' },
  { label: 'Restaurant',      href: '/restaurant' },
  { label: 'Café',            href: '/cafe' },
  { label: 'Location voiture', href: '/location-voiture' },
  { label: 'Galerie',         href: '/galerie' },
  { label: 'Contact',         href: '/contact' },
]

export default function Footer() {
  const telHref = WHATSAPP_NUMBER ? `tel:+${WHATSAPP_NUMBER}` : '#'

  return (
    <footer className="bg-palm-blue text-white">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-palm-gold/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <img
                src="/assets/logo-dark.svg"
                alt="Palm d'Or Dakhla"
                width={44}
                height={44}
                className="w-10 h-10 shrink-0 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-light italic text-white group-hover:text-palm-gold-muted transition-colors duration-300">
                  Palm d&apos;Or
                </span>
                <span className="font-sans text-[9px] tracking-[0.45em] text-palm-gold uppercase mt-1 font-medium">
                  Dakhla
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/45 leading-[1.85] max-w-[260px]">
              Hébergements, restaurant & café au cœur de Dakhla.
              Réservation en ligne ou via WhatsApp.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-[9px] tracking-[0.35em] uppercase text-palm-gold font-medium mb-1">
              Navigation
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/45 hover:text-white transition-colors duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact + CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-[9px] tracking-[0.35em] uppercase text-palm-gold font-medium">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/45">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 w-fit leading-7"
              >
                {BUSINESS_ADDRESS_LINE_1}
                <br />
                {BUSINESS_ADDRESS_LINE_2}
                <br />
                {BUSINESS_COUNTRY}
              </a>
              {WHATSAPP_PHONE_DISPLAY && (
                <a
                  href={telHref}
                  className="hover:text-white transition-colors duration-200 w-fit"
                >
                  {WHATSAPP_PHONE_DISPLAY}
                </a>
              )}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                {BUSINESS_EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:text-white transition-colors duration-200 w-fit"
                aria-label="Instagram Palm d'Or Dakhla"
              >
                <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
            <WhatsAppButton className="group flex items-center gap-2.5 border border-palm-gold/50 text-palm-gold-muted hover:bg-palm-gold hover:border-palm-gold hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-5 py-3 rounded-full transition-all duration-300 w-fit mt-1">
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              Réserver maintenant
            </WhatsAppButton>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 mb-6 h-px bg-white/8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/25 tracking-[0.1em]">
          <span>
            © {new Date().getFullYear()} Palm d&apos;Or Dakhla. Tous droits réservés.
          </span>
          <div className="flex items-center gap-4 uppercase tracking-[0.2em]">
            <Link href="/fr" className="hover:text-white/55 transition-colors duration-200">
              Français
            </Link>
            <span className="block w-px h-3 bg-white/15" />
            <Link href="/en" className="hover:text-white/55 transition-colors duration-200">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
