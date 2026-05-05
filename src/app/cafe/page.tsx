import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'

export const metadata: Metadata = {
  title: "Café & Petit-Déjeuner à Dakhla | Palm d'Or",
  description: "Commencez votre journée avec un café et un petit-déjeuner complet à Dakhla. Produits frais, ambiance calme, service rapide. Palm d'Or Café.",
}

export default function CafePage() {
  return (
    <ServicePage
      title="Café & petit-déjeuner à Dakhla"
      subtitle="Commencez votre journée avec des produits frais"
      points={[
        'Petit-déjeuner complet et équilibré',
        'Café, thé et boissons fraîches',
        'Ambiance calme et agréable',
        'Service rapide, ouvert chaque matin',
      ]}
      images={[
        {
          src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80',
          alt: 'Café Palm d\'Or Dakhla',
        },
      ]}
      service="cafe"
      ctaLabel="Nous contacter"
    />
  )
}
