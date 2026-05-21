export type ApartmentId = 'apt-1' | 'apt-2' | 'apt-3' | 'apt-4' | 'apt-5' | 'apt-6'

interface ApartmentPhoto {
  src: string
  alt: string
}

export interface Apartment {
  id:          ApartmentId
  name:        string      // "Appartement 1" — used in email/CSV/display
  floor:       2 | 3 | 4
  price:       number
  bedrooms:    number
  beds:        string[]    // per-bedroom descriptions for page rendering
  maxGuests:   number
  capacity:    string      // "Idéal 2 personnes" for page
  waMessage:   string      // pre-filled WhatsApp text for hebergements CTA
  shortDescription?: string      // 1–2 sentences shown on listing card and detail page
  coverImage?: ApartmentPhoto   // primary card photo — only set when client validates photos
  gallery?:    ApartmentPhoto[] // additional photos displayed as thumbnails, in display order
}

export const APARTMENTS: Apartment[] = [
  {
    id: 'apt-1', name: 'Appartement 1', floor: 2, price: 500,
    bedrooms: 1,
    beds: ['1 chambre avec grand lit'],
    maxGuests: 2, capacity: 'Idéal 2 personnes',
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 1 (500 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Appartement 1 chambre au 2e étage pour 2 personnes. Grand lit, salon avec canapé, cuisine équipée, avec vue sur Dakhla.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-1/apt-1-salon.jpg',
      alt: "Appartement 1 — salon avec canapé et décor doré",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-1/apt-1-chambre-vue-nuit.jpg', alt: "Appartement 1 — chambre avec grand lit et vue nocturne sur Dakhla" },
      { src: '/assets/photos-client/apartments/apt-1/apt-1-cuisine.jpg',          alt: "Appartement 1 — cuisine entièrement équipée" },
      { src: '/assets/photos-client/apartments/apt-1/apt-1-salle-de-bain.jpg',    alt: "Appartement 1 — salle de bain avec douche" },
    ],
  },
  {
    id: 'apt-2', name: 'Appartement 2', floor: 2, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 2 (650 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Deux chambres au 2e étage pour 4 personnes. Grand lit double, chambre à 2 lits, salon avec canapé, cuisine équipée.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-2/apt-2-chambre-vue-mer.jpg',
      alt: "Appartement 2 — chambre principale avec vue sur Dakhla",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-2/apt-2-salon.jpg',          alt: "Appartement 2 — salon avec canapé et vue nocturne" },
      { src: '/assets/photos-client/apartments/apt-2/apt-2-salle-a-manger.jpg', alt: "Appartement 2 — salle à manger ouverte sur la cuisine" },
      { src: '/assets/photos-client/apartments/apt-2/apt-2-chambre-2.jpg',      alt: "Appartement 2 — deuxième chambre avec deux lits simples" },
      { src: '/assets/photos-client/apartments/apt-2/apt-2-vue-ensemble.jpg',   alt: "Appartement 2 — vue d'ensemble salon et salle à manger" },
    ],
  },
  {
    id: 'apt-3', name: 'Appartement 3', floor: 3, price: 750,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    maxGuests: 5, capacity: "Jusqu'à 5 personnes",
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 3 (750 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Appartement spacieux pour 5 personnes au 3e étage. Deux chambres, salon avec grand canapé, cuisine entièrement équipée.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-3/apt-3-salon.jpg',
      alt: "Appartement 3 — salon avec canapé et décor chaleureux",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-3/apt-3-chambre-principale.jpg', alt: "Appartement 3 — chambre principale avec grand lit double" },
      { src: '/assets/photos-client/apartments/apt-3/apt-3-chambre-lits.jpg',       alt: "Appartement 3 — deuxième chambre avec trois lits séparés" },
      { src: '/assets/photos-client/apartments/apt-3/apt-3-cuisine.jpg',            alt: "Appartement 3 — cuisine et salle à manger équipées" },
      { src: '/assets/photos-client/apartments/apt-3/apt-3-salle-de-bain.jpg',      alt: "Appartement 3 — salle de bain avec douche" },
    ],
  },
  {
    id: 'apt-4', name: 'Appartement 4', floor: 3, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec lit king-size', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 4 (650 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Deux chambres au 3e étage pour 4 personnes. Lit king-size, chambre à 2 lits, salon lumineux, cuisine entièrement équipée.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-4/apt-4-chambre-1.jpg',
      alt: "Appartement 4 — chambre principale avec lit king-size",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-4/apt-4-salon.jpg',                alt: "Appartement 4 — salon avec canapé et coin salle à manger" },
      { src: '/assets/photos-client/apartments/apt-4/apt-4-chambre-vue-nuit.jpg',     alt: "Appartement 4 — chambre king-size avec vue nocturne sur Dakhla" },
      { src: '/assets/photos-client/apartments/apt-4/apt-4-salle-de-bain-vasque.jpg', alt: "Appartement 4 — salle de bain avec vasque dorée" },
      { src: '/assets/photos-client/apartments/apt-4/apt-4-cuisine.jpg',              alt: "Appartement 4 — cuisine entièrement équipée" },
    ],
  },
  {
    id: 'apt-5', name: 'Appartement 5', floor: 4, price: 750,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    maxGuests: 5, capacity: "Jusqu'à 5 personnes",
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 5 (750 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Appartement spacieux pour 5 personnes au 4e étage. Deux chambres, salon avec canapé vert émeraude, cuisine entièrement équipée.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-5/apt-5-salon.jpg',
      alt: "Appartement 5 — salon avec canapé vert émeraude et table basse dorée",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-5/apt-5-chambre-principale.jpg', alt: "Appartement 5 — chambre principale avec grand lit double" },
      { src: '/assets/photos-client/apartments/apt-5/apt-5-chambre-lits.jpg',       alt: "Appartement 5 — deuxième chambre avec trois lits séparés" },
      { src: '/assets/photos-client/apartments/apt-5/apt-5-cuisine.jpg',            alt: "Appartement 5 — cuisine et salle à manger équipées" },
      { src: '/assets/photos-client/apartments/apt-5/apt-5-salle-de-bain.jpg',      alt: "Appartement 5 — salle de bain avec douche" },
    ],
  },
  {
    id: 'apt-6', name: 'Appartement 6', floor: 4, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec lit king-size', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je souhaite des informations sur l'Appartement 6 (650 DH/nuit) à Palm d'Or Dakhla.",
    shortDescription: "Deux chambres au 4e étage pour 4 personnes. Lit king-size, cuisine équipée, salon avec vue sur la ville.",
    coverImage: {
      src: '/assets/photos-client/apartments/apt-6/apt-6-salon.jpg',
      alt: "Appartement 6 — salon avec canapé blanc et vue panoramique",
    },
    gallery: [
      { src: '/assets/photos-client/apartments/apt-6/apt-6-vue-dakhla.jpg',      alt: "Appartement 6 — vue panoramique sur Dakhla depuis le 4e étage" },
      { src: '/assets/photos-client/apartments/apt-6/apt-6-chambre-1.jpg',       alt: "Appartement 6 — chambre principale avec lit king-size" },
      { src: '/assets/photos-client/apartments/apt-6/apt-6-salle-a-manger.jpg',  alt: "Appartement 6 — salle à manger avec table et chaises" },
    ],
  },
]

export const APARTMENT_MAP = Object.fromEntries(
  APARTMENTS.map(a => [a.id, a])
) as Record<string, Apartment>

// New valid IDs only — for API validation of new leads
export const VALID_APARTMENT_IDS: readonly string[] = APARTMENTS.map(a => a.id)

// Includes legacy values so old leads (standard / 2-chambres / grande-capacite) pass API validation
export const ALL_VALID_APARTMENT_IDS: readonly string[] = [
  ...VALID_APARTMENT_IDS,
  'standard', '2-chambres', 'grande-capacite',
]

export function getApartmentLabel(id: string | null | undefined): string {
  if (!id) return ''
  const apt = APARTMENT_MAP[id]
  if (apt) return `${apt.name} (${apt.price} DH/nuit)`
  const legacy: Record<string, string> = {
    'standard':        'Standard (500 DH/nuit)',
    '2-chambres':      '2 Chambres (650 DH/nuit)',
    'grande-capacite': 'Grande capacité (750 DH/nuit)',
  }
  return legacy[id] ?? id
}

export function getApartmentLabelEn(id: string | null | undefined): string {
  if (!id) return ''
  const apt = APARTMENT_MAP[id]
  if (apt) return `Apartment ${apt.id.replace('apt-', '')} (${apt.price} MAD/night)`
  const legacy: Record<string, string> = {
    'standard':        'Standard (500 MAD/night)',
    '2-chambres':      '2 Bedrooms (650 MAD/night)',
    'grande-capacite': 'Large capacity (750 MAD/night)',
  }
  return legacy[id] ?? id
}
