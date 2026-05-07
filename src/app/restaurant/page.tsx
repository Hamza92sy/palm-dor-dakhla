import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'
import MenuSection from '@/components/restaurant/MenuSection'

export const metadata: Metadata = {
  title: "Restaurant à Dakhla — Palm d'Or",
  description: "Cuisine savoureuse dans une ambiance conviviale à Dakhla. Spécialités locales et internationales, produits frais, service rapide. Réservez votre table via WhatsApp.",
  alternates: {
    canonical: '/restaurant',
  },
  openGraph: {
    title: "Restaurant à Dakhla — Palm d'Or",
    description: "Cuisine savoureuse à Dakhla. Spécialités locales et internationales, produits frais. Réservation rapide via WhatsApp.",
    url: '/restaurant',
    siteName: "Palm d'Or Dakhla",
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Restaurant Palm d'Or Dakhla" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Restaurant à Dakhla — Palm d'Or",
    description: "Cuisine savoureuse à Dakhla. Spécialités locales et internationales, produits frais.",
    images: ['/og-image.jpg'],
  },
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
          src: '/assets/photos-client/restaurant-salle.jpg',
          alt: 'Salle du restaurant Palm d\'Or Dakhla',
        },
        {
          src: '/assets/photos-client/restaurant-seafood.jpg',
          alt: 'Plateau de fruits de mer au restaurant Palm d\'Or Dakhla — crevettes et calamars',
        },
        {
          src: '/assets/photos-client/restaurant-burger.jpg',
          alt: 'Burger maison et frites au restaurant Palm d\'Or Dakhla',
        },
        {
          src: '/assets/photos-client/restaurant-salade.jpg',
          alt: 'Salade fraîche crevettes avocat mangue au restaurant Palm d\'Or Dakhla',
        },
        {
          src: '/assets/photos-client/restaurant-table.jpg',
          alt: 'Table dressée au restaurant Palm d\'Or Dakhla',
        },
      ]}
      service="restaurant"
      ctaLabel="Réserver une table"
      menuSection={<MenuSection />}
    />
  )
}
