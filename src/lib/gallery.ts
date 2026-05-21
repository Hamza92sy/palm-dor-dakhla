export interface GalleryImage {
  src: string
  alt: string
  service: 'hebergement' | 'restaurant' | 'cafe' | 'location'
  featured?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // ── Accueil / Identité Palm d'Or ─────────────────────────────
  {
    src: '/assets/photos-client/reception-lobby.jpg',
    alt: "Réception et lobby Palm d'Or Dakhla — accueil de la résidence",
    service: 'hebergement',
    featured: true,
  },
  // ── Hébergements ──────────────────────────────────────────────
  {
    src: '/assets/photos-client/apartments/apt-4/apt-4-chambre-1.jpg',
    alt: "Chambre principale avec lit king-size — Appartement 4 Palm d'Or Dakhla",
    service: 'hebergement',
  },
  // ── Restaurant ────────────────────────────────────────────────
  {
    src: '/assets/photos-client/restaurant-salle-branded.jpg',
    alt: "Salle du restaurant Palm d'Or Dakhla — enseigne PALMDOR",
    service: 'restaurant',
  },
  // ── Café ─────────────────────────────────────────────────────
  {
    src: '/assets/photos-client/cafe-salle.jpg',
    alt: "Intérieur du Café Palm d'Or Dakhla — fauteuils velours verts et bar",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/restaurant-seafood-gros-plan.jpg',
    alt: "Fruits de mer frais — crevettes et calamars grillés au restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  // ── slice(0,5) above = homepage gallery ──────────────────────
  {
    src: '/assets/photos-client/apartments/apt-5/apt-5-salon.jpg',
    alt: "Salon avec canapé vert émeraude — Appartement 5 Palm d'Or Dakhla",
    service: 'hebergement',
  },
  {
    src: '/assets/photos-client/restaurant-salade.jpg',
    alt: "Salade fraîche crevettes avocat mangue au restaurant Palm d'Or Dakhla",
    service: 'restaurant',
  },
  {
    src: '/assets/photos-client/cafe-terrasse.jpg',
    alt: "Terrasse du Café Palm d'Or Dakhla — palmiers et avenue de Dakhla",
    service: 'cafe',
  },
  {
    src: '/assets/photos-client/de (136).jpg',
    alt: "Petit-déjeuner servi au Café Palm d'Or Dakhla",
    service: 'cafe',
  },
]
