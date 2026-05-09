---
rule: architecture
version: 1.0
project: palm-dor-dakhla
---

# Architecture Rules

## Source-of-Truth Hierarchy

Toujours consulter dans cet ordre avant de prendre une décision :

1. **`PROGRESS.md`** — état actuel du projet, décisions récentes
2. **`CLAUDE.md`** — règles d'architecture, contraintes techniques
3. **Code source** (`src/`) — implémentation réelle
4. **`docs/`** — documentation de référence
5. **`supabase/migrations/`** — vérité schema base de données

En cas de contradiction entre deux sources, la source plus haute dans la hiérarchie prévaut. Signaler la contradiction à documentation-agent.

## No Duplicate Systems

- Un seul système pour chaque responsabilité
- Données appartements : `src/lib/apartments.ts` uniquement (pas de doublon en base)
- Emails : Resend uniquement (pas de fallback SMTP parallèle)
- Auth admin : un seul système (pas de double couche auth)
- Routing : Next.js App Router uniquement (pas de routing custom parallèle)

Si un doublon existe, le consolider avant d'ajouter de la complexité.

## Prefer Extension Over Rewrite

- Avant de réécrire un composant, vérifier s'il peut être étendu
- Avant de créer une nouvelle route API, vérifier si une existante peut être adaptée
- Avant de créer un nouveau fichier, vérifier si un existant peut absorber la logique
- Les réécritures complètes nécessitent une justification explicite dans `PROGRESS.md`

## Avoid Parallel Architectures

- Ne pas introduire de système de state management (Zustand, Redux) si React state suffit
- Ne pas créer de couche d'abstraction si l'accès direct est lisible
- Ne pas créer de "service layer" pour 3 fonctions qui s'appellent une fois
- Next.js Server Components par défaut, Client Components uniquement si interactivité nécessaire

## Scope Discipline

Chaque intervention doit avoir un scope clair :
- Une fonctionnalité à la fois
- Un agent à la fois
- Pas d'effets de bord non documentés

Si une tâche touche plusieurs domaines (frontend + backend), décomposer en étapes séquentielles.
