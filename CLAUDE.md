@AGENTS.md

# Palm d'Or Dakhla — Master Brief

## ⚠️ Session Start Protocol

Avant toute implémentation, lire dans l'ordre :

1. **`PROGRESS.md`** — source de vérité V2.3 : architecture complète, DB schema, roadmap, fichiers critiques
2. **`src/lib/apartments.ts`** — source unique des 6 appartements (IDs, étages, prix)
3. Le fichier `docs/` pertinent selon la tâche en cours

**Règle archive :** Ne jamais utiliser `docs/archive/` comme référence d'implémentation.
Les docs archivés décrivent l'état V1 et sont conservés à titre historique uniquement.

---

## Source of Truth Hierarchy

| Niveau | Source | Rôle |
|--------|--------|------|
| 1 — Absolu | `PROGRESS.md` | État V2.3 complet, architecture, DB, roadmap |
| 2 — Code | `src/lib/apartments.ts` | Données appartements (seule source valide) |
| 2 — Technique | `docs/architecture/db-schema.md` | Schéma DB (à mettre à jour — voir PROGRESS.md §7) |
| 2 — Contenu | `docs/content/services.md` | Offres, prix, descriptions (attention : source vérité = apartments.ts pour IDs) |
| 3 — Archive | `docs/archive/*` | Historique V1 — jamais utiliser pour implémenter |

---

## Qu'est-ce que c'est

Palm d'Or Dakhla est une résidence multi-services à Dakhla, Maroc.

Ce système est un **request-based booking management system** — pas un simple site vitrine.

Services :

- **Hébergement** — 6 appartements individuels répartis sur 3 étages (2e, 3e, 4e) · 500–750 DH/nuit
- **Restaurant** — cuisine locale et internationale
- **Café** — petit-déjeuner et boissons
- **Location de voitures** — véhicules à la journée ou semaine

## Objectif business

Convertir les visiteurs Google en réservations confirmées via un workflow structuré :

```text
Google → Site → Formulaire structuré → Supabase → Dashboard admin → Accept/Refuse → Email client
```

WhatsApp est une option secondaire post-soumission, pas le flux primaire.

## Stack technique

| Couche          | Technologie                        |
| --------------- | ---------------------------------- |
| Framework       | Next.js 16.2.3 App Router          |
| Langage         | TypeScript (strict)                |
| Style           | Tailwind CSS 4                     |
| Base de données | Supabase (PostgreSQL + RLS)        |
| Email           | Resend (domaine palmdordakhla.com) |
| Déploiement     | Vercel                             |
| Tracking        | Meta Pixel + GA4 (structure prête) |

## Design system

- **Couleurs** : `palm-cream` / `palm-blue` / `palm-gold` (définis dans `globals.css`)
- **Typo display** : Cormorant Garamond (italic, light)
- **Typo body** : Geist Sans
- **Ton** : premium, minimal, hospitalité de qualité
- **Interdit** : le mot "hôtel" — utiliser "appartements", "résidence", "hébergement"

## Structure routes

```text
/                         Homepage (7 sections)
/hebergements             6 appartements individuels, groupés par étage (2e/3e/4e)
/restaurant               Page service
/cafe                     Page service
/location-voiture         Page service
/galerie                  10 photos client
/contact                  Adresse + Maps + formulaire
/admin                    Dashboard admin sécurisé (cookie HttpOnly)
/admin/login              Login dashboard
/api/lead                 POST — soumission formulaire public
/api/admin/leads/[id]     PATCH — modifications dashboard admin
/api/admin/export         GET — export CSV 15 colonnes
/api/admin/auth           POST — authentification dashboard
```

## Fichiers de référence actifs

**Source absolue** :
- État complet V2.3 : `PROGRESS.md`
- Appartements (IDs, prix, étages, messages WA) : `src/lib/apartments.ts`

**Architecture** :
- Schéma DB : `docs/architecture/db-schema.md` *(attention : à jour jusqu'à migration 001 — voir PROGRESS.md §7 pour l'état complet)*
- Parcours utilisateur : `docs/architecture/user-flows.md` *(V1 — voir PROGRESS.md §3 pour V2.3)*

**Opérations** :
- Variables ENV : `docs/operations/VERCEL_ENV_AUDIT.md` *(voir PROGRESS.md §9 pour liste complète)*
- Admin : `docs/operations/ADMIN-WORKFLOW.md`
- Setup local : `docs/operations/SETUP.md`

**Contenu** :
- Offres et prix : `docs/content/services.md`
- Actifs manquants : `docs/content/assets-needed.md`

**Archivés — ne plus référencer** :
- `docs/archive/PROJECT_RESTART_AUDIT.md`
- `docs/archive/PROJECT_ALIGNMENT_REPORT.md`
- `docs/archive/POST_LAUNCH_ROADMAP.md`
- `docs/archive/roadmap.md`
- `docs/archive/current-state.md`

## Règles absolues

1. Lire `PROGRESS.md` en début de toute session
2. Utiliser `src/lib/apartments.ts` comme seule source appartements — jamais hardcoder les IDs
3. Ne jamais utiliser `docs/archive/` pour des décisions d'implémentation
4. Ne jamais créer un second fichier source-of-truth parallèle
5. Ne jamais inventer des prix, menus ou descriptions — lire `docs/content/services.md`
6. Exécuter `npm run build` et corriger avant de livrer
7. Ne pas refactor ce qui fonctionne
8. Ne pas modifier le schéma Supabase sans migration SQL numérotée
9. Mettre à jour `PROGRESS.md` après tout changement d'architecture majeur
10. Voir `AGENTS.md` pour les règles de travail complètes
