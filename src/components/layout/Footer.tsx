import Link from 'next/link'
import { WHATSAPP_NUMBER, WHATSAPP_PHONE_DISPLAY } from '@/lib/config'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const navLinks = [
  { label: 'Restaurant',   href: '/restaurant' },
  { label: 'Café',         href: '/cafe' },
  { label: 'Hébergements', href: '/hebergements' },
  { label: 'Galerie',      href: '/galerie' },
  { label: 'Contact',      href: '/contact' },
]

export default function Footer() {
  const telHref = WHATSAPP_NUMBER ? `tel:+${WHATSAPP_NUMBER}` : '#'

  return (
    <footer className="bg-palm-blue text-white">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-palm-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col leading-none group w-fit">
              <span className="font-display text-2xl font-light italic text-white group-hover:text-palm-gold-muted transition-colors duration-300">
                Palm d&apos;Or
              </span>
              <span className="font-sans text-[9px] tracking-[0.45em] text-palm-gold uppercase mt-1 font-medium">
                Dakhla
              </span>
            </Link>
            <p className="text-sm text-white/45 leading-[1.85] max-w-[260px]">
              Restaurant, café & hébergements au cœur de Dakhla.
              Une expérience unique face à la lagune atlantique.
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
              <span>Dakhla, Maroc</span>
              {WHATSAPP_PHONE_DISPLAY && (
                <a
                  href={telHref}
                  className="hover:text-white transition-colors duration-200 w-fit"
                >
                  {WHATSAPP_PHONE_DISPLAY}
                </a>
              )}
            </div>
            <WhatsAppButton className="group flex items-center gap-2.5 border border-[#25D366]/70 text-[#6ee89d] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
