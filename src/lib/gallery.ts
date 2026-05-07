export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // ── Hébergement ──────────────────────────────────────────────
  {
    src: '/assets/photos-client/chambre-double.jpg',
    alt: "Chambre avec grand lit — Appartement Standard Palm d'Or Dakhla",
    service: 'hebergement',
    featured: true,
  },
  // ── Restaurant — plats & salle ────────────────────────────────
  {
    src: '/assets/photos-client/restaurant-seafood-gros-plan.jpg',
    alt: "Fruits de mer frais — crevettes et calamars grillés au restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  // ── Café ─────────────────────────────────────────────────────
  {
    src: '/assets/photos-client/cafe-salle.jpg',
    alt: "Intérieur du Café Palm d'Or Dakhla — fauteuils velours verts et bar",
    service: 'cafe',
  },
  // ── Restaurant (suite) ────────────────────────────────────────
  {
    src: '/assets/photos-client/restaurant-salade.jpg',
    alt: "Salade fraîche crevettes avocat mangue au restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/de (175).jpg',
    alt: "Salon d'un appartement Palm d'Or Dakhla",
    service: 'hebergement',
  },
  // ── slice(0,5) above = homepage gallery ──────────────────────
  {
    src: '/assets/photos-client/restaurant-salle.jpg',
    alt: "Salle du restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/restaurant-burger.jpg',
    alt: "Burger maison et frites au restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/de (136).jpg',
    alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/cafe-terrasse.jpg',
    alt: "Terrasse du Café Palm d'Or Dakhla — palmiers et avenue de Dakhla",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/de (199).jpg',
    alt: "Chambre avec 2 lits — Appartement 2 chambres Palm d'Or Dakhla",
    service: 'hebergement',
  },
]
