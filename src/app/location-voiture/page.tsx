import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'

export const metadata: Metadata = {
  title: "Location de voitures à Dakhla | Palm d'Or",
  description: "Louez une voiture propre et fiable à Dakhla. Location à la journée ou à la semaine. Process simple, disponible rapidement. Contactez Palm d'Or via WhatsApp.",
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
      images={[
        {
          src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80',
          alt: 'Location de voiture à Dakhla',
        },
      ]}
      service="car_rental"
      ctaLabel="Demander disponibilité"
    />
  )
}
