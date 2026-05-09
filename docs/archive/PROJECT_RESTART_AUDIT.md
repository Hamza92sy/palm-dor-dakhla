# PROJECT RESTART AUDIT — Palm d'Or Dakhla
*Exécuté le 2026-05-07 — Build ✓ OK — Git ✓ Clean*

---

## 1. État actuel du projet

### Production-ready ✅

| Élément | Détail |
|---------|--------|
| Build | `next build` : 15/15 pages, 0 erreur TypeScript, 0 warning |
| Git | Propre — tous les changements commités (dernier commit : feat: organize categorized client photos) |
| Routes | 11 routes actives : `/`, `/hebergements`, `/restaurant`, `/cafe`, `/location-voiture`, `/galerie`, `/contact`, `/en`, `/fr`, `/robots.txt`, `/sitemap.xml` + `/api/lead` |
| SEO | Titles, meta descriptions, canonical, OpenGraph, Twitter Card sur toutes les pages |
| Schema.org | `['LodgingBusiness', 'FoodEstablishment']` avec geo, adresse, priceRange, image, sameAs |
| Sitemap + robots | Auto-générés, 7 pages prioritaires, `allow: /` |
| WhatsApp funnel | Messages pré-remplis différents par service, tracking prêt |
| Supabase leads | Table active avec RLS, `/api/lead` POST fonctionnel |
| Images | 0 Unsplash restant — 100% photos client réelles |
| Performance | public/ = ~7.5MB, AVIF/WebP activés, cache 1 an, `next/image` partout |
| Cross-links | Bandeau "Découvrez aussi" sur toutes les pages services |

### Temporaire / à compléter ⚠️

| Élément | Statut | Action requise |
|---------|--------|---------------|
| Meta Pixel ID | Non configuré (`NEXT_PUBLIC_META_PIXEL_ID` absent) | Ajouter ID dans Vercel + `.env.local` |
| GA4 ID | Non configuré (`NEXT_PUBLIC_GA_ID` absent) | Ajouter ID dans Vercel + `.env.local` |
| Domaine | `palmdordakhla.com` non connecté à Vercel | Config DNS chez registrar |
| Google Business | Non complétée | Minimum 7 photos, catégories, horaires, lien site |
| Note Google 5★ · 180+ | Hardcodée dans `src/lib/google-reviews.ts` — non vérifiée | Confirmer avec client |
| PDF menu | Supprimé (85MB). CTA WhatsApp en place | Fournir PDF optimisé < 2MB |
| Café — image `cafe-ambiance.jpg` | Copiée mais non utilisée dans le code | Évaluer si intégrer ou supprimer |

### Absent (non bloquant pour le live)

- Table `reservations` Supabase non créée (V2)
- Dashboard admin non créé (V2)
- Version anglaise `/en/*` (V4)

---

## 2. Architecture actuelle

### Structure globale

```
src/
  app/
    layout.tsx          ← schema.org global, OG fallback, tracking Meta Pixel + GA4
    page.tsx            ← homepage (7 sections)
    hebergements/       ← 3 configurations, prix réels, AccomSection
    restaurant/         ← hero + galerie 4 plats + MenuSection
    cafe/               ← hero cafe-salle.jpg + 2 galerie
    location-voiture/   ← fond design system (pas de photo véhicule encore)
    galerie/            ← 10 photos client (GALLERY_IMAGES de gallery.ts)
    contact/            ← adresse + Google Maps embed + LeadForm
    en/ + fr/           ← redirects vers /
    api/lead/           ← POST Supabase
    robots.ts           ← auto
    sitemap.ts          ← auto, 7 pages
  components/
    home/               ← Hero, AccommodationSection, ExperienceSection, GallerySection,
                           TestimonialsSection, SignatureSection, LeadForm, FinalCTA
    service/            ← ServicePage (template universel), ServiceContactForm
    restaurant/         ← MenuSection (5 plats hardcodés)
    ui/                 ← WhatsAppButton, SectionLabel
    layout/             ← Navbar, Footer
  lib/
    config.ts           ← constantes business (URL, adresse, coords, WhatsApp, Instagram)
    services.ts         ← ServiceType enum + messages WhatsApp par service
    gallery.ts          ← GALLERY_IMAGES (10 entrées) partagé galerie + homepage
    google-reviews.ts   ← 3 avis hardcodés (5★ · 180+)
    tracking.ts         ← fonctions trackWhatsApp(), trackLead()
    supabase/           ← client.ts, server.ts, migrations/001_leads.sql
public/
  og-image.jpg          ← 1200×630, SEO social
  assets/photos-client/ ← 19 fichiers photos (voir inventaire ci-dessous)
```

### Composants critiques (ne pas modifier sans raison)

| Fichier | Rôle |
|---------|------|
| `src/lib/services.ts` | ServiceType + messages WhatsApp — source de vérité des CTAs |
| `src/lib/tracking.ts` | Events Meta Pixel + GA4 — structure prête pour activation |
| `src/app/api/lead/route.ts` | API Supabase — POST leads, fallback WhatsApp si numéro absent |
| `src/app/layout.tsx` | Schema.org, OG global, fonts, tracking scripts |
| `src/components/ui/WhatsAppButton.tsx` | CTA universel avec tracking |
| `src/components/service/ServicePage.tsx` | Template utilisé par restaurant, café, voiture, hébergements |
| `src/lib/gallery.ts` | GALLERY_IMAGES partagé entre /galerie et GallerySection homepage |

### Système images — inventaire complet

| Fichier | Taille | Utilisé dans | Statut |
|---------|--------|-------------|--------|
| `chambre-double.jpg` | 46K | Hero /hebergements, AccomSection Standard, Gallery[0] featured | ✅ Actif |
| `restaurant-palmdor.jpg` | 139K | Hero homepage | ✅ Actif |
| `restaurant-salle.jpg` | 116K | /restaurant hero, ExperienceSection, Gallery[5] | ✅ Actif |
| `restaurant-seafood.jpg` | 140K | /restaurant gallery[1] | ✅ Actif |
| `restaurant-seafood-gros-plan.jpg` | 146K | Gallery[1] homepage | ✅ Actif |
| `restaurant-burger.jpg` | 141K | /restaurant gallery[2], Gallery[6] | ✅ Actif |
| `restaurant-salade.jpg` | 135K | /restaurant gallery[3], Gallery[3] | ✅ Actif |
| `restaurant-table.jpg` | 78K | /restaurant gallery[4] | ✅ Actif |
| `cafe-salle.jpg` | 80K | /cafe hero, Gallery[2] | ✅ Actif |
| `cafe-crepes.jpg` | 137K | /cafe gallery[2], ExperienceSection café card | ✅ Actif |
| `cafe-terrasse.jpg` | 195K | Gallery[8] | ✅ Actif |
| `de (136).jpg` | 1.0M | /cafe gallery[1], Gallery[7] | ✅ Actif |
| `de (175).jpg` | 1.6M | ExperienceSection hébergement card, Gallery[4] | ✅ Actif |
| `de (171).jpg` | 1.5M | SignatureSection | ✅ Actif |
| `de (199).jpg` | 974K | AccomSection 2 chambres, Gallery[9] | ✅ Actif |
| `de (218).jpg` | 807K | AccomSection grande capacité | ✅ Actif |
| `cafe-ambiance.jpg` | 129K | — | ⚠️ Non utilisé |
| `de (130).jpg` | 1.4M | — | ⚠️ Non utilisé |
| `salon-sejour.jpg` | 1.7M | — | ⚠️ Réservé futur usage |

### SEO

- `layout.tsx` : metadata globale + schema.org `LodgingBusiness + FoodEstablishment`
- Chaque page service : metadata propre (title, description, canonical, OG, Twitter Card)
- `sitemap.ts` : 7 pages avec priorités correctes (/ = 1.0, services = 0.8, galerie/contact = 0.7)
- `robots.ts` : `allow: /`, sitemap lié, Googlebot max-image-preview: large
- Keywords cibles : `appartement dakhla`, `hébergement dakhla`, `restaurant dakhla`, `café dakhla`, `location voiture dakhla`

### Tracking

- Code Meta Pixel et GA4 prêt dans `layout.tsx` — conditionnel sur `process.env`
- `trackWhatsApp()` et `trackLead()` dans `src/lib/tracking.ts`
- **Inactifs** : IDs non configurés — seront actifs dès ajout des variables ENV

### Supabase

- Table `leads` : `id`, `name`, `phone`, `service`, `message`, `created_at`, `whatsapp_number`
- RLS activé — seul le service peut écrire
- Client-side et server-side clients configurés dans `src/lib/supabase/`
- Migration SQL dans `src/lib/supabase/migrations/001_leads.sql`

---

## 3. Décisions importantes déjà prises

| Décision | Pourquoi | Impact |
|----------|---------|--------|
| WhatsApp-first | Objectif business = conversion directe sans friction | Tous les CTAs pointent WhatsApp |
| 6 appartements → 3 configurations | Distinctions par étage sans valeur marketing | /hebergements simplifié, prix clairs |
| Suppression PDF menu 85MB | Inutilisable mobile, Ghostscript absent | CTA "Demander le menu" → WhatsApp |
| Suppression du faux positionnement lagune | Non mentionné par le client | Aucune référence à la lagune sur le site |
| Galerie équilibrée (hébergement + restaurant + café) | Mono-hébergement ne représente pas les 3 services | 10 photos mix, GALLERY_IMAGES partagé |
| 0 Unsplash en production | Crédibilité et authenticité | 100% photos client réelles |
| Schema.org dual type | Meilleurs signaux Google hébergement + restauration | Intégré dans layout.tsx |
| OG sur chaque page service | Héritaient du OG homepage avec titre incorrect | Partage social correct |
| Cross-links inter-services | Maillage interne nul → mauvais SEO | ServicePage template avec "Découvrez aussi" |
| `minimumCacheTTL: 31536000` + AVIF/WebP | Next.js ne cache images que 60s par défaut | Performance images optimale |
| public/ nettoyé → 7.4MB | PDF 85MB + images inutilisées supprimés | Déploiement rapide |

---

## 4. Points sensibles — ne pas casser

### Fichiers à modifier uniquement si nécessaire absolu

| Fichier | Risque si modifié |
|---------|------------------|
| `src/lib/services.ts` | Messages WhatsApp sur tous les CTAs du site |
| `src/lib/config.ts` | SITE_URL dans canonical, schema.org, sitemap — doit rester `https://palmdordakhla.com` |
| `src/app/layout.tsx` | Schema.org global, tracking, fonts — régression SEO garantie si mal modifié |
| `src/lib/gallery.ts` | Partagé entre homepage et /galerie — un changement affecte les deux |
| `src/components/service/ServicePage.tsx` | Template utilisé par 4 pages — changement = impact global |
| `src/app/api/lead/route.ts` | Point d'entrée leads Supabase — ne pas modifier sans tester |

### Sections déjà optimisées — ne pas retoucher

- Design system (globals.css) : couleurs palm-cream / palm-blue / palm-gold stables
- `next.config.ts` : AVIF/WebP + minimumCacheTTL déjà optimisés
- Responsive / mobile-first : tout validé
- Fonnel WhatsApp : messages pré-remplis corrects par service
- SEO metadata : toutes les pages ont des titles et descriptions optimisés

### Zones à modifier avec prudence

- `AccommodationSection.tsx` : données hardcodées (prix, configs appartements) — croiser avec `docs/services.md` avant tout changement
- `TestimonialsSection.tsx` : avis hardcodés — confirmer avec client avant de modifier la note 5★ · 180+
- `MenuSection.tsx` : 5 plats hardcodés — attendre validation menu complet du client

---

## 5. Priorités restantes

### Critique (bloquant pour le go-live)

| # | Action | Fichier concerné |
|---|--------|-----------------|
| 1 | Vérifier variables ENV sur Vercel Dashboard | Vercel → Settings → Environment Variables |
| 2 | Connecter domaine `palmdordakhla.com` | Vercel → Domains + DNS registrar |

### Importante (à faire dès que possible)

| # | Action | Notes |
|---|--------|-------|
| 3 | Activer Meta Pixel | Ajouter `NEXT_PUBLIC_META_PIXEL_ID` dans Vercel + `.env.local` |
| 4 | Activer GA4 | Ajouter `NEXT_PUBLIC_GA_ID` dans Vercel + `.env.local` |
| 5 | Confirmer note Google 5★ · 180+ avec client | `src/lib/google-reviews.ts` |
| 6 | Compléter Google Business | Min. : catégories, horaires, 7 photos, lien site |

### Secondaire (V1.2 — pas bloquant)

| # | Action | Notes |
|---|--------|-------|
| 7 | Photos véhicules | Débloque hero `/location-voiture` (fond design system actuel) |
| 8 | Photo façade extérieure | SEO local + Google Business |
| 9 | PDF menu optimisé < 2MB | Voir `docs/image-plan.md` pour procédure de restauration |
| 10 | Nettoyage fichiers non utilisés | `cafe-ambiance.jpg`, `de (130).jpg` — peuvent rester ou être retirés |
| 11 | Core Web Vitals | Pré-convertir les `de (*.jpg)` (800KB-1.6MB) en WebP |

---

## 6. Recommandation stratégique

### Ce qu'il faut faire maintenant

1. **Vérifier Vercel ENV** — sans `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` et `NEXT_PUBLIC_WHATSAPP_NUMBER` sur Vercel, le site est en production mais ni WhatsApp ni Supabase ne fonctionnent. Priorité absolue.
2. **Connecter le domaine** — le site est live sur URL Vercel mais pas encore sur `palmdordakhla.com`.
3. **Activer le tracking** — sans Meta Pixel / GA4, aucun retour sur le trafic. Indispensable avant toute campagne publicitaire.

### Ce qu'il ne faut plus toucher

- Design / UI : stable, premium, mobile-first. Zéro bénéfice à modifier.
- SEO / schema.org : complet et correct. Toute modification risque une régression.
- Système images : 0 Unsplash, 10 galerie équilibrée, galerie homepage slice(0,5). Ne pas réordonner GALLERY_IMAGES sans raison.
- Messages WhatsApp : calibrés par service, en production.
- `ServicePage.tsx` : template universel, rétrocompatible, stable.

---

## Résumé exécutif

**État** : Projet stable, production-ready sur Vercel, 0 dette technique bloquante.

**Qualité** : Haute — design premium mobile-first, SEO complet, 100% photos client, 0 Unsplash, build propre, TypeScript strict.

**Risques restants** :
- 🔴 Variables ENV Vercel non vérifiées (WhatsApp + Supabase potentiellement inactifs en prod)
- 🔴 Domaine non connecté (site live sur URL Vercel uniquement)
- 🟠 Tracking inactif (Meta Pixel + GA4) — impact sur acquisition payante future
- 🟡 Note Google 5★ non confirmée par client

**Prochaines étapes** : Vercel ENV → domaine → tracking → Google Business. Tout le reste est du contenu ou de l'optimisation secondaire.
