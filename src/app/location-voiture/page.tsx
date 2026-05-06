import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'

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

export default function LocationVoiturePage() {
  return (
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
    />
  )
}
