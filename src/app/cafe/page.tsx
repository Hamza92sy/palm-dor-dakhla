import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'
import FAQSection from '@/components/ui/FAQSection'
import { cafeSchema, faqSchema } from '@/lib/schemas'

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

const FAQ_ITEMS = [
  {
    question: "Que propose le café Palm d'Or à Dakhla ?",
    answer: "Le café Palm d'Or propose des petits-déjeuners complets et équilibrés, du café, du thé, des jus et boissons fraîches. Un endroit idéal pour bien commencer sa journée à Dakhla.",
  },
  {
    question: "Le café Palm d'Or est-il ouvert le matin ?",
    answer: "Oui, le café est ouvert chaque matin. Pour connaître les horaires précis, contactez-nous directement via WhatsApp ou par email.",
  },
  {
    question: "L'ambiance du café est-elle calme ?",
    answer: "Oui, l'ambiance du café Palm d'Or est calme et agréable, idéale pour un petit-déjeuner tranquille, un moment de détente ou un café en début de journée.",
  },
  {
    question: "Faut-il séjourner dans la résidence pour venir au café ?",
    answer: "Non, le café Palm d'Or est accessible à tous. Que vous séjourniez dans nos appartements ou non, vous êtes les bienvenus pour un café ou un petit-déjeuner.",
  },
  {
    question: "Comment contacter le café Palm d'Or Dakhla ?",
    answer: "Contactez-nous via WhatsApp au +212 661 931 317 ou par email à reservation@palmdordakhla.com pour toute question ou demande.",
  },
]

export default function CafePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_ITEMS)) }}
      />
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
            src: '/assets/photos-client/cafe-salle.jpg',
            alt: "Intérieur du Café Palm d'Or Dakhla — salon fauteuils velours verts",
          },
          {
            src: '/assets/photos-client/de (136).jpg',
            alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
          },
          {
            src: '/assets/photos-client/cafe-crepes.jpg',
            alt: "Crêpes nutella et fruits frais au Café Palm d'Or Dakhla",
          },
        ]}
        service="cafe"
        ctaLabel="Nous contacter"
        faqSection={<FAQSection items={FAQ_ITEMS} />}
      />
    </>
  )
}
