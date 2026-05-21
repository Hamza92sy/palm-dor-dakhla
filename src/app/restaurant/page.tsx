import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'
import MenuSection from '@/components/restaurant/MenuSection'
import FAQSection from '@/components/ui/FAQSection'
import { restaurantSchema, faqSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: "Restaurant à Dakhla — Palm d'Or",
  description: "Cuisine savoureuse dans une ambiance conviviale à Dakhla. Spécialités locales et internationales, produits frais, service rapide. Réservation en ligne ou via WhatsApp.",
  alternates: {
    canonical: '/restaurant',
  },
  openGraph: {
    title: "Restaurant à Dakhla — Palm d'Or",
    description: "Cuisine savoureuse à Dakhla. Spécialités locales et internationales, produits frais. Réservation rapide.",
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

const FAQ_ITEMS = [
  {
    question: "Quel type de cuisine propose le restaurant Palm d'Or ?",
    answer: "Le restaurant Palm d'Or propose une cuisine locale et internationale. Les plats sont préparés avec des produits frais cuisinés chaque jour, dans une ambiance conviviale.",
  },
  {
    question: "Comment réserver une table au restaurant Palm d'Or Dakhla ?",
    answer: "La réservation se fait simplement via WhatsApp ou le formulaire en ligne. Envoyez un message pour indiquer votre date et le nombre de personnes, et nous confirmons rapidement.",
  },
  {
    question: "Le restaurant accueille-t-il les familles et les groupes ?",
    answer: "Oui, le restaurant Palm d'Or est idéal pour les repas en famille ou entre amis. L'accueil est chaleureux et le service adapté à tous.",
  },
  {
    question: "Le restaurant Palm d'Or fait-il partie de la résidence ?",
    answer: "Oui, le restaurant est intégré à la résidence Palm d'Or Dakhla, sur AV Al Walaa. Vous pouvez vous y rendre pour un repas sans nécessairement séjourner dans la résidence.",
  },
  {
    question: "Peut-on consulter le menu avant de venir ?",
    answer: "Oui, notre carte est affichée directement sur cette page. Pour toute question ou information complémentaire, contactez-nous via le formulaire ou WhatsApp.",
  },
]

export default function RestaurantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_ITEMS)) }}
      />
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
            src: '/assets/photos-client/restaurant-salle-branded.jpg',
            alt: "Salle du restaurant Palm d'Or Dakhla — enseigne PALMDOR",
          },
          {
            src: '/assets/photos-client/restaurant-salle-nuit.jpg',
            alt: "Table réservée au restaurant Palm d'Or Dakhla — ambiance nocturne",
          },
          {
            src: '/assets/photos-client/restaurant-seafood.jpg',
            alt: "Plateau de fruits de mer au restaurant Palm d'Or Dakhla — crevettes et calamars",
          },
          {
            src: '/assets/photos-client/restaurant-salade.jpg',
            alt: "Salade fraîche crevettes avocat mangue au restaurant Palm d'Or Dakhla",
          },
          {
            src: '/assets/photos-client/restaurant-detail.jpg',
            alt: "Détail table et ambiance du restaurant Palm d'Or Dakhla",
          },
        ]}
        service="restaurant"
        ctaLabel="Réserver une table"
        primaryCta="form"
        menuSection={<MenuSection />}
        menuPdfPath="/assets/menu-restaurant-palm-dor.pdf"
        faqSection={<FAQSection items={FAQ_ITEMS} />}
      />
    </>
  )
}
