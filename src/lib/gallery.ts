export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/assets/photos-client/de (175).jpg',
    alt: "Salon principal d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
    featured: true,
  },
  {
    src: '/assets/photos-client/de (201).jpg',
    alt: "Chambre d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (200).jpg',
    alt: "Chambre principale d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (136).jpg',
    alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/de (206).jpg',
    alt: "Chambre d'un appartement grande capacité Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (130).jpg',
    alt: "Deuxième vue du petit-déjeuner au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
]
