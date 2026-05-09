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

## Documentation Update Protocol

Après toute modification significative, vérifier si la documentation doit être mise à jour **avant de clore la session**.

### Quand mettre à jour PROGRESS.md

Mettre à jour si le changement concerne :

- Nouvelle fonctionnalité ou page
- Changement de workflow (réservation, dashboard, email)
- Changement de schéma Supabase
- Changement de variable d'environnement
- Changement d'intégration (Resend, Supabase, Vercel)
- Changement de données appartements
- Changement d'UX réservation
- Changement de roadmap ou identification d'une limitation

### Quand NE PAS mettre à jour

Ne pas modifier la doc pour :

- Micro-copy (faute de frappe, tournure)
- Styling mineur (couleur, espacement cosmétique)
- Warnings linter sans impact fonctionnel
- Changements purement cosmétiques sans effet sur le comportement

### Docs à vérifier selon le type de changement

- **Toujours** → `PROGRESS.md`
- **Schéma DB change** → `docs/architecture/db-schema.md`
- **User journey change** → `docs/architecture/user-flows.md`
- **Dashboard / workflow admin change** → `docs/operations/ADMIN-WORKFLOW.md`
- **Env vars / déploiement change** → `docs/operations/VERCEL_ENV_AUDIT.md`
- **Données appartements / services change** → `docs/content/services.md`
- **Architecture change** → `CLAUDE.md`
- **Rôles agents change** → `AGENTS.md` + `.claude/agents/`

### Format de réponse obligatoire après chaque session

```text
## Session summary

1. Code changes      : [fichiers modifiés]
2. Doc changes       : [docs mises à jour]
3. Docs not updated  : [docs skippées + raison]
4. Build result      : [OK / erreurs]
5. Next step         : [recommandation]
```

---

## Agent Selection Protocol

Règle absolue : avant toute modification de fichier, déclarer explicitement :

```text
Agent principal   : [nom-agent]
Agents secondaires: [si cross-domain]
Rules à lire      : [rule1.md, rule2.md]
Playbook          : [playbook.md]
Fichiers probables: [chemin/fichier.ts, ...]
Risques identifiés: [...]
Plan              : [étapes avant de coder]
```

Ne jamais modifier un fichier sans avoir affiché cette déclaration.

### Mapping tâche → agent

- **UI / composants / formulaires** → `frontend-agent` — rules: `frontend.md` + `architecture.md` — playbook: `new-feature.md` ou `ui-polish.md`
- **Design / galerie / mobile / premium look** → `design-agent` — rules: `frontend.md` — playbook: `ui-polish.md`
- **API / Supabase / Resend / validation** → `backend-agent` — rules: `database.md` + `deployment.md` — playbook: `bugfix.md` ou `new-feature.md`
- **Dashboard `/admin` / accept-refuse / CSV** → `dashboard-agent` — rules: `dashboard.md` — playbook: `dashboard-change.md`
- **Copywriting / FR-EN / CTA / descriptions** → `content-agent` — rules: `frontend.md` — playbook: `new-feature.md`
- **SEO / metadata / sitemap / structured data** → `seo-agent` — rules: `architecture.md` — playbook: `new-feature.md`
- **PROGRESS.md / docs / archive / CLAUDE.md** → `documentation-agent` — rules: `documentation.md` — playbook: `documentation-update.md`
- **Déploiement / Vercel / env vars** → `backend-agent` — rules: `deployment.md` — playbook: `deployment-checklist.md`
- **Bug tous domaines** → agent du domaine concerné — playbook: `bugfix.md`

### Exemples de routing

#### "améliore la page hébergements"

```text
Agent principal   : design-agent
Rules             : frontend.md + architecture.md
Playbook          : ui-polish.md
Fichiers probables: src/app/hebergements/page.tsx, src/lib/apartments.ts
Risques           : ne pas casser le flux réservation
Plan              : identifier les éléments à polir → mobile first → build
```

#### "corrige l'email d'acceptation"

```text
Agent principal   : backend-agent
Rules             : database.md + deployment.md
Playbook          : bugfix.md
Fichiers probables: src/lib/email.ts, src/app/api/admin/leads/[id]/route.ts
Risques           : email non envoyé en prod, template cassé
Plan              : reproduire → root cause → fix minimal → build → tester envoi
```

#### "ajoute une section avis clients"

```text
Agent principal   : frontend-agent
Agents secondaires: design-agent (polish), content-agent (textes)
Rules             : frontend.md + architecture.md
Playbook          : new-feature.md
Fichiers probables: src/app/page.tsx, src/components/
Risques           : impact performance (images), cohérence visuelle
Plan              : lire PROGRESS.md → identifier zone homepage → implémenter → build
```

---

## Source of Truth Hierarchy

| Niveau | Source | Rôle |
| -------- | -------- | ------ |
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
