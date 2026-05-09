---
rule: documentation
version: 1.0
project: palm-dor-dakhla
---

# Documentation Rules

## Update Docs After Architecture Changes

Toute modification qui change l'architecture du projet déclenche une mise à jour documentation :

| Type de changement | Docs à mettre à jour |
|---|---|
| Nouveau composant majeur | `PROGRESS.md`, `CLAUDE.md` si architectural |
| Nouvelle route API | `PROGRESS.md`, `docs/api.md` si existant |
| Changement schema DB | `PROGRESS.md`, `docs/database.md` si existant |
| Nouvelle page | `PROGRESS.md` |
| Changement workflow réservation | `PROGRESS.md`, `CLAUDE.md` |
| Nouvel agent / règle | `AGENTS.md`, `.claude/agents/` |

## Archive Obsolete Docs

Ne jamais supprimer un document — l'archiver :

1. Déplacer dans `docs/archive/`
2. Ajouter en header : `[ARCHIVED YYYY-MM-DD — Raison de l'archivage]`
3. Référencer l'archive dans le document qui le remplace

Les archives préservent l'historique des décisions et permettent de retrouver du contexte.

## Never Create Conflicting Docs

Avant de créer un nouveau document :
1. Vérifier si un document existant couvre déjà le sujet
2. Si oui : mettre à jour l'existant, ne pas créer un doublon
3. Si le sujet est nouveau : créer dans `docs/` avec un nom explicite

Les documents qui se contredisent génèrent de la confusion et des erreurs de contexte pour Claude Code.

## PROGRESS.md Always Updated

`PROGRESS.md` est mis à jour après **chaque intervention significative** :

Format attendu :
```markdown
## [YYYY-MM-DD] — Description courte

**Fait :**
- Point 1
- Point 2

**État actuel :**
- Système X : fonctionnel
- Système Y : en attente

**Prochaines étapes :**
- Action 1
- Action 2
```

Une mise à jour PROGRESS.md ne doit pas dépasser 20 lignes. Si plus, résumer.

## Single Source of Truth

Pour chaque information, une seule source fait référence :
- Prix → `apartments.ts`
- État réservations → Supabase
- Décisions architecture → `CLAUDE.md`
- État projet → `PROGRESS.md`
- Rôles agents → `AGENTS.md` + `.claude/agents/`

Ne jamais copier-coller une information d'une source vers une autre — toujours référencer.
