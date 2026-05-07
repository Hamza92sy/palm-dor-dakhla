import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'
import FAQSection from '@/components/ui/FAQSection'
import { autoRentalSchema, faqSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: "Location de voitures à Dakhla — Palm d'Or",
  description: "Louez une voiture propre et fiable à Dakhla. Location à la journée ou à la semaine. Process simple, disponible rapidement. Contactez Palm d'Or via WhatsApp.",
  alternates: {
    canonical: '/location-voiture',
  },
  openGraph: {
    title: "Location de voitures à Dakhla — Palm d'Or",
    description: "Location voiture à Dakhla, à la journée ou à la semaine. Véhicules propres, process simple. Palm d'Or Dakhla.",
    url: '/location-voiture',
    siteName: "Palm d'Or Dakhla",
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Location voiture Dakhla — Palm d'Or" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Location de voitures à Dakhla — Palm d'Or",
    description: "Location voiture à Dakhla. Véhicules propres, à la journée ou à la semaine.",
    images: ['/og-image.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: "Comment louer une voiture à Dakhla via Palm d'Or ?",
    answer: "Envoyez un message via WhatsApp en précisant vos dates et vos besoins. Nous confirmeons la disponibilité et les modalités rapidement, sans paperasse excessive.",
  },
  {
    question: "Peut-on louer une voiture à la journée ou à la semaine ?",
    answer: "Oui, nous proposons la location à la journée comme à la semaine, selon vos besoins et la durée de votre séjour à Dakhla.",
  },
  {
    question: "Les véhicules sont-ils en bon état ?",
    answer: "Oui, nos voitures sont propres et régulièrement entretenues. Nous mettons tout en œuvre pour vous assurer un déplacement serein à Dakhla et dans la région.",
  },
  {
    question: "La location est-elle disponible pour les voyageurs et les professionnels ?",
    answer: "Oui, nos véhicules sont disponibles aussi bien pour les touristes que pour les professionnels en déplacement à Dakhla.",
  },
  {
    question: "Y a-t-il beaucoup de démarches pour louer une voiture ?",
    answer: "Non, le process est simple. Contactez-nous via WhatsApp, nous vous guidons directement sans formalités excessives.",
  },
]

export default function LocationVoiturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRentalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_ITEMS)) }}
      />
      <ServicePage
        title="Location de voitures à Dakhla"
        subtitle="Des véhicules disponibles pour vos déplacements"
        points={[
          'Voitures propres et entretenues',
          'Location à la journée ou à la semaine',
          'Process simple, sans paperasse excessive',
          'Disponible rapidement sur demande',
        ]}
        images={[]}
        service="car_rental"
        ctaLabel="Demander disponibilité"
        heroNotice="Photos des véhicules disponibles prochainement"
        faqSection={<FAQSection items={FAQ_ITEMS} />}
      />
    </>
  )
}
