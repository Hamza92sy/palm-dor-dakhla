<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Rules de travail — Palm d'Or Dakhla

## Avant chaque tâche

1. Lire `PROGRESS.md` — source de vérité V2.3 (état complet, DB schema, architecture)
2. Lire `CLAUDE.md` — master brief, stack, règles absolues
3. Lire le fichier `docs/` pertinent selon la tâche
4. Ne jamais utiliser `docs/archive/` comme référence — historique uniquement
5. Ne jamais supposer — lire le code si incertain

## Ce que tu dois faire

- Suivre le design system existant (palm-cream / palm-blue / palm-gold / Cormorant Garamond + Geist)
- Mobile-first toujours
- Formulaire structuré → Supabase → dashboard admin (flux principal)
- WhatsApp = option secondaire post-soumission, pas flux primaire
- Composants réutilisables — ne pas dupliquer du JSX sans raison
- TypeScript strict — zéro `any`, zéro `as unknown`
- Exécuter `npm run build` après chaque modification et corriger toute erreur avant de reporter

## Ce que tu ne dois PAS faire

- Refactor du code qui fonctionne
- Ajouter des dépendances non nécessaires
- Inventer des données (prix, menus, offres) — utiliser uniquement `docs/content/services.md`
- Utiliser le mot "hôtel" — dire "appartements", "résidence" ou "hébergement"
- Modifier le schéma Supabase sans migration SQL numérotée dans `src/lib/supabase/migrations/`
- Créer de nouvelles pages sans alignement explicite
- Bypasser les hooks git (`--no-verify`)
- Hardcoder des IDs ou données appartements — utiliser `src/lib/apartments.ts`
- Utiliser `docs/archive/*` pour des décisions d'implémentation

## Workflow standard

```text
Lire PROGRESS.md → Lire brief → Lire code concerné → Coder → Build → Reporter fichiers modifiés
```

## Fichiers critiques à ne pas casser

**Logique métier**
- `src/lib/apartments.ts` — source unique appartements (IDs, prix, étages, messages WA)
- `src/lib/services.ts` — types ServiceType et messages WhatsApp
- `src/lib/tracking.ts` — événements Meta Pixel + GA4
- `src/lib/email.ts` — emails Resend (pattern Result {data, error}, fire-and-forget)

**API routes**
- `src/app/api/lead/route.ts` — soumission formulaire public (runtime nodejs)
- `src/app/api/admin/leads/[id]/route.ts` — PATCH dashboard admin (runtime nodejs)
- `src/app/api/admin/export/route.ts` — export CSV
- `src/app/api/admin/auth/route.ts` — login dashboard

**Infrastructure**
- `middleware.ts` — auth Edge Runtime admin — toute erreur = lockout production
- `src/app/layout.tsx` — tracking global, fonts, metadata root
- `src/components/ui/WhatsAppButton.tsx` — composant CTA universel

**Dashboard admin**
- `src/app/admin/components/DecisionPanel.tsx` — accept/refuse (emails envoyés aux clients)
- `src/app/admin/components/StatusSelect.tsx` — statuts opérationnels

## Réponse attendue après chaque tâche

1. Fichiers modifiés (chemin exact)
2. Résumé des changements
3. Confirmation `npm run build` OK ou erreurs
