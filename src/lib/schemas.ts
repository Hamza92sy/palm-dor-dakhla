import {
  SITE_URL,
  BUSINESS_FULL_NAME,
  BUSINESS_NAME,
  BUSINESS_ADDRESS_LINE_1,
  BUSINESS_EMAIL,
  BUSINESS_LATITUDE,
  BUSINESS_LONGITUDE,
  GOOGLE_MAPS_URL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  WHATSAPP_PHONE_DISPLAY,
} from './config'
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from './google-reviews'

const address = {
  '@type': 'PostalAddress',
  streetAddress: BUSINESS_ADDRESS_LINE_1,
  addressLocality: 'Dakhla',
  postalCode: '73000',
  addressCountry: 'MA',
}

const geo = {
  '@type': 'GeoCoordinates',
  latitude: BUSINESS_LATITUDE,
  longitude: BUSINESS_LONGITUDE,
}

const sameAsUrls = [INSTAGRAM_URL, ...(GOOGLE_BUSINESS_URL ? [GOOGLE_BUSINESS_URL] : [])]

const sharedContact = {
  telephone: WHATSAPP_PHONE_DISPLAY,
  email: BUSINESS_EMAIL,
  address,
  geo,
  hasMap: GOOGLE_BUSINESS_URL || GOOGLE_MAPS_URL,
  sameAs: sameAsUrls,
}

// /hebergements — LodgingBusiness with per-tier Offers
export const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE_URL}/hebergements`,
  name: `${BUSINESS_FULL_NAME} — Appartements`,
  description:
    "6 appartements meublés à Dakhla. 3 configurations : Standard (500 DH/nuit), 2 chambres (650 DH/nuit), Grande capacité (750 DH/nuit).",
  url: `${SITE_URL}/hebergements`,
  ...sharedContact,
  image: `${SITE_URL}/assets/photos-client/chambre-double.jpg`,
  priceRange: 'DH 500–750',
  openingHours: 'Mo-Su 00:00-23:59',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING,
    bestRating: 5,
    worstRating: 1,
    reviewCount: parseInt(GOOGLE_REVIEW_COUNT, 10),
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `Appartements ${BUSINESS_FULL_NAME}`,
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Appartement Standard',
        description: "1 chambre avec grand lit. Salon, cuisine, salle à manger, salle de bain. Idéal 2 personnes.",
        price: '500',
        priceCurrency: 'MAD',
      },
      {
        '@type': 'Offer',
        name: 'Appartement 2 chambres',
        description: "1 chambre grand lit + 1 chambre 2 lits simples. Salon, cuisine, salle à manger, salle de bain. Jusqu'à 4 personnes.",
        price: '650',
        priceCurrency: 'MAD',
      },
      {
        '@type': 'Offer',
        name: 'Appartement grande capacité',
        description: "1 chambre grand lit + 1 chambre 3 lits séparés. Salon, cuisine, salle à manger, salle de bain. Jusqu'à 5 personnes.",
        price: '750',
        priceCurrency: 'MAD',
      },
    ],
  },
}

// /restaurant — Restaurant
export const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/restaurant`,
  name: BUSINESS_NAME,
  description:
    "Cuisine savoureuse dans une ambiance conviviale à Dakhla. Spécialités locales et internationales, produits frais cuisinés chaque jour.",
  url: `${SITE_URL}/restaurant`,
  ...sharedContact,
  image: `${SITE_URL}/assets/photos-client/restaurant-palmdor.jpg`,
  servesCuisine: ['Cuisine marocaine', 'Cuisine internationale'],
  openingHours: 'Mo-Su 08:00-23:30',
}

// /cafe — CafeOrCoffeeShop
export const cafeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  '@id': `${SITE_URL}/cafe`,
  name: "Café Palm d'Or",
  description:
    "Café et petit-déjeuner complet à Dakhla. Produits frais, ambiance calme, service rapide. Ouvert chaque matin.",
  url: `${SITE_URL}/cafe`,
  ...sharedContact,
  image: `${SITE_URL}/assets/photos-client/cafe-salle.jpg`,
  servesCuisine: ['Café', 'Thé', 'Petit-déjeuner', 'Boissons fraîches'],
  openingHours: 'Mo-Su 08:00-23:30',
}

// FAQPage schema — accepts items from FAQSection
export interface FAQSchemaItem {
  question: string
  answer: string
}

export function faqSchema(items: FAQSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// /location-voiture — AutoRental
export const autoRentalSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': `${SITE_URL}/location-voiture`,
  name: `${BUSINESS_FULL_NAME} — Location de voitures`,
  description:
    "Location de voitures à Dakhla. Véhicules propres et entretenus, disponibles à la journée ou à la semaine. Contact rapide via WhatsApp.",
  url: `${SITE_URL}/location-voiture`,
  ...sharedContact,
  areaServed: 'Dakhla',
}
