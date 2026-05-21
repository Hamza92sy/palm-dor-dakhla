import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { GALLERY_IMAGES } from '@/lib/gallery'

export const metadata: Metadata = {
  title: "Galerie — Palm d'Or Dakhla",
  description:
    "Photos réelles des appartements, chambres et café Palm d'Or Dakhla. Découvrez nos hébergements et services à Dakhla avant de réserver.",
  alternates: {
    canonical: '/galerie',
  },
  openGraph: {
    title: "Galerie Photos — Palm d'Or Dakhla",
    description: "Photos réelles des appartements, chambres et café Palm d'Or Dakhla.",
    url: '/galerie',
    siteName: "Palm d'Or Dakhla",
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Galerie Palm d'Or Dakhla" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Galerie Photos — Palm d'Or Dakhla",
    description: "Photos réelles des appartements, chambres et café Palm d'Or Dakhla.",
    images: ['/og-image.jpg'],
  },
}

const SERVICE_LABELS = {
  hebergement: 'Hébergement',
  restaurant: 'Restaurant',
  cafe: 'Café',
  location: 'Location',
} as const

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function GaleriePage() {
  return (
    <>
      <section className="bg-palm-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl flex flex-col gap-4 mb-12">
            <SectionLabel>Galerie</SectionLabel>
            <h1 className="font-display font-light italic text-4xl md:text-6xl text-palm-blue leading-tight">
              L&apos;ambiance Palm d&apos;Or Dakhla
            </h1>
            <p className="text-sm md:text-base text-palm-blue/70 leading-8 max-w-[58ch]">
              Appartements, restaurant et café — découvrez l&apos;ambiance de Palm d&apos;Or Dakhla
              en photos avant votre séjour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {GALLERY_IMAGES.map((image, index) => {
              const isFeatured = image.featured ?? false

              return (
                <figure
                  key={`${image.src}-${index}`}
                  className={`group overflow-hidden rounded-sm border border-palm-gold/10 bg-white/60 ${
                    isFeatured ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className={`relative ${isFeatured ? 'aspect-16/10' : 'aspect-4/3'}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm text-palm-blue/70 leading-6">{image.alt}</span>
                    <span className="shrink-0 text-[10px] tracking-[0.22em] uppercase text-palm-gold font-medium">
                      {SERVICE_LABELS[image.service]}
                    </span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-palm-cream border-t border-palm-gold/15 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 mb-6">
            Découvrez nos services
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Hébergements', href: '/hebergements', detail: 'Appartements dès 500 DH/nuit' },
              { label: 'Restaurant', href: '/restaurant', detail: 'Cuisine locale & internationale' },
              { label: 'Café', href: '/cafe', detail: 'Petit-déjeuner & boissons' },
              { label: 'Contact', href: '/contact', detail: 'Adresse & formulaire de réservation' },
            ].map((link) => (
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

      <section className="bg-palm-cream-dark py-16 md:py-20 border-t border-palm-gold/15">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center gap-5">
          <p className="text-[10px] tracking-[0.32em] uppercase text-palm-gold font-medium">
            Réservation
          </p>
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
            Une question avant de réserver ?
          </h2>
          <p className="text-sm text-palm-blue/65 leading-7 max-w-[54ch]">
            Contactez Palm d&apos;Or Dakhla directement pour votre séjour, une table au restaurant
            ou un besoin de mobilité.
          </p>
          <WhatsAppButton
            className="group inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DAF57] text-white
              text-[11px] tracking-[0.14em] uppercase font-medium px-7 py-3.5 rounded-full transition-colors duration-300"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            Réserver via WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </>
  )
}
