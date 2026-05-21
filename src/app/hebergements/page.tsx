import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ServiceContactForm from '@/components/service/ServiceContactForm'
import SectionLabel from '@/components/ui/SectionLabel'
import { getServiceWhatsAppUrl } from '@/lib/services'
import FAQSection from '@/components/ui/FAQSection'
import { lodgingSchema, faqSchema } from '@/lib/schemas'
import { APARTMENTS } from '@/lib/apartments'

export const metadata: Metadata = {
  title: "Appartements meublés à Dakhla dès 500 DH — Palm d'Or",
  description:
    "6 appartements meublés à Dakhla, répartis sur 3 étages. De 500 à 750 DH la nuit. Idéal pour couples, familles et groupes. Réservation en ligne.",
  alternates: {
    canonical: '/hebergements',
  },
  openGraph: {
    title: "Appartements meublés à Dakhla dès 500 DH — Palm d'Or",
    description:
      "6 appartements meublés à Dakhla, répartis sur 3 étages. De 500 à 750 DH la nuit. Idéal pour couples, familles et groupes.",
    url: '/hebergements',
    siteName: "Palm d'Or Dakhla",
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Appartements Palm d'Or Dakhla" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Appartements meublés à Dakhla dès 500 DH — Palm d'Or",
    description: "6 appartements meublés à Dakhla, 3 configurations. De 500 à 750 DH la nuit.",
    images: ['/og-image.jpg'],
  },
}

const FLOOR_GROUPS = [2, 3, 4].map(floor => ({
  floor,
  label: `${floor}e étage`,
  apts: APARTMENTS.filter(a => a.floor === floor),
}))

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-palm-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const FAQ_ITEMS = [
  {
    question: "Combien d'appartements sont disponibles à Palm d'Or Dakhla ?",
    answer: "Nous disposons de 6 appartements meublés à Dakhla, répartis sur 3 étages. L'Appartement 1 et l'Appartement 2 se trouvent au 2e étage, les Appartements 3 et 4 au 3e étage, et les Appartements 5 et 6 au 4e étage.",
  },
  {
    question: "Combien de personnes peuvent séjourner dans un appartement ?",
    answer: "L'Appartement 1 accueille idéalement 2 personnes. Les Appartements 2, 4 et 6 accueillent jusqu'à 4 personnes. Les Appartements 3 et 5 peuvent accueillir jusqu'à 5 personnes.",
  },
  {
    question: "Les appartements sont-ils entièrement équipés ?",
    answer: "Oui, chaque appartement comprend un salon, une salle à manger, une cuisine équipée et une salle de bain. Tout le nécessaire est en place pour un séjour confortable à Dakhla.",
  },
  {
    question: "Comment réserver un appartement meublé à Dakhla ?",
    answer: "La réservation se fait via le formulaire en ligne. Indiquez vos dates souhaitées, le nombre de personnes et l'appartement qui vous intéresse. Pour toute question, contactez-nous via WhatsApp.",
  },
  {
    question: "Quels sont les tarifs des appartements à Dakhla ?",
    answer: "L'Appartement 1 est à 500 DH/nuit. Les Appartements 2, 4 et 6 sont à 650 DH/nuit. Les Appartements 3 et 5 sont à 750 DH/nuit.",
  },
  {
    question: "Où se trouve la résidence Palm d'Or à Dakhla ?",
    answer: "La résidence Palm d'Or est située sur AV Al Walaa à Dakhla 73000, au Maroc. Vous pouvez retrouver l'itinéraire précis sur Google Maps.",
  },
]

export default function HebergementsPage() {
  const generalWAUrl = getServiceWhatsAppUrl('accommodation')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_ITEMS)) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
        <Image
          src="/assets/photos-client/apartments/apt-2/apt-2-vue-ensemble.jpg"
          alt="Salon et salle à manger — Appartements Palm d'Or Dakhla"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-palm-blue/60" />

        <div className="relative z-10 flex flex-col items-center text-center text-white px-5 gap-5 max-w-3xl">
          <p className="text-[9px] tracking-[0.6em] uppercase text-white/50">
            Dakhla &middot; Maroc
          </p>
          <h1 className="font-display font-light italic text-4xl md:text-6xl text-white leading-tight">
            Appartements à Dakhla
          </h1>
          <div className="w-10 h-px bg-palm-gold opacity-80" />
          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/55 max-w-[40ch]">
            6 appartements · 3 étages · Dès 500 DH / nuit
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a
              href="#appartements"
              className="flex items-center gap-2.5 border border-white/60 text-white hover:border-white hover:bg-white/10
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Voir nos appartements
            </a>
            <WhatsAppButton
              href={generalWAUrl}
              className="flex items-center gap-1.5
                text-[10px] tracking-[0.18em] uppercase text-white/50 hover:text-white/80
                transition-colors duration-200"
            >
              <WhatsAppIcon className="w-3 h-3 shrink-0" />
              ou WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ── Avantages ─────────────────────────────────────────────────── */}
      <section className="bg-palm-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              "Appartements entièrement équipés — salon, cuisine, salle à manger, salle de bain",
              "Idéal pour couples, familles et groupes jusqu'à 5 personnes",
              "Réservation simple et rapide en ligne — confirmation rapide",
              "Disponible selon vos dates — réponse rapide garantie",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm text-palm-blue/70 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appartements ──────────────────────────────────────────────── */}
      <section id="appartements" className="bg-palm-cream-dark py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <SectionLabel>Nos appartements</SectionLabel>
            <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
              6 appartements, 3 étages
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-palm-blue/40">
              De 500 à 750 DH · La nuit
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {FLOOR_GROUPS.map(({ floor, label, apts }) => (
              <div key={floor}>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-palm-gold/70 font-medium shrink-0">
                    {label}
                  </p>
                  <div className="h-px bg-palm-gold/20 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {apts.map((apt) => {
                    return (
                      <div
                        key={apt.id}
                        className="bg-palm-cream rounded-sm flex flex-col border border-palm-gold/10 overflow-hidden"
                      >
                        {/* Cover photo — shown only when client has validated photos for this apt */}
                        {apt.coverImage && (
                          <div className="relative aspect-4/3 w-full shrink-0">
                            <Image
                              src={apt.coverImage.src}
                              alt={apt.coverImage.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 480px"
                              loading="lazy"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display font-light italic text-xl md:text-2xl text-palm-blue leading-tight">
                              {apt.name}
                            </h3>
                            <div className="shrink-0 text-right">
                              <p className="text-2xl font-medium text-palm-gold tabular-nums">{apt.price}</p>
                              <p className="text-[9px] tracking-[0.15em] uppercase text-palm-blue/40">DH / nuit</p>
                            </div>
                          </div>

                          <div className="h-px bg-palm-gold/20" />

                          {/* Composition chambres */}
                          <div className="flex flex-col gap-1.5">
                            {apt.beds.map((bed) => (
                              <div key={bed} className="flex items-center gap-2">
                                <span className="text-palm-gold text-[8px]">✦</span>
                                <span className="text-sm text-palm-blue/70">{bed}</span>
                              </div>
                            ))}
                          </div>

                          {/* Short description — shown only when available */}
                          {apt.shortDescription && (
                            <p className="text-sm text-palm-blue/60 leading-relaxed">
                              {apt.shortDescription}
                            </p>
                          )}

                          {/* Espaces communs */}
                          <p className="text-[10px] tracking-[0.12em] text-palm-blue/40 uppercase">
                            Salon · Salle à manger · Cuisine · Salle de bain
                          </p>

                          {/* Capacité */}
                          <p className="text-[10px] tracking-widest text-palm-blue/35">
                            {apt.capacity}
                          </p>

                          {/* CTA primary: detail page */}
                          <Link
                            href={`/hebergements/${apt.id}`}
                            className="flex items-center justify-center
                              border border-palm-blue/25 text-palm-blue hover:bg-palm-blue hover:text-white
                              text-[11px] tracking-[0.14em] uppercase font-medium
                              px-7 py-3.5 rounded-full transition-all duration-300 mt-auto"
                          >
                            Voir l&apos;appartement
                          </Link>

                          {/* CTA secondary: direct booking form */}
                          <a
                            href={`?apt=${apt.id}#contact`}
                            className="text-center text-[10px] tracking-[0.15em] uppercase
                              text-palm-blue/35 hover:text-palm-blue/60 transition-colors duration-200"
                          >
                            Réserver directement
                          </a>

                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────── */}
      <section className="bg-palm-blue py-16 md:py-20">
        <div className="h-px bg-gradient-to-r from-transparent via-palm-gold/40 to-transparent mb-16" />
        <div className="max-w-xl mx-auto px-5 flex flex-col items-center text-center gap-5">
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-white">
            Prêt à réserver ?
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/35">
            Disponible 7j/7 · Réponse rapide · Sans engagement
          </p>
          <WhatsAppButton
            href={generalWAUrl}
            className="group flex items-center gap-3 bg-white hover:bg-palm-cream text-palm-blue
              text-[11px] tracking-[0.18em] uppercase font-medium
              px-8 py-4 rounded-full transition-all duration-300
              shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
            Vérifier disponibilité
          </WhatsAppButton>
          <a
            href="#contact"
            className="text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            ou envoyez un message ↓
          </a>
        </div>
      </section>

      {/* ── Autres services ──────────────────────────────────────────── */}
      <section className="bg-palm-cream border-t border-palm-gold/15 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 mb-6">
            Découvrez aussi
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Restaurant', href: '/restaurant', detail: 'Cuisine locale & internationale' },
              { label: 'Café', href: '/cafe', detail: 'Petit-déjeuner & boissons' },
              { label: 'Location voiture', href: '/location-voiture', detail: 'À la journée ou à la semaine' },
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

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <FAQSection items={FAQ_ITEMS} />

      {/* ── Contact form ──────────────────────────────────────────────── */}
      <ServiceContactForm service="accommodation" />
    </>
  )
}
