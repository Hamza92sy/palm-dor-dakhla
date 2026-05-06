export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    alt: "Salle du restaurant Palm d'Or Dakhla",
    service: 'restaurant',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    alt: "Salon d'appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    alt: "Chambre d'appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    alt: "Espace café Palm d'Or Dakhla",
    service: 'cafe',
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
    alt: "Appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
    alt: "Petit-déjeuner Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    alt: "Boissons et café Palm d'Or Dakhla",
    service: 'cafe',
  },
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    alt: "Service de location de voiture Palm d'Or Dakhla",
    service: 'location',
  },
]
