import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ServiceContactForm from '@/components/service/ServiceContactForm'
import { type ServiceType, getServiceWhatsAppUrl } from '@/lib/services'

const OTHER_SERVICES: Record<ServiceType, { label: string; href: string; detail: string }[]> = {
  accommodation: [
    { label: 'Restaurant', href: '/restaurant', detail: 'Cuisine locale & internationale' },
    { label: 'Café', href: '/cafe', detail: 'Petit-déjeuner & boissons' },
    { label: 'Location voiture', href: '/location-voiture', detail: 'À la journée ou à la semaine' },
  ],
  restaurant: [
    { label: 'Hébergement', href: '/hebergements', detail: 'Appartements dès 500 DH/nuit' },
    { label: 'Café', href: '/cafe', detail: 'Petit-déjeuner & boissons' },
    { label: 'Location voiture', href: '/location-voiture', detail: 'À la journée ou à la semaine' },
  ],
  cafe: [
    { label: 'Hébergement', href: '/hebergements', detail: 'Appartements dès 500 DH/nuit' },
    { label: 'Restaurant', href: '/restaurant', detail: 'Cuisine locale & internationale' },
    { label: 'Location voiture', href: '/location-voiture', detail: 'À la journée ou à la semaine' },
  ],
  car_rental: [
    { label: 'Hébergement', href: '/hebergements', detail: 'Appartements dès 500 DH/nuit' },
    { label: 'Restaurant', href: '/restaurant', detail: 'Cuisine locale & internationale' },
    { label: 'Café', href: '/cafe', detail: 'Petit-déjeuner & boissons' },
  ],
}

export interface ServicePageConfig {
  title: string
  subtitle: string
  points: string[]
  images: Array<{ src: string; alt: string }>
  service: ServiceType
  ctaLabel: string
  heroNotice?: string
  menuSection?: ReactNode
  faqSection?: ReactNode
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-palm-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

export default function ServicePage({
  title,
  subtitle,
  points,
  images,
  service,
  ctaLabel,
  heroNotice,
  menuSection,
  faqSection,
}: ServicePageConfig) {
  const waUrl = getServiceWhatsAppUrl(service)
  const heroImage = images[0]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">

        {heroImage ? (
          <>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-palm-blue/60" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,58,40,0.96)_0%,rgba(28,58,40,0.9)_52%,rgba(237,229,213,0.24)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,245,236,0.14),transparent_42%)]" />
            <div className="absolute inset-0 bg-palm-blue/35" />
          </>
        )}

        <div className="relative z-10 flex flex-col items-center text-center text-white px-5 gap-5 max-w-3xl">
          <p className="text-[9px] tracking-[0.6em] uppercase text-white/50">
            Dakhla &middot; Maroc
          </p>
          <h1 className="font-display font-light italic text-4xl md:text-6xl text-white leading-tight">
            {title}
          </h1>
          <div className="w-10 h-px bg-palm-gold opacity-80" />
          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/55 max-w-[40ch]">
            {subtitle}
          </p>
          {heroNotice && (
            <div className="mt-1 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm">
              <p className="text-[10px] tracking-[0.14em] uppercase text-white/70">
                {heroNotice}
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <WhatsAppButton
              href={waUrl}
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DAF57] text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-colors duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
              {ctaLabel}
            </WhatsAppButton>
            <a
              href="#contact"
              className="flex items-center gap-2.5 border border-white/30 text-white/75 hover:border-white/60 hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Envoyer un message
            </a>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className="bg-palm-cream py-16 md:py-24 border-t border-palm-gold/20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm text-palm-blue/70 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          {/* Repeat CTA */}
          <div className="flex justify-center mt-12">
            <WhatsAppButton
              href={waUrl}
              className="group flex items-center gap-2.5 border border-palm-gold/60 text-palm-blue hover:bg-palm-gold hover:border-palm-gold hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              {ctaLabel}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ── Menu section (optionnel) ─────────────────────────────────── */}
      {menuSection}

      {/* ── Gallery (si 2+ images) ───────────────────────────────────── */}
      {images.length >= 2 && (
        <section className="bg-palm-cream-dark py-12 md:py-16">
          <div className={`max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-1 gap-4 ${
            images.slice(1).length >= 2 ? 'md:grid-cols-2' : 'md:max-w-2xl md:mx-auto'
          }`}>
            {images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA band ─────────────────────────────────────────────────── */}
      <section className="bg-palm-blue py-16 md:py-20">
        <div className="h-px bg-gradient-to-r from-transparent via-palm-gold/50 to-transparent mb-16" />
        <div className="max-w-xl mx-auto px-5 flex flex-col items-center text-center gap-5">
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-white">
            Prêt à réserver ?
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/35">
            Disponible 7j/7 &middot; Sans engagement &middot; Réponse rapide
          </p>
          <WhatsAppButton
            href={waUrl}
            className="group flex items-center gap-3 bg-white hover:bg-palm-cream text-palm-blue
              text-[11px] tracking-[0.18em] uppercase font-medium
              px-8 py-4 rounded-full transition-all duration-300
              shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
            {ctaLabel}
          </WhatsAppButton>
          <a
            href="#contact"
            className="text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            ou envoyez un message ↓
          </a>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-palm-gold/50 to-transparent mt-16" />
      </section>

      {/* ── Autres services ──────────────────────────────────────────── */}
      <section className="bg-palm-cream border-t border-palm-gold/15 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 mb-6">
            Découvrez aussi
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {OTHER_SERVICES[service].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col gap-0.5 border border-palm-gold/25 rounded-sm px-5 py-3.5
                  hover:border-palm-gold/60 hover:bg-palm-cream-dark transition-all duration-200 text-left"
              >
                <span className="text-[10px] tracking-[0.18em] uppercase text-palm-gold font-medium">
                  {link.label}
                </span>
                <span className="text-xs text-palm-blue/60">{link.detail}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (optional) ───────────────────────────────────────────── */}
      {faqSection}

      {/* ── Contact form ──────────────────────────────────────────────── */}
      <ServiceContactForm service={service} />
    </>
  )
}
