# Session Handoff — Palm d'Or Dakhla

Créé le : 2026-05-06
Auteur : session Claude Code

> Ce fichier est le point de reprise pour la prochaine session de travail.
> Lire en priorité avant toute intervention sur le projet.

---

## État actuel du projet

### Ce qui est production-ready ✅

- Site complet : 9 routes actives, build propre, 0 erreur TypeScript
- SEO local : titles, meta, OpenGraph, schema.org `LodgingBusiness + FoodEstablishment`, cross-links inter-services
- Formulaires Supabase : leads actifs sur homepage et toutes les pages services
- WhatsApp : CTAs dynamiques par service avec tracking
- Performance : public/ = 7.4MB (nettoyé), AVIF/WebP activés, cache 1 an
- Avis Google : 3 vrais témoignages intégrés (5★ · 180+ avis — à confirmer)

### Ce qui est temporaire ⚠️

- **3 images Unsplash** restantes dans `ExperienceSection` (restaurant) et `restaurant/page.tsx` — en attente des vraies photos
- **Hero homepage** = `de (175).jpg` (salon intérieur) — idéalement remplacé par façade extérieure
- **AccomSection Standard** = `de (175).jpg` (salon) — idéalement chambre grand lit
- **CTA "Demander le menu complet"** → WhatsApp (PDF 85MB supprimé, en attente PDF optimisé < 2MB)
- **Note Google 5★ · 180+** hardcodée dans `src/lib/google-reviews.ts` — à confirmer avec le client

### Ce qui est absent (non bloquant pour le live)

- Meta Pixel ID et GA4 ID non configurés (tracking désactivé)
- Domaine `palmdordakhla.com` non connecté
- Google Business non complétée
- Table `reservations` Supabase non créée (V2)

---

## Décisions importantes prises cette session

| Décision | Pourquoi |
| --- | --- |
| 6 appartements → 3 configurations (Standard / 2 ch. / Grande capacité) | Le client a confirmé que les distinctions par étage n'ont pas de valeur marketing |
| Suppression des étages dans `/hebergements` | Inutile pour la conversion, source de confusion |
| Suppression du PDF menu 85MB | Inutilisable sur mobile, Ghostscript absent pour compression en CLI |
| CTA menu → WhatsApp | Meilleure conversion que PDF, cohérent avec stratégie WhatsApp-first |
| Schema.org `['LodgingBusiness', 'FoodEstablishment']` | Meilleurs signaux Google pour les recherches hébergement + restauration |
| OpenGraph sur toutes les pages services | Héritaient tous du OG homepage avec titre incorrect — corrigé |
| Bandeau "Découvrez aussi" dans ServicePage + hébergements | Zéro cross-links inter-services = mauvais maillage interne SEO |
| `minimumCacheTTL: 31536000` + formats AVIF/WebP | Next.js ne cache les images que 60s par défaut |

---

## Photos encore nécessaires

Par ordre de priorité :

1. **Façade / extérieur résidence** — critique pour Google Business et hero homepage
2. **Salle du restaurant** — débloque 3 Unsplash restants d'un coup
3. **Plat signature restaurant** — image secondaire `/restaurant`
4. **Chambre grand lit** — Appartement Standard (manque depuis le début)
5. **Véhicule(s)** — débloque hero `/location-voiture`
6. Ambiance café large — optionnel
7. Vue ensemble appartement 2 chambres — optionnel

**Procédure** : déposer dans `public/assets/photos-client/`, mettre à jour les `src` dans le code.
Voir `docs/image-plan.md` pour les emplacements exacts.

---

## TODO immédiat — Prochaine session

Ordre recommandé :

1. **Commiter les changements en cours** — git status montre des fichiers non commités (SEO, perf, docs)
   ```bash
   git add -A
   git commit -m "docs: update project state and create session handoff"
   git push
   ```

2. **Vérifier les variables Vercel** — s'assurer que `.env.local` est bien synchronisé dans le dashboard Vercel (Settings → Environment Variables). Sans ça, WhatsApp et Supabase ne fonctionnent pas en production.

3. **Connecter le domaine** — dans Vercel Dashboard → Domains → ajouter `palmdordakhla.com`, puis configurer DNS chez le registrar.

4. **Activer Meta Pixel** — ajouter `NEXT_PUBLIC_META_PIXEL_ID` dans Vercel et `.env.local`.

5. **Activer GA4** — ajouter `NEXT_PUBLIC_GA_ID` dans Vercel et `.env.local`.

6. **Intégrer photos restaurant** dès réception — remplacer les 3 Unsplash (2 fichiers : `ExperienceSection.tsx` et `restaurant/page.tsx`).

7. **Compléter Google Business** — minimum : catégories, horaires, 7 photos, lien site.

---

## Incohérence à clarifier avec le client

`docs/services.md` liste **5 appartements** (table IDs 1–5), mais le code affiche **6 appartements** avec :
- 1 Standard
- 3 × 2 chambres
- 2 × Grande capacité

Clarifier le compte exact avant toute mise à jour de `services.md`.

---

## Variables importantes

| Variable | Valeur | Localisation |
| --- | --- | --- |
| Domaine | `palmdordakhla.com` | `src/lib/config.ts` → `SITE_URL` |
| WhatsApp | `+212 661 931 317` | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Instagram | `@palm_dor_dakhla` | `src/lib/config.ts` → `INSTAGRAM_HANDLE` |
| Adresse | AV Al Walaa, Dakhla 73000 | `src/lib/config.ts` |
| Coordonnées | `23.7022636, -15.9284674` | `src/lib/config.ts` |
| Supabase URL | Dans `.env.local` | `NEXT_PUBLIC_SUPABASE_URL` |
| Supabase anon key | Dans `.env.local` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Meta Pixel ID | **Non configuré** | `NEXT_PUBLIC_META_PIXEL_ID` |
| GA4 ID | **Non configuré** | `NEXT_PUBLIC_GA_ID` |

---

## Risques restants

| Risque | Sévérité | Action |
| --- | --- | --- |
| Variables ENV absentes sur Vercel | 🔴 Bloquant prod | Vérifier Vercel Dashboard avant live |
| Domaine non connecté | 🔴 Bloquant live | Configurer DNS dès que nom de domaine est disponible |
| 3 images Unsplash restaurant | 🟠 UX dégradée | Réception photos client |
| Note Google 5★ hardcodée non confirmée | 🟠 Crédibilité | Confirmer avec client |
| PDF menu absent | 🟡 Fonctionnel | CTA WhatsApp en place, PDF à fournir < 2MB |
| Meta Pixel / GA4 inactifs | 🟡 Tracking absent | Activer avant campagnes publicitaires |
| Google Business vide | 🟡 SEO local | Compléter dès que domaine connecté |
| `services.md` : 5 vs 6 appartements | 🟡 Doc incohérente | Clarifier avec client |

---

## Commandes utiles

```bash
# Développement local
npm run dev

# Build de vérification (obligatoire avant push)
npm run build

# Git workflow standard
git add -A
git commit -m "type: description"
git push

# Vérifier ce qui est non commité
git status --short

# Voir les derniers commits
git log --oneline -10

# Déploiement
# Automatique sur push main → Vercel
```

---

## Structure fichiers clés

```
src/
  app/
    layout.tsx          ← schema.org, OG global, tracking
    page.tsx            ← homepage (7 sections)
    hebergements/       ← page appartements
    restaurant/         ← page restaurant
    cafe/               ← page café
    location-voiture/   ← page location
    galerie/            ← galerie photos
    contact/            ← contact + maps
  components/
    home/               ← sections homepage
    service/            ← ServicePage template + ServiceContactForm
    restaurant/         ← MenuSection
    ui/                 ← WhatsAppButton, SectionLabel
    layout/             ← Navbar, Footer
  lib/
    config.ts           ← constantes business (URL, adresse, coords)
    services.ts         ← ServiceType + messages WhatsApp
    gallery.ts          ← GALLERY_IMAGES (partagé galerie + homepage)
    google-reviews.ts   ← avis Google hardcodés
    tracking.ts         ← Meta Pixel + GA4 events
public/
  assets/photos-client/ ← 6 photos client (6000×3368px JPEG)
  og-image.jpg          ← image sociale (1200×630)
docs/                   ← documentation projet
```
