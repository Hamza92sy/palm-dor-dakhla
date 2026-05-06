export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/assets/photos-client/de (175).jpg',
    alt: "Salon d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
    featured: true,
  },
  {
    src: '/assets/photos-client/de (199).jpg',
    alt: "Chambre d'un appartement 2 chambres Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (218).jpg',
    alt: "Chambre grande capacité d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (136).jpg',
    alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
]
