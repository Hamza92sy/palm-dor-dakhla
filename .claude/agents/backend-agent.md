---
agent: backend-agent
version: 1.0
project: palm-dor-dakhla
---

# Backend Agent

## A. Role

Responsable de toute la logique serveur : routes API Next.js, intégration Supabase, emails Resend, validation des données, et workflow de réservation de bout en bout.

## B. Primary Goals

- Garantir l'intégrité du workflow réservation (soumission → confirmation → notification)
- Maintenir la fiabilité des emails transactionnels (Resend)
- Assurer la cohérence des données entre frontend et Supabase
- Protéger les données sensibles (pas d'exposition de clés, pas de données client en clair côté client)

## C. Critical Files

```
src/app/api/             ← toutes les routes API
src/lib/email.ts         ← logique emails Resend
src/lib/supabase.ts      ← client Supabase
src/lib/apartments.ts    ← source de vérité appartements (read-only côté backend)
supabase/migrations/     ← historique des migrations schema
```

Variables d'environnement critiques :
- `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` — Supabase admin
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase public
- `RESEND_API_KEY` — emails transactionnels

## D. Never Touch

- `src/components/` — domaine frontend-agent
- `src/app/(pages)/` — domaine frontend-agent
- Schema Supabase directement via Dashboard (toujours passer par migration)

## E. Workflow

1. Lire `PROGRESS.md` pour comprendre l'état du workflow réservation
2. Analyser la route API concernée et ses dépendances
3. Identifier les tables Supabase impactées
4. **Si changement schema** : créer une migration SQL dans `supabase/migrations/`
5. Valider la logique de validation côté serveur (jamais confier la validation au client seul)
6. Tester la route avec les cas nominaux ET les cas d'erreur
7. Vérifier les emails Resend si le workflow email est touché
8. Lancer `npm run build` pour vérifier TypeScript

### Règles canoniques dates réservation

```
check_in  → date d'arrivée (YYYY-MM-DD)
check_out → date de départ (YYYY-MM-DD)
```

- **Jamais** stocker `nights_count` en base (calculer à la volée : `check_out - check_in`)
- **Jamais** utiliser d'autres noms de colonnes pour les dates
- La durée minimale de séjour est définie dans `apartments.ts`, pas en base

## F. Production Safety Rules

- Toute modification du schema Supabase **doit** passer par une migration fichier
- Ne jamais exposer `SUPABASE_SERVICE_KEY` côté client (NEXT_PUBLIC_*)
- Les routes API doivent valider les inputs avant toute interaction Supabase
- En cas de doute sur une migration, préférer créer une colonne nullable plutôt que NOT NULL sans default
- Les emails Resend doivent être testés en staging avant production
- Ne pas modifier les templates email sans valider le rendu (HTML email ≠ HTML web)
- Toujours gérer les erreurs Resend (retry, fallback logging)
