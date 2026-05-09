export type ApartmentId = 'apt-1' | 'apt-2' | 'apt-3' | 'apt-4' | 'apt-5' | 'apt-6'

export interface Apartment {
  id:        ApartmentId
  name:      string      // "Appartement 1" — used in email/CSV/display
  floor:     2 | 3 | 4
  price:     number
  bedrooms:  number
  beds:      string[]    // per-bedroom descriptions for page rendering
  maxGuests: number
  capacity:  string      // "Idéal 2 personnes" for page
  waMessage: string      // pre-filled WhatsApp text for hebergements CTA
}

export const APARTMENTS: Apartment[] = [
  {
    id: 'apt-1', name: 'Appartement 1', floor: 2, price: 500,
    bedrooms: 1,
    beds: ['1 chambre avec grand lit'],
    maxGuests: 2, capacity: 'Idéal 2 personnes',
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 1 (500 DH/nuit) — 2e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 'apt-2', name: 'Appartement 2', floor: 2, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 2 (650 DH/nuit) — 2e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 'apt-3', name: 'Appartement 3', floor: 3, price: 750,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    maxGuests: 5, capacity: "Jusqu'à 5 personnes",
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 3 (750 DH/nuit) — 3e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 'apt-4', name: 'Appartement 4', floor: 3, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec lit king-size', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 4 (650 DH/nuit) — 3e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 'apt-5', name: 'Appartement 5', floor: 4, price: 750,
    bedrooms: 2,
    beds: ['1 chambre avec grand lit double', '1 chambre avec 3 lits séparés'],
    maxGuests: 5, capacity: "Jusqu'à 5 personnes",
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 5 (750 DH/nuit) — 4e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
  },
  {
    id: 'apt-6', name: 'Appartement 6', floor: 4, price: 650,
    bedrooms: 2,
    beds: ['1 chambre avec lit king-size', '1 chambre avec 2 lits simples'],
    maxGuests: 4, capacity: "Jusqu'à 4 personnes",
    waMessage: "Bonjour, je suis intéressé(e) par l'Appartement 6 (650 DH/nuit) — 4e étage, à Palm d'Or Dakhla. Pouvez-vous confirmer la disponibilité ?",
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
