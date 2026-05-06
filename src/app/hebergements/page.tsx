import type { Metadata } from 'next'
import Image from 'next/image'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ServiceContactForm from '@/components/service/ServiceContactForm'
import SectionLabel from '@/components/ui/SectionLabel'
import { getServiceWhatsAppUrl } from '@/lib/services'

export const metadata: Metadata = {
  title: "Appartements à Dakhla — Palm d'Or",
  description: "5 appartements entièrement équipés à Dakhla. De 500 à 750 DH la nuit. Idéal pour couples, familles et groupes. Réponse rapide via WhatsApp.",
  alternates: {
    canonical: '/hebergements',
  },
}

const apartments = [
  {
    id: 1,
    name: 'Appartement Standard',
    floor: '2e étage',
    price: 500,
    bedrooms: ['1 chambre avec grand lit'],
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement Standard (500 DH/nuit) à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 2,
    name: 'Appartement 2 chambres',
    floor: '2e étage',
    price: 650,
    bedrooms: ['1 chambre avec grand lit double', '1 chambre avec 2 lits simples'],
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 2 chambres au 2e étage (650 DH/nuit) à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 3,
    name: 'Appartement Grande capacité',
    floor: '3e étage',
    price: 750,
    bedrooms: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement Grande capacité au 3e étage (750 DH/nuit) à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 4,
    name: 'Appartement 2 chambres',
    floor: '4e étage',
    price: 650,
    bedrooms: ['1 chambre avec lit king-size', '1 chambre avec 2 lits simples'],
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 2 chambres au 4e étage (650 DH/nuit) à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 5,
    name: 'Appartement Grande capacité',
    floor: '4e étage',
    price: 750,
    bedrooms: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement Grande capacité au 4e étage (750 DH/nuit) à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
]

function getApartmentWAUrl(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return '#'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

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

export default function HebergementsPage() {
  const generalWAUrl = getServiceWhatsAppUrl('accommodation')

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
        <Image
          src="/assets/photos-client/de (175).jpg"
          alt="Salon principal d'un appartement Palm d'Or Dakhla"
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
            5 appartements complets · Idéal couples, familles et groupes
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <WhatsAppButton
              href={generalWAUrl}
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DAF57] text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-colors duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
              Vérifier disponibilité
            </WhatsAppButton>
            <a
              href="#appartements"
              className="flex items-center gap-2.5 border border-white/30 text-white/75 hover:border-white/60 hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Voir nos appartements
            </a>
          </div>
        </div>
      </section>

      {/* ── Avantages ─────────────────────────────────────────────────── */}
      <section className="bg-palm-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              'Appartements entièrement équipés — salon, cuisine, salle à manger, salle de bain',
              'Idéal pour couples, familles et groupes jusqu\'à 5 personnes',
              'Réservation simple et rapide via WhatsApp',
              'Disponible selon vos dates — réponse rapide garantie',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm text-palm-blue/70 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <WhatsAppButton
              href={generalWAUrl}
              className="group flex items-center gap-2.5 border border-[#25D366] text-[#1a9e51] hover:bg-[#25D366] hover:text-white
                text-[11px] tracking-[0.14em] uppercase font-medium
                px-7 py-3.5 rounded-full transition-all duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              Vérifier disponibilité
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ── Appartements ──────────────────────────────────────────────── */}
      <section id="appartements" className="bg-palm-cream-dark py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <SectionLabel>Nos appartements</SectionLabel>
            <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
              5 appartements, 3 configurations
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-palm-blue/40">
              De 500 à 750 DH · La nuit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {apartments.map((apt) => {
              const waUrl = getApartmentWAUrl(apt.waMessage)
              return (
                <div
                  key={apt.id}
                  className="bg-palm-cream rounded-sm p-6 flex flex-col gap-4 border border-palm-gold/10"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-palm-blue/40 mb-1">
                        {apt.floor}
                      </p>
                      <h3 className="font-display font-light italic text-xl md:text-2xl text-palm-blue leading-tight">
                        {apt.name}
                      </h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-medium text-palm-gold tabular-nums">{apt.price}</p>
                      <p className="text-[9px] tracking-[0.15em] uppercase text-palm-blue/40">DH / nuit</p>
                    </div>
                  </div>

                  <div className="h-px bg-palm-gold/20" />

                  {/* Composition chambres */}
                  <div className="flex flex-col gap-1.5">
                    {apt.bedrooms.map((bed) => (
                      <div key={bed} className="flex items-center gap-2">
                        <span className="text-palm-gold text-[8px]">✦</span>
                        <span className="text-sm text-palm-blue/70">{bed}</span>
                      </div>
                    ))}
                  </div>

                  {/* Espaces communs */}
                  <p className="text-[10px] tracking-[0.12em] text-palm-blue/40 uppercase">
                    Salon · Salle à manger · Cuisine · Salle de bain
                  </p>

                  {/* CTA */}
                  <WhatsAppButton
                    href={waUrl}
                    className="group flex items-center justify-center gap-2.5 border border-[#25D366] text-[#1a9e51] hover:bg-[#25D366] hover:text-white
                      text-[11px] tracking-[0.14em] uppercase font-medium
                      px-7 py-3.5 rounded-full transition-all duration-300 mt-auto"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    Vérifier disponibilité
                  </WhatsAppButton>
                </div>
              )
            })}
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

      {/* ── Contact form ──────────────────────────────────────────────── */}
      <ServiceContactForm service="accommodation" />
    </>
  )
}
