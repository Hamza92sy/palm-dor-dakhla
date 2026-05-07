export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/assets/photos-client/chambre-double.jpg',
    alt: "Chambre avec grand lit — Appartement Standard Palm d'Or Dakhla",
    service: 'hebergement',
    featured: true,
  },
  {
    src: '/assets/photos-client/restaurant-seafood-gros-plan.jpg',
    alt: "Fruits de mer frais au restaurant Palm d'Or Dakhla — crevettes et calamars",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/restaurant-salle.jpg',
    alt: "Salle du restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/de (136).jpg',
    alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/de (175).jpg',
    alt: "Salon d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (199).jpg',
    alt: "Chambre avec 2 lits — Appartement 2 chambres Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/de (218).jpg',
    alt: "Chambre grande capacité — Appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
]
