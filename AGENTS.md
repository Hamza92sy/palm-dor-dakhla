<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Rules de travail — Palm d'Or Dakhla

## Avant chaque tâche

1. Lire `CLAUDE.md` (master brief)
2. Lire le fichier `docs/` pertinent selon la tâche
3. Vérifier `docs/current-state.md` pour ne pas refaire ce qui existe
4. Ne jamais supposer — lire le code si incertain

## Ce que tu dois faire

- Suivre le design system existant (palm-cream / palm-blue / palm-gold / Cormorant Garamond + Geist)
- Mobile-first toujours
- Conversion-first : chaque page doit pousser vers WhatsApp
- Composants réutilisables — ne pas dupliquer du JSX sans raison
- TypeScript strict — zéro `any`, zéro `as unknown`
- Exécuter `npm run build` après chaque modification et corriger toute erreur avant de reporter

## Ce que tu ne dois PAS faire

- Refactor du code qui fonctionne
- Ajouter des dépendances non nécessaires
- Inventer des données (prix, menus, offres) — utiliser uniquement `docs/services.md`
- Utiliser le mot "hôtel" — dire "appartements", "résidence" ou "hébergement"
- Modifier le schéma Supabase sans lire `docs/db-schema.md`
- Créer de nouvelles pages sans alignement explicite
- Bypasser les hooks git (`--no-verify`)

## Workflow standard

```text
Lire brief → Lire état actuel → Coder → Build → Reporter fichiers modifiés
```

## Fichiers critiques à ne pas casser

- `src/lib/services.ts` — types ServiceType et messages WhatsApp
- `src/lib/tracking.ts` — événements Meta Pixel + GA4
- `src/app/api/lead/route.ts` — API Supabase
- `src/app/layout.tsx` — tracking global, fonts, metadata
- `src/components/ui/WhatsAppButton.tsx` — composant CTA universel

## Réponse attendue après chaque tâche

1. Fichiers modifiés (chemin exact)
2. Résumé des changements
3. Confirmation `npm run build` OK ou erreurs
