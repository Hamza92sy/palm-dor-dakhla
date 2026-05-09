# PROJECT STATE — Palm d'Or Dakhla

**Date** : 2026-05-07  
**Commit production** : `3b1d302`  
**Déploiement** : `dpl_DqeSixDBmQF6gzKFVB2SNquEwTMo` — READY  
**Domaine** : `https://palmdordakhla.com` (live, SSL actif)  
**Phase** : DISTRIBUTION + CROISSANCE — le développement majeur est terminé.

---

## Statut global

```
PRODUCTION STABLE
Développement : TERMINÉ (V1 + V1.1 + V1.2 code)
Priorité actuelle : visibilité Google + avis + contenu client
Prochaine session code : si données GA4 indiquent un problème conversion
```

---

## Ce qui est en production

### Pages

| Page | Route | Statut | Notes |
|------|-------|--------|-------|
| Homepage | `/` | ✅ Complet | 7 sections, photos client, avis réels, FAQ N/A |
| Hébergements | `/hebergements` | ✅ Complet | 6 apparts, 3 configs, prix réels, FAQ 6 items |
| Restaurant | `/restaurant` | ✅ Complet | 5 photos client, menu HTML, FAQ 5 items |
| Café | `/cafe` | ✅ Complet | 3 photos client, FAQ 5 items |
| Location voiture | `/location-voiture` | ✅ Complet | Design ready, FAQ 5 items, photos pendantes |
| Galerie | `/galerie` | ✅ Complet | 10 photos client équilibrées |
| Contact | `/contact` | ✅ Complet | Maps embed, adresse, FAQ 5 items |
| Sitemap | `/sitemap.xml` | ✅ Auto | 7 pages, priorités correctes |
| Robots | `/robots.txt` | ✅ Auto | allow all, sitemap lié |
| API Leads | `/api/lead` | ✅ Actif | POST → Supabase, timeout 8s |

### Fonctionnalités

| Fonctionnalité | Statut | Variable ENV requise |
|---------------|--------|---------------------|
| WhatsApp CTA (tous services) | ✅ Actif | `NEXT_PUBLIC_WHATSAPP_NUMBER` ✓ |
| Supabase lead capture | ✅ Actif | `NEXT_PUBLIC_SUPABASE_URL` ✓ + clés ✓ |
| GA4 tracking | ⚠️ Code prêt, inactif | `NEXT_PUBLIC_GA_ID` à remplir sur Vercel |
| Meta Pixel | ⚠️ Code prêt, inactif | `NEXT_PUBLIC_META_PIXEL_ID` à remplir sur Vercel |
| Search Console | ✅ Vérifié | Token dans `layout.tsx` verification.google |
| Sitemap soumis | ✅ Soumis | À confirmer dans Search Console |

### SEO technique

| Élément | Statut |
|---------|--------|
| Titles uniques | ✅ Sur toutes les pages |
| Meta descriptions uniques | ✅ Sur toutes les pages |
| Canonicals | ✅ Relatifs, résolus via `metadataBase` |
| OpenGraph + Twitter Card | ✅ Sur toutes les pages |
| JSON-LD LocalBusiness | ✅ Layout (LodgingBusiness + FoodEstablishment) |
| JSON-LD LodgingBusiness | ✅ `/hebergements` |
| JSON-LD Restaurant | ✅ `/restaurant` |
| JSON-LD CafeOrCoffeeShop | ✅ `/cafe` |
| JSON-LD AutoRental | ✅ `/location-voiture` |
| FAQPage schema | ✅ Sur 5 pages |
| robots: index + follow | ✅ Global dans layout |
| metadataBase | ✅ `https://palmdordakhla.com` |
| Search Console vérifié | ✅ 2026-05-07 |

### Images

| Fichier | Usage | Statut |
|---------|-------|--------|
| `chambre-double.jpg` | Hero /hebergements | ✅ |
| `de (175).jpg` | Hero homepage, accom Standard | ✅ |
| `de (171).jpg` | SignatureSection | ✅ |
| `de (136).jpg` | Café hero, galerie | ✅ |
| `de (130).jpg` | Café secondaire | ✅ |
| `de (199).jpg` | Accom 2 chambres, galerie | ✅ |
| `de (218).jpg` | Accom grande capacité, galerie | ✅ |
| `cafe-salle.jpg` | Café galerie | ✅ |
| `cafe-crepes.jpg` | Café galerie | ✅ |
| `restaurant-salle.jpg` | Restaurant hero | ✅ |
| `restaurant-seafood.jpg` | Restaurant galerie | ✅ |
| `restaurant-burger.jpg` | Restaurant galerie | ✅ |
| `restaurant-salade.jpg` | Restaurant galerie | ✅ |
| `restaurant-table.jpg` | Restaurant galerie | ✅ |
| **Véhicules** | Hero /location-voiture | ❌ Manquant — fond design system |
| **Façade extérieure** | Homepage + Google Business | ❌ Manquant — priorité haute |

**0 image Unsplash en production.** 100% photos client.

---

## Zones à ne pas toucher

Ces éléments sont stables en production. Aucune modification sans raison critique.

| Fichier / Zone | Raison |
|---------------|--------|
| `src/lib/config.ts` | SITE_URL dans canonical, schema.org, sitemap |
| `src/lib/services.ts` | Types ServiceType + messages WhatsApp calibrés |
| `src/lib/tracking.ts` | Événements GA4 + Meta Pixel — déjà optimisés |
| `src/lib/schemas.ts` | JSON-LD complet, vérifié, 0 données inventées |
| `src/components/service/ServicePage.tsx` | Template universel stable sur 4 pages |
| `src/app/layout.tsx` | Tracking global, fonts, metadata base — critique |
| `src/components/ui/WhatsAppButton.tsx` | CTA universel avec tracking |
| Design system (couleurs, typos) | Premium, mobile-first, calibré |
| Messages WhatsApp | Calibrés par service, pré-remplis en production |
| `src/lib/google-reviews.ts` | Avis hardcodés (5★ · 180+) — confirmer avec client |

---

## Ce qui reste à faire (non-code)

### Immédiat — Bloquant tracking

| Action | Où | Effort |
|--------|----|--------|
| Ajouter `NEXT_PUBLIC_GA_ID` | Vercel → Settings → ENV | 10 min |
| Ajouter `NEXT_PUBLIC_META_PIXEL_ID` | Vercel → Settings → ENV | 10 min |
| Vérifier leads arrivent dans Supabase | Table `leads` | 2 min |

### Semaine 1 — SEO et visibilité

| Action | Priorité |
|--------|---------|
| Vérifier indexation dans Search Console (6 pages) | ⭐⭐⭐⭐⭐ |
| Compléter fiche Google Business (catégories, horaires, photos) | ⭐⭐⭐⭐⭐ |
| Objectif 10 avis Google réels | ⭐⭐⭐⭐⭐ |
| Lier Search Console à GA4 | ⭐⭐⭐⭐ |
| Poster sur Instagram (@palm_dor_dakhla) | ⭐⭐⭐ |

### Contenu client à fournir

| Contenu | Impact | Page |
|---------|--------|------|
| Photo façade/extérieur résidence | Élevé — Google Business + homepage | `/` |
| Photos véhicules (1-2 min.) | Moyen — hero `/location-voiture` vide | `/location-voiture` |
| PDF menu restaurant < 2MB (optionnel) | Faible — CTA WhatsApp remplace | `/restaurant` |

**Procédure ajout photos :**
1. Déposer dans `public/assets/photos-client/`
2. Nommer clairement : `facade.jpg`, `vehicule-1.jpg`
3. Mettre à jour `src` dans le composant concerné
4. `npm run build` → 0 erreur
5. `git commit + git push` → Vercel déploie automatiquement

---

## Règle de décision pour les prochaines sessions code

Avant d'écrire la moindre ligne de code, répondre à ces 3 questions :

1. **GA4 confirme-t-il un problème de conversion ?** — Si oui, identifier la page/étape. Si non, pas de code.
2. **L'action est-elle dans les 3 zones autorisées ?** — Contenu client (photos), bug critique, ou V2 réservations.
3. **Le ROI > 4h de développement ?** — Sinon, prioriser distribution/avis/contenu.

```
Zone VERTE (agir) :
  - Intégrer photo client reçue
  - Corriger bug fonctionnel confirmé
  - Ajouter ENV var GA4/Pixel

Zone ORANGE (réfléchir) :
  - Modifier texte/copy d'une page
  - Ajuster un CTA
  - Changer une image

Zone ROUGE (ne pas faire sans raison solide) :
  - Refactoriser un composant stable
  - Modifier architecture SEO
  - Ajouter une nouvelle page
  - Changer design system
```

---

## Roadmap simplifiée

```
MAINTENANT       → Activer GA4 + Meta Pixel (ENV Vercel)
SEMAINE 1-2      → Search Console indexée, Google Business complète
SEMAINE 2-4      → 10 avis Google, Instagram actif, premiers signaux GA4
MOIS 2-3         → Analyser GA4, décider si optimisation nécessaire
MOIS 3-6         → V2 : dashboard réservations Supabase (si volume le justifie)
MOIS 6-12        → V3 : automatisation WhatsApp, campagnes Ads
```

---

## Incohérence à corriger (non bloquante)

`docs/services.md` liste 5 appartements (IDs 1-5), mais le site affiche 6 appartements (1 Standard + 3×2ch + 2 Grande). `docs/services.md` est **stale**. La source de vérité actuelle est `src/app/hebergements/page.tsx` (APARTMENT_TYPES) et `CLAUDE.md` ("6 appartements, 3 configs"). Mettre à jour `services.md` lors de la prochaine session de contenu.

---

*Ce document remplace `docs/current-state.md` comme référence principale d'état.*  
*Prochaine révision : après activation GA4 et premières données (≈ J+14).*
