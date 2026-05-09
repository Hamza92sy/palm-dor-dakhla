# POST_LAUNCH_ROADMAP — Palm d'Or Dakhla

*Créé le 2026-05-07 — Site live en production*

---

## Contexte

Le site est **live et opérationnel** sur Vercel. Domaine actif, SSL actif, DNS actif.
Build propre, 0 Unsplash, SEO complet, funnel WhatsApp intégré.

Ce document remplace les sections "À faire" des anciens docs de session.

---

## Priorité 1 — Immédiat (bloquant fonctionnel)

| # | Action | Pourquoi | Effort |
|---|--------|---------|--------|
| 1 | Vérifier variables ENV sur Vercel Dashboard | Sans WHATSAPP_NUMBER + SUPABASE_*, leads et CTAs ne fonctionnent pas en prod | 5 min |
| 2 | Tester `/api/lead` en production | Valider que Supabase reçoit les leads | 2 min |
| 3 | Cliquer CTA WhatsApp sur mobile (prod) | Valider le message pré-rempli s'affiche | 2 min |

**Variables à vérifier sur Vercel → Settings → Environment Variables :**
```
NEXT_PUBLIC_WHATSAPP_NUMBER=212661931317
NEXT_PUBLIC_SUPABASE_URL=https://mkpiriemezuzqkcupdqs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (marquer Sensitive)
```

---

## Priorité 2 — Avant campagnes (tracking)

| # | Action | Pourquoi | Effort |
|---|--------|---------|--------|
| 4 | Créer Meta Pixel → ajouter ID sur Vercel | Zéro données conversions sans ça | 15 min |
| 5 | Créer propriété GA4 → ajouter ID sur Vercel | Zéro analytics trafic | 15 min |
| 6 | Soumettre à Google Search Console | Accélère l'indexation | 10 min |
| 7 | Vérifier indexation toutes les pages | Valider que Googlebot crawle | 5 min |

**Variables à ajouter après création :**
```
NEXT_PUBLIC_META_PIXEL_ID=<ID fourni par Meta>
NEXT_PUBLIC_GA_ID=<ID fourni par Google>
```

---

## Priorité 3 — SEO local (Google Business)

| # | Action | Détail |
|---|--------|--------|
| 8 | Compléter fiche Google Business | Minimum : catégories, horaires, adresse exacte |
| 9 | Ajouter 7+ photos sur Google Business | Façade, restaurant, café, appartements |
| 10 | Ajouter lien site sur Google Business | `https://palmdordakhla.com` |
| 11 | Confirmer note Google 5★ · 180+ avec client | Hardcodée dans `src/lib/google-reviews.ts` — vérifier avant campagnes |

---

## Priorité 4 — Contenu client à fournir (V1.3)

| # | Contenu | Impact | Page concernée |
|---|---------|--------|----------------|
| 12 | Photo façade/extérieur résidence | Hero homepage + Google Business | `/` et Google Business |
| 13 | Photos véhicules (1-2 minimum) | Hero `/location-voiture` vide actuellement | `/location-voiture` |
| 14 | PDF menu optimisé < 2MB | Remplace CTA WhatsApp "Demander le menu" | `/restaurant` |

**Procédure intégration photos :**
1. Déposer dans `public/assets/photos-client/`
2. Nommer clairement : `facade.jpg`, `vehicule-1.jpg`, etc.
3. Remplacer les `src` dans les composants concernés
4. `npm run build` — vérifier 0 erreur
5. Commit + push → redéploiement automatique Vercel

---

## V2 — Gestion réservations (3–6 mois)

Objectif : remplacer Excel manuel par dashboard Supabase simple.

**Table `reservations` à créer (voir `docs/db-schema.md` pour détails) :**
- `apartment_type` — standard | 2-chambres | grande-capacite
- `status` — pending | confirmed | cancelled | completed
- `check_in` / `check_out` — dates
- `guest_name` / `guest_phone` — coordonnées
- `source` — whatsapp | form | direct

**Fonctionnalités :**
- [ ] Dashboard admin lecture Supabase (leads + réservations)
- [ ] Filtres par appartement / statut / date
- [ ] Export CSV réservations
- [ ] Notification email/WhatsApp sur nouveau lead

---

## V3 — Automatisation (6–12 mois)

- [ ] Message WhatsApp automatique de confirmation client
- [ ] Intégration Meta Ads (pixel conversions optimisées)
- [ ] Campagnes Google Ads locales (mots-clés Dakhla)
- [ ] Retargeting visiteurs

---

## V4 — Évolutions produit (12+ mois)

- [ ] Calendrier disponibilité temps réel
- [ ] Paiement arrhes en ligne (Stripe)
- [ ] Version anglaise `/en/*` (touristes internationaux)
- [ ] Application mobile si volume justifie

---

## Ce qu'il ne faut plus toucher

| Élément | Raison |
|---------|--------|
| Design / UI | Stable, premium, mobile-first. Zéro bénéfice à modifier. |
| SEO / schema.org | Complet et correct. Toute modification risque une régression. |
| Système images | 0 Unsplash, 10 galerie équilibrée. Ne pas réordonner GALLERY_IMAGES sans raison. |
| Messages WhatsApp | Calibrés par service, en production. |
| `ServicePage.tsx` | Template universel stable. |
| `src/lib/config.ts` | SITE_URL dans canonical, schema.org, sitemap. |

---

*Prochaine révision : après activation tracking (Priorité 2)*
