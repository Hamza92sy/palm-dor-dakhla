import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import LeadForm from '@/components/home/LeadForm'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import {
  BUSINESS_ADDRESS_LINE_1,
  BUSINESS_ADDRESS_LINE_2,
  BUSINESS_COUNTRY,
  BUSINESS_FULL_NAME,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_PHONE_DISPLAY,
} from '@/lib/config'

export const metadata: Metadata = {
  title: "Contact Palm d'Or Dakhla",
  description:
    "Contactez Palm d'Or Dakhla, AV Al Walaa, Dakhla 73000. Résidence, restaurant, café et location de voiture. Réponse rapide via WhatsApp.",
  keywords: [
    "Palm d'Or Dakhla",
    'Dakhla',
    'AV Al Walaa',
    'résidence Dakhla',
    'restaurant Dakhla',
    'café Dakhla',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Palm d'Or Dakhla",
    description:
      "Adresse Palm d'Or Dakhla sur AV Al Walaa, Dakhla 73000. Contact rapide via WhatsApp pour la résidence, le restaurant et le café.",
    url: '/contact',
    siteName: BUSINESS_FULL_NAME,
    locale: 'fr_MA',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Palm d'Or Dakhla — Résidence, Restaurant & Café à Dakhla",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Palm d'Or Dakhla",
    description:
      "Adresse Palm d'Or Dakhla sur AV Al Walaa, Dakhla 73000. Contact rapide via WhatsApp.",
    images: ['/og-image.jpg'],
  },
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

export default function ContactPage() {
  return (
    <>
      <section className="bg-palm-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl flex flex-col gap-4 mb-12 md:mb-14">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="font-display font-light italic text-4xl md:text-6xl text-palm-blue leading-tight">
              Contactez Palm d&apos;Or Dakhla
            </h1>
            <p className="text-sm md:text-base text-palm-blue/70 leading-8 max-w-[58ch]">
              Retrouvez Palm d&apos;Or Dakhla sur AV Al Walaa à Dakhla pour vos demandes de
              résidence, restaurant, café ou location de voiture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8">
            <div className="bg-palm-cream-dark border border-palm-gold/15 rounded-sm p-6 md:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 font-medium">
                  Adresse
                </p>
                <address className="not-italic text-sm md:text-base text-palm-blue/70 leading-8">
                  <p className="font-display font-light italic text-2xl md:text-3xl text-palm-blue leading-tight mb-2">
                    {BUSINESS_FULL_NAME}
                  </p>
                  <p>{BUSINESS_ADDRESS_LINE_1}</p>
                  <p>{BUSINESS_ADDRESS_LINE_2}</p>
                  <p>{BUSINESS_COUNTRY}</p>
                </address>
              </div>

              <div className="h-px bg-palm-gold/20" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 font-medium">
                    Téléphone
                  </p>
                  <a
                    href={WHATSAPP_PHONE_DISPLAY ? `tel:${WHATSAPP_PHONE_DISPLAY.replace(/\s+/g, '')}` : '#'}
                    className="text-lg text-palm-blue hover:text-palm-gold transition-colors duration-200 w-fit"
                  >
                    {WHATSAPP_PHONE_DISPLAY || 'Numéro à confirmer'}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 font-medium">
                    Services
                  </p>
                  <p className="text-sm text-palm-blue/70 leading-7">
                    Résidence, restaurant, café et location de voitures à Dakhla.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <WhatsAppButton
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DAF57] text-white
                    text-[11px] tracking-[0.14em] uppercase font-medium px-6 py-3.5 rounded-full transition-colors duration-300"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  Écrire sur WhatsApp
                </WhatsAppButton>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-palm-gold/40 text-palm-blue hover:bg-palm-gold hover:text-white
                    text-[11px] tracking-[0.14em] uppercase font-medium px-6 py-3.5 rounded-full transition-all duration-300"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>

              <div className="h-px bg-palm-gold/20" />

              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-palm-blue/40 font-medium">
                  Suivez-nous
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-palm-blue/60 hover:text-palm-blue transition-colors duration-200 w-fit"
                  aria-label="Instagram Palm d'Or Dakhla"
                >
                  <InstagramIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

            <div className="bg-white/70 border border-palm-gold/15 rounded-sm p-6 md:p-8 flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.28em] uppercase text-palm-gold font-medium">
                Demande rapide
              </p>
              <h2 className="font-display font-light italic text-2xl md:text-3xl text-palm-blue">
                Un premier contact simple
              </h2>
              <p className="text-sm text-palm-blue/65 leading-7">
                Envoyez votre demande si vous souhaitez être rappelé ou orienté vers le bon
                service avant de poursuivre sur WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-palm-cream-dark border-y border-palm-gold/15 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-start">
            <div className="flex flex-col gap-4">
              <SectionLabel>Nous trouver</SectionLabel>
              <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
                Palm d&apos;Or sur AV Al Walaa
              </h2>
              <p className="text-sm md:text-base text-palm-blue/70 leading-8 max-w-[52ch]">
                Notre emplacement à Dakhla facilite l&apos;accès pour un repas, un café, une
                demande de résidence ou une prise de contact rapide avant réservation.
              </p>
              <div className="text-sm text-palm-blue/65 leading-8">
                <p>{BUSINESS_FULL_NAME}</p>
                <p>{BUSINESS_ADDRESS_LINE_1}</p>
                <p>{BUSINESS_ADDRESS_LINE_2}</p>
                <p>{BUSINESS_COUNTRY}</p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-palm-blue/60 hover:text-palm-gold transition-colors duration-200"
              >
                Itinéraire Google Maps
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="overflow-hidden rounded-sm border border-palm-gold/15 bg-white shadow-[0_16px_50px_rgba(28,58,40,0.08)]">
              <iframe
                title="Google Maps - Palm d'Or Dakhla"
                src={GOOGLE_MAPS_EMBED_URL}
                className="h-[320px] md:h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <LeadForm />
    </>
  )
}
