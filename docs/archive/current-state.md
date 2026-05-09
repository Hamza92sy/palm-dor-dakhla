# État actuel du projet

Dernière mise à jour : 2026-05-06

## Site

- **Statut** : Live sur Vercel
- **Repo** : github.com/HamzaSeidous/palm-dor-dakhla
- **Branche principale** : `main`
- **Déploiement** : automatique sur push `main`
- **Domaine** : non encore connecté — URL Vercel active

## Pages livrées

| Page                | Statut       | Notes                                                |
| ------------------- | ------------ | ---------------------------------------------------- |
| `/`                 | ✅ Livré      | 7 sections, form Supabase, photos client intégrées   |
| `/hebergements`     | ✅ Livré      | 3 types × prix réels, cross-links services           |
| `/restaurant`       | ✅ Livré      | Menu HTML 5 plats, CTA WhatsApp, images Unsplash     |
| `/cafe`             | ✅ Livré      | Photos client réelles (de 136, de 130)               |
| `/location-voiture` | ✅ Livré      | Fond design system, notice "photos prochainement"    |
| `/galerie`          | ✅ Livré      | 4 photos client, structure prête pour extension      |
| `/contact`          | ✅ Livré      | Adresse + Google Maps embed + LeadForm               |
| `/en`               | ✅ Redirect   | Redirige vers `/`                                    |
| `/fr`               | ✅ Redirect   | Redirige vers `/`                                    |
| `/sitemap.xml`      | ✅ Auto       | 7 pages, priorités correctes                         |
| `/robots.txt`       | ✅ Auto       | `allow: /`, sitemap lié                              |
| `/api/lead`         | ✅ Actif      | POST → Supabase, whatsapp fallback si numéro manquant|

## Composants livrés

- `Navbar` — fixe, scroll-shadow, menu mobile, WA CTA
- `Footer` — 3 colonnes, WA button
- `Hero` — plein écran, overlay, dual CTA, photo `de (175).jpg`
- `ExperienceSection` — 3 cartes services (1 Unsplash restaurant restante)
- `AccommodationSection` — 3 types appartements, prix, amenities, photos client
- `TestimonialsSection` — 3 vrais avis Google (5★, 180+ avis)
- `GallerySection` — grille masonry, 4 photos client
- `SignatureSection` — photo client `de (171).jpg`
- `LeadForm` — form Supabase avec tracking
- `FinalCTA` — section bas de page
- `ServicePage` — template réutilisable, cross-links inter-services intégrés
- `ServiceContactForm` — form Supabase par service
- `MenuSection` — menu HTML 5 plats + CTA WhatsApp "Demander le menu complet"
- `WhatsAppButton` — composant CTA universel avec tracking

## Intégrations

| Intégration   | Statut               | Variable `.env.local`                 |
| ------------- | -------------------- | ------------------------------------- |
| Supabase      | ✅ Actif              | `NEXT_PUBLIC_SUPABASE_URL` ✓          |
| WhatsApp      | ✅ Actif              | `NEXT_PUBLIC_WHATSAPP_NUMBER` ✓       |
| Meta Pixel    | ⏸ Code prêt, inactif | `NEXT_PUBLIC_META_PIXEL_ID` à remplir |
| GA4           | ⏸ Code prêt, inactif | `NEXT_PUBLIC_GA_ID` à remplir         |

## Images

| Fichier                           | Statut     | Usage actuel                                       |
| --------------------------------- | ---------- | -------------------------------------------------- |
| `de (175).jpg` — salon principal  | ✅ Intégré  | Hero homepage, Hero hébergements, Accom Standard   |
| `de (171).jpg` — salon angle 2    | ✅ Intégré  | SignatureSection                                   |
| `de (136).jpg` — petit-déjeuner   | ✅ Intégré  | Café hero, ExperienceSection café, galerie         |
| `de (130).jpg` — petit-déjeuner 2 | ✅ Intégré  | Café image secondaire                              |
| `de (199).jpg` — chambre 2 lits   | ✅ Intégré  | AccomSection 2 chambres, galerie                   |
| `de (218).jpg` — chambre 3 lits   | ✅ Intégré  | AccomSection grande capacité, galerie              |

**Unsplash restants (3 occurrences — à remplacer dès réception des vraies photos) :**
- `ExperienceSection.tsx` — carte Restaurant : `photo-1414235077428`
- `restaurant/page.tsx` — hero : `photo-1414235077428`
- `restaurant/page.tsx` — image secondaire : `photo-1533089860892`

## SEO

- Titles et meta descriptions optimisés sur toutes les pages
- Canonical correct sur toutes les pages
- OpenGraph + Twitter Card sur toutes les pages
- Schema.org `@type: ['LodgingBusiness', 'FoodEstablishment']` avec geo, address, sameAs, priceRange, image
- `sitemap.xml` + `robots.txt` générés automatiquement
- Cross-links inter-services sur toutes les pages
- Keywords cibles : `appartement dakhla`, `hébergement dakhla`, `restaurant dakhla`, `café dakhla`, `location voiture dakhla`

## Performance

- `next/image` avec `fill` + `sizes` sur tous les composants
- `priority` sur les heroes (homepage, hebergements, service pages)
- AVIF/WebP prioritaires dans `next.config.ts`
- `minimumCacheTTL: 31536000` (1 an)
- Public directory : **7.4MB** (nettoyé de 95MB — PDF 85MB + images inutilisées supprimés)

## WhatsApp

- Numéro : `+212 661 931 317` (dans `.env.local`)
- Messages pré-remplis différents par service
- Tracking `trackWhatsApp()` sur chaque clic CTA
- Menu restaurant → CTA WhatsApp "Demander le menu complet"

## Base de données

- Table `leads` active avec RLS — voir `docs/db-schema.md`
- Table `reservations` : non créée — roadmap V2

## Google Business

- Fiche à compléter — voir `docs/google-business.md`
- Note affichée sur site : 5★ · 180+ avis (à confirmer avec le client)
