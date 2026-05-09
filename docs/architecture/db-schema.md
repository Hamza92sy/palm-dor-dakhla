# Schéma base de données

## Supabase

- **URL** : `NEXT_PUBLIC_SUPABASE_URL` (dans `.env.local`)
- **Clé publique** : `NEXT_PUBLIC_SUPABASE_ANON_KEY` (INSERT uniquement)
- **Clé admin** : `SUPABASE_SERVICE_ROLE_KEY` (READ + admin, côté serveur uniquement)

## Table `leads`

Migration : `src/lib/supabase/migrations/001_leads.sql`

| Colonne      | Type        | Défaut              | Contrainte                                              |
| ------------ | ----------- | ------------------- | ------------------------------------------------------- |
| `id`         | uuid        | `gen_random_uuid()` | PRIMARY KEY                                             |
| `created_at` | timestamptz | `now()`             | NOT NULL                                                |
| `name`       | text        |                     | NOT NULL, min 2 chars                                   |
| `phone`      | text        |                     | NOT NULL, min 8 chars                                   |
| `service`    | text        |                     | CHECK: accommodation / restaurant / cafe / car_rental   |
| `message`    | text        |                     | Nullable                                                |
| `status`     | text        | `'new'`             | CHECK: new / contacted / confirmed / cancelled          |
| `source`     | text        | `'website'`         | NOT NULL                                                |
| `language`   | text        | `'fr'`              | CHECK: fr / en                                          |

## Sécurité (RLS)

- **Anonyme** : INSERT uniquement (formulaire public)
- **Service role** : tous les droits (API admin, futur dashboard)
- Pas de SELECT public — les leads ne sont jamais exposés côté client

## Index

```sql
leads_created_at_idx  ON leads (created_at DESC)
leads_status_idx      ON leads (status)
leads_service_idx     ON leads (service)
```

## API route

`POST /api/lead` — `src/app/api/lead/route.ts`

Flux :

1. Valide `name`, `phone`, `service`, `language` (message optionnel)
2. Insère dans `leads` via `supabaseAdmin`
3. Génère l'URL WhatsApp avec message pré-rempli
4. Retourne `{ whatsappUrl }` au client
5. Le client redirige vers WhatsApp

## Règles de modification

- Ne jamais modifier le schéma sans créer une nouvelle migration numérotée
- Toute nouvelle colonne doit avoir une valeur par défaut (rétrocompatibilité)
- Mettre à jour ce fichier après chaque migration
