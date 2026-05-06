import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'
import MenuSection from '@/components/restaurant/MenuSection'

export const metadata: Metadata = {
  title: "Restaurant à Dakhla | Palm d'Or",
  description: "Cuisine savoureuse dans une ambiance conviviale à Dakhla. Spécialités locales et internationales, produits frais, service rapide. Réservez votre table via WhatsApp.",
}

export default function RestaurantPage() {
  return (
    <ServicePage
      title="Restaurant Palm d'Or à Dakhla"
      subtitle="Cuisine savoureuse dans une ambiance conviviale"
      points={[
        'Spécialités locales et internationales',
        'Produits frais cuisinés chaque jour',
        'Service rapide et accueil chaleureux',
        'Idéal en famille ou entre amis',
      ]}
      images={[
        {
          src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80',
          alt: 'Restaurant Palm d\'Or Dakhla — plats',
        },
        {
          src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
          alt: 'Petit-déjeuner Palm d\'Or Dakhla',
        },
      ]}
      service="restaurant"
      ctaLabel="Réserver une table"
      menuSection={<MenuSection />}
    />
  )
}
