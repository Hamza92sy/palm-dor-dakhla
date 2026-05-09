---
playbook: documentation-update
version: 1.0
project: palm-dor-dakhla
---

# Playbook — Documentation Update

Utiliser ce playbook après toute intervention significative sur le projet, ou quand la documentation est identifiée comme obsolète ou manquante.

---

## Quand utiliser ce playbook

- Après l'implémentation d'une nouvelle feature
- Après la correction d'un bug qui révèle une incompréhension dans les docs
- Quand deux documents se contredisent
- Quand PROGRESS.md n'a pas été mis à jour depuis > 1 semaine
- Quand un document décrit une architecture qui n'existe plus

---

## Étape 1 — Update Affected Docs

Identifier tous les documents impactés par le changement récent :

| Changement | Documents à mettre à jour |
|---|---|
| Nouvelle feature | `PROGRESS.md` en priorité |
| Changement architecture | `CLAUDE.md` + `PROGRESS.md` |
| Nouveau workflow réservation | `CLAUDE.md` + `docs/booking-flow.md` |
| Changement schema DB | `PROGRESS.md` + `docs/database.md` |
| Nouveau rôle agent | `AGENTS.md` + `.claude/agents/` |
| Changement règle | `.claude/rules/[rule].md` |

---

## Étape 2 — Archive Obsolete Docs

Pour chaque document obsolète identifié :

1. Déplacer le fichier dans `docs/archive/`
2. Ajouter en tête de fichier :
   ```
   [ARCHIVED YYYY-MM-DD — Remplacé par docs/[nouveau-doc].md]
   ```
3. Dans le document qui le remplace, ajouter une note :
   ```
   > Remplace l'ancien [nom-doc.md] archivé le YYYY-MM-DD.
   ```

Ne jamais supprimer — toujours archiver.

---

## Étape 3 — Sync PROGRESS.md

`PROGRESS.md` se met à jour en dernier, car il référence tout ce qui a été fait.

Format standard :

```markdown
## [YYYY-MM-DD] — Titre descriptif de l'intervention

**Fait :**
- Action concrète 1
- Action concrète 2

**État actuel :**
- Système réservation : fonctionnel
- Dashboard : fonctionnel
- Emails : fonctionnel / [état]

**Prochaines étapes :**
- Tâche identifiée 1
- Tâche identifiée 2
```

Garder chaque entrée sous 20 lignes. La concision est une forme de respect pour les futures lectures (humaines et IA).

---

## Vérification finale

- [ ] `PROGRESS.md` reflète l'état actuel (pas l'état souhaité)
- [ ] Aucun document ne contredit un autre
- [ ] Les docs obsolètes sont archivés (pas supprimés)
- [ ] Aucune information n'est dupliquée entre deux sources
