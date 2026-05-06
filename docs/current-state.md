# État actuel du projet

Dernière mise à jour : 2026-05-06

## Site

- **Statut** : Live sur Vercel
- **Repo** : github.com/HamzaSeidous/palm-dor-dakhla
- **Branche principale** : `main`
- **Déploiement** : automatique sur push `main`

## Pages livrées

| Page               | Statut  | Notes                              |
| ------------------ | ------- | ---------------------------------- |
| `/`                | Livré   | 7 sections, form Supabase          |
| `/hebergements`    | Livré   | 5 vrais appartements avec prix     |
| `/restaurant`      | Livré   | Contenu générique, menu manquant   |
| `/cafe`            | Livré   | Contenu générique                  |
| `/location-voiture`| Livré   | Contenu générique                  |
| `/galerie`         | Manquant| Lien dans nav → 404                |
| `/contact`         | Manquant| Lien dans nav → 404                |
| `/en/*`            | Manquant| Liens langue → 404                 |

## Composants livrés

- `Navbar` — fixe, scroll-shadow, menu mobile, WA CTA
- `Footer` — 3 colonnes, WA button
- `Hero` — plein écran, overlay, dual CTA
- `ExperienceSection` — 3 cartes services
- `AccommodationSection` — 3 types appartements, prix, amenities
- `TestimonialsSection` — 3 avis Google (4.2★)
- `GallerySection` — masonry grid (images placeholder)
- `LeadForm` — form Supabase avec tracking
- `FinalCTA` — section bas de page
- `ServicePage` — template réutilisable pour les 4 services
- `ServiceContactForm` — form Supabase par service
- `WhatsAppButton` — composant CTA universel avec tracking

## Intégrations

| Intégration   | Statut               | Variable `.env.local`              |
| ------------- | -------------------- | ---------------------------------- |
| Supabase      | Actif                | `NEXT_PUBLIC_SUPABASE_URL` ✓       |
| WhatsApp      | Actif                | `NEXT_PUBLIC_WHATSAPP_NUMBER` ✓    |
| Meta Pixel    | Code prêt, inactif   | `NEXT_PUBLIC_META_PIXEL_ID` vide   |
| GA4           | Code prêt, inactif   | `NEXT_PUBLIC_GA_ID` vide           |

## Images

Toutes les images sont des **placeholders Unsplash**. Aucune photo client intégrée.
Voir `docs/assets-needed.md` pour la liste complète.

## WhatsApp

- Numéro : `+212 661 931 317`
- Messages pré-remplis différents par service
- Tracking `trackWhatsApp()` sur chaque clic CTA

## Base de données

Table `leads` active avec RLS. Voir `docs/db-schema.md`.
