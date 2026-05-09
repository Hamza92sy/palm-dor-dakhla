# DEPLOYMENT — Palm d'Or Dakhla

> **Statut :** À rédiger
> **Priorité :** P2
> **Référence architecture :** PROGRESS.md § Production Status

---

## Contenu attendu

### Pipeline de déploiement actuel
- Push sur `main` → Vercel déploie automatiquement
- Build Next.js 16.2.3 (Turbopack)
- 0 erreur TypeScript requis avant merge

### Variables d'environnement Vercel
Voir `docs/operations/VERCEL_ENV_AUDIT.md` pour la liste complète.
À mettre à jour : variables Resend manquantes dans ce fichier.

### Rollback
- [ ] Via Vercel Dashboard → Deployments → Promote previous

### Migrations Supabase
- Appliquer via Supabase MCP ou SQL Editor
- Documenter dans `src/lib/supabase/migrations/`
- Attention : migration 004 appliquée via MCP sans fichier local — voir PROGRESS.md § 8

### Domaines
- `palmdordakhla.com`
- `www.palmdordakhla.com`
- `palm-dor-dakhla.vercel.app` (preview)

### Resend
- Domaine `palmdordakhla.com` vérifié
- FROM : `notifications@palmdordakhla.com`
