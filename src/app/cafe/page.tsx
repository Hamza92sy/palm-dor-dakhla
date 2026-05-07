import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'

export const metadata: Metadata = {
  title: "Café & Petit-Déjeuner à Dakhla — Palm d'Or",
  description: "Commencez votre journée avec un café et un petit-déjeuner complet à Dakhla. Produits frais, ambiance calme, service rapide. Palm d'Or Café.",
  alternates: {
    canonical: '/cafe',
  },
  openGraph: {
    title: "Café & Petit-Déjeuner à Dakhla — Palm d'Or",
    description: "Café et petit-déjeuner complet à Dakhla. Produits frais, ambiance calme. Palm d'Or Café.",
    url: '/cafe',
    siteName: "Palm d'Or Dakhla",
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Café Palm d'Or Dakhla" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Café & Petit-Déjeuner à Dakhla — Palm d'Or",
    description: "Café et petit-déjeuner complet à Dakhla. Produits frais, ambiance calme.",
    images: ['/og-image.jpg'],
  },
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
          src: '/assets/photos-client/de (136).jpg',
          alt: 'Petit-déjeuner servi au Café Palm d\'Or Dakhla',
        },
        {
          src: '/assets/photos-client/cafe-crepes.jpg',
          alt: 'Crêpes nutella et fruits frais au Café Palm d\'Or Dakhla',
        },
        {
          src: '/assets/photos-client/cafe-ambiance.jpg',
          alt: 'Ambiance du Café Palm d\'Or Dakhla — espace lounge marocain',
        },
      ]}
      service="cafe"
      ctaLabel="Nous contacter"
    />
  )
}
