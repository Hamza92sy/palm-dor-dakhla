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

## Documentation Update Checklist

Après chaque changement significatif, répondre à chaque question :

### PROGRESS.md

- L'état de production a-t-il changé ?
- Une fonctionnalité a-t-elle été ajoutée, modifiée ou supprimée ?
- Un workflow a-t-il changé (réservation, email, dashboard) ?
- Une limitation ou un bug a-t-il été identifié ?

→ **Oui à l'une de ces questions** : mettre à jour `PROGRESS.md`

### docs/architecture/db-schema.md

- Le schéma Supabase a-t-il changé (nouvelle colonne, nouvelle table, migration) ?
- Une contrainte DB a-t-elle été ajoutée ou modifiée ?

→ **Oui** : mettre à jour `docs/architecture/db-schema.md`

### docs/architecture/user-flows.md

- Le parcours visiteur a-t-il changé (nouvelle étape, nouveau CTA, nouveau flux) ?
- Le formulaire de réservation a-t-il évolué ?

→ **Oui** : mettre à jour `docs/architecture/user-flows.md`

### docs/operations/ADMIN-WORKFLOW.md

- Le dashboard admin a-t-il changé (nouvelle action, nouveau statut, nouvelle vue) ?
- Le workflow accept/refuse a-t-il évolué ?

→ **Oui** : mettre à jour `docs/operations/ADMIN-WORKFLOW.md`

### docs/operations/VERCEL_ENV_AUDIT.md

- Une variable d'environnement a-t-elle été ajoutée, modifiée ou supprimée ?
- La configuration Vercel a-t-elle changé ?

→ **Oui** : mettre à jour `docs/operations/VERCEL_ENV_AUDIT.md`

### docs/content/services.md

- Les données appartements ont-elles changé (prix, description, capacité) ?
- Un service a-t-il été ajouté ou modifié (restaurant, café, voiture) ?

→ **Oui** : mettre à jour `docs/content/services.md`

---

## Étape — Archive Obsolete Docs

Pour chaque document obsolète identifié :

1. Déplacer dans `docs/archive/`
1. Ajouter en tête de fichier :

```text
[ARCHIVED YYYY-MM-DD — Remplacé par docs/[nouveau-doc].md]
```

1. Dans le document qui le remplace, référencer l'archive.

Ne jamais supprimer — toujours archiver.

---

## Étape — Sync PROGRESS.md

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

Garder chaque entrée sous 20 lignes.

---

## Format de rapport obligatoire

Terminer chaque session avec :

```text
## Session summary

1. Code changes      : [fichiers modifiés]
2. Doc changes       : [docs mises à jour]
3. Docs not updated  : [docs skippées + raison]
4. Build result      : [OK / erreurs]
5. Next step         : [recommandation]
```

---

## Vérification finale

- [ ] `PROGRESS.md` reflète l'état actuel (pas l'état souhaité)
- [ ] Aucun document ne contredit un autre
- [ ] Les docs obsolètes sont archivés (pas supprimés)
- [ ] Aucune information n'est dupliquée entre deux sources
- [ ] Le rapport de session a été affiché
