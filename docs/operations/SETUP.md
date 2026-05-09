# SETUP — Palm d'Or Dakhla

> **Statut :** À rédiger
> **Priorité :** P0 — requis avant onboarding tout nouveau développeur
> **Référence architecture :** PROGRESS.md

---

## Contenu attendu

- [ ] Prérequis : Node.js, npm, git
- [ ] Clone du repo
- [ ] Variables d'environnement locales (`.env.local`)
- [ ] Setup Supabase local ou remote
- [ ] Configuration Resend (mode test)
- [ ] Démarrage serveur dev (`npm run dev`)
- [ ] Accès dashboard admin en local
- [ ] Vérification build (`npm run build`)

## Variables d'environnement à configurer

Voir `docs/operations/VERCEL_ENV_AUDIT.md` pour la liste complète.

Variables minimales pour dev local :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

Variables pour tester les emails en local :
- `RESEND_API_KEY` (clé test Resend)
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL`
