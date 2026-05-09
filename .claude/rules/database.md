---
rule: database
version: 1.0
project: palm-dor-dakhla
---

# Database Rules

## Migration Obligatoire

Toute modification du schema Supabase **doit** passer par un fichier de migration :

```
supabase/migrations/YYYYMMDDHHMMSS_description.sql
```

**Jamais** modifier le schema via :
- Le Dashboard Supabase (Table Editor)
- Une requête SQL directe en prod
- Un script non versionné

Les migrations sont le seul journal d'audit du schema.

## Colonnes Dates Canoniques

Les dates de réservation utilisent **exclusivement** ces noms :

```sql
check_in  DATE  -- date d'arrivée
check_out DATE  -- date de départ
```

**Interdit** :
- `checkin`, `check_in_date`, `arrival`, `arrival_date`
- `checkout`, `check_out_date`, `departure`, `departure_date`
- Stocker `nights_count` en base de données

La durée du séjour se calcule toujours à la volée :
```typescript
const nights = differenceInDays(new Date(check_out), new Date(check_in));
```

## apartments.ts est la Source de Vérité

Les données appartements (nom, description, capacité, équipements, tarifs) vivent dans :

```
src/lib/apartments.ts
```

**Ne pas** dupliquer ces données en base Supabase. La base stocke les **réservations**, pas les définitions d'appartements.

Si les données appartements doivent évoluer (nouveau tarif, nouvelle description), modifier `apartments.ts` uniquement.

## Legacy Compatibility

Si des colonnes legacy existent en base, les lire sans les modifier jusqu'à migration planifiée. Ne jamais supprimer une colonne sans vérifier qu'elle n'est plus référencée dans le code.

Avant toute suppression de colonne :
1. Grep dans tout le codebase
2. Vérifier les routes API
3. Créer la migration DROP COLUMN en dernier

## Never Modify Schema Directly

En production, toute modification directe est interdite même pour un "hotfix". Si urgence :
1. Créer la migration
2. La tester sur une instance de développement si possible
3. Appliquer via `supabase db push` ou migration manuelle documentée
4. Mettre à jour `PROGRESS.md` avec le contexte de l'urgence
