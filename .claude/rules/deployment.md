---
rule: deployment
version: 1.0
project: palm-dor-dakhla
---

# Deployment Rules

## Build Before Push

Aucun push vers Vercel sans build local réussi :

```bash
npm run build
```

Un build qui échoue localement échouera en production. Ne pas pousser en espérant que "ça passe".

Si le build échoue :
1. Lire l'erreur complète (TypeScript, ESLint, ou runtime)
2. Corriger la cause racine
3. Relancer `npm run build`
4. Build vert → push autorisé

## Vercel Production Safety

La branche `main` déploie automatiquement en production sur Vercel.

Avant tout push sur `main` :
- [ ] Build local réussi (`npm run build`)
- [ ] Fonctionnalité testée localement (`npm run dev`)
- [ ] Flux réservation vérifié
- [ ] Dashboard admin vérifié

Pour les changements risqués, utiliser une branche preview Vercel avant de merger sur `main`.

## Env Vars Verification

Les variables d'environnement critiques doivent être présentes sur Vercel avant déploiement :

```
SUPABASE_URL
SUPABASE_SERVICE_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
NEXT_PUBLIC_SITE_URL
```

Vérifier via Vercel Dashboard > Project > Settings > Environment Variables.

Si une variable manque, le site peut builder mais échouer en runtime silencieusement (pire cas).

## Resend Validation

Avant tout déploiement touchant le workflow email :

1. Vérifier que `RESEND_API_KEY` est valide et actif
2. Tester l'envoi d'un email de test en staging si possible
3. Vérifier que les adresses email expéditeur sont vérifiées dans Resend
4. Confirmer que les templates email s'affichent correctement

Les emails en production sont la seule communication avec le client après réservation — une régression email est une régression business critique.

## Rollback Awareness

En cas de problème en production après déploiement :

**Option 1 — Revert Vercel (rapide)**
- Vercel Dashboard > Deployments > Deploy précédent > Promote to Production
- Résolution en < 2 minutes

**Option 2 — Revert Git**
```bash
git revert HEAD
git push
```

**Option 3 — Hotfix**
- Seulement si le problème est mineur et la correction est certaine
- Build local obligatoire avant push

Toujours choisir l'option la plus rapide. Le site en production est l'outil de travail du propriétaire.
