import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ServiceContactForm from '@/components/service/ServiceContactForm'
import ApartmentGallery from '@/components/hebergements/ApartmentGallery'
import { APARTMENTS, APARTMENT_MAP } from '@/lib/apartments'

export function generateStaticParams() {
  return APARTMENTS.map(apt => ({ apartmentId: apt.id }))
}

type Props = { params: Promise<{ apartmentId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { apartmentId } = await params
  const apt = APARTMENT_MAP[apartmentId]
  if (!apt) return {}

  const title = `${apt.name} — ${apt.price} DH/nuit · Palm d'Or Dakhla`
  const description = `${apt.name} à Dakhla, ${apt.floor}e étage. ${apt.capacity}. ${apt.beds.join(', ')}. Réservation en ligne.`
  const image = apt.coverImage
    ? { url: apt.coverImage.src, alt: apt.coverImage.alt }
    : { url: '/og-image.jpg', width: 1200, height: 630, alt: "Appartements Palm d'Or Dakhla" }

  return {
    title,
    description,
    alternates: { canonical: `/hebergements/${apt.id}` },
    openGraph: {
      title,
      description,
      url: `/hebergements/${apt.id}`,
      siteName: "Palm d'Or Dakhla",
      locale: 'fr_MA',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  }
}


export default async function ApartmentDetailPage({ params }: Props) {
  const { apartmentId } = await params
  const apt = APARTMENT_MAP[apartmentId]
  if (!apt) notFound()

  const heroSrc = apt.coverImage?.src ?? '/assets/photos-client/chambre-double.jpg'
  const heroAlt = apt.coverImage?.alt ?? `${apt.name} — Palm d'Or Dakhla`

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-palm-blue/55" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-5 gap-4">
          <p className="text-[9px] tracking-[0.6em] uppercase text-white/50">
            {apt.floor}e étage · Dakhla, Maroc
          </p>
          <h1 className="font-display font-light italic text-4xl md:text-6xl text-white leading-tight">
            {apt.name}
          </h1>
          <div className="w-10 h-px bg-palm-gold opacity-80" />
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/55">
            {apt.capacity} · {apt.price} DH / nuit
          </p>
          <a
            href={`?apt=${apt.id}#contact`}
            className="mt-2 flex items-center gap-2.5
              border border-white/60 text-white hover:border-white hover:bg-white/10
              text-[11px] tracking-[0.14em] uppercase font-medium
              px-7 py-3.5 rounded-full transition-all duration-300"
          >
            Réserver cet appartement
          </a>
        </div>
      </section>

      {/* ── Galerie + Détails ────────────────────────────────────────── */}
      <section className="bg-palm-cream py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Back */}
          <Link
            href="/hebergements"
            className="inline-flex items-center gap-1.5
              text-[10px] tracking-[0.2em] uppercase text-palm-blue/40 hover:text-palm-blue/70
              transition-colors duration-200 mb-10"
          >
            ← Tous les appartements
          </Link>

          {/* Gallery — interactive, shown only when photos are available */}
          {apt.coverImage && apt.gallery && apt.gallery.length > 0 && (
            <ApartmentGallery cover={apt.coverImage} gallery={apt.gallery} />
          )}

          {/* Fiche appartement */}
          <div className="bg-white rounded-sm border border-palm-gold/15 p-6 md:p-8 flex flex-col gap-5">

            {/* Nom + prix */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display font-light italic text-2xl md:text-3xl text-palm-blue">
                  {apt.name}
                </h2>
                <p className="text-[10px] tracking-[0.2em] uppercase text-palm-blue/40 mt-1">
                  {apt.floor}e étage
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl font-medium text-palm-gold tabular-nums">{apt.price}</p>
                <p className="text-[9px] tracking-[0.15em] uppercase text-palm-blue/40">DH / nuit</p>
              </div>
            </div>

            <div className="h-px bg-palm-gold/20" />

            {/* Short description */}
            {apt.shortDescription && (
              <p className="text-sm text-palm-blue/65 leading-relaxed">
                {apt.shortDescription}
              </p>
            )}

            {/* Composition */}
            <div className="flex flex-col gap-2">
              <p className="text-[9px] tracking-[0.4em] uppercase text-palm-gold/70 font-medium">
                Composition
              </p>
              {apt.beds.map((bed) => (
                <div key={bed} className="flex items-center gap-2">
                  <span className="text-palm-gold text-[8px]">✦</span>
                  <span className="text-sm text-palm-blue/70">{bed}</span>
                </div>
              ))}
            </div>

            {/* Espaces communs + capacité */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] tracking-[0.12em] text-palm-blue/40 uppercase">
                Salon · Salle à manger · Cuisine · Salle de bain
              </p>
              <p className="text-[10px] tracking-widest text-palm-blue/35">
                {apt.capacity}
              </p>
            </div>

            <div className="h-px bg-palm-gold/20" />

            {/* CTA réservation */}
            <a
              href={`?apt=${apt.id}#contact`}
              className="flex items-center justify-center
                border border-palm-blue/25 text-palm-blue hover:bg-palm-blue hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Réserver cet appartement
            </a>

          </div>
        </div>
      </section>

      {/* ── Formulaire de réservation ────────────────────────────────── */}
      <ServiceContactForm service="accommodation" />
    </>
  )
}
