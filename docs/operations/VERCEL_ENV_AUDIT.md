# VERCEL ENV AUDIT — Palm d'Or Dakhla
*Audit du 2026-05-07*

---

## Inventaire complet des variables d'environnement

| Variable | Utilisation dans le code | Obligatoire | Type | Statut local | Statut Vercel |
|----------|-------------------------|-------------|------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `supabase/client.ts`, `supabase/server.ts` | ✅ Oui | Public | ✅ Configuré | ⚠️ À vérifier |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `supabase/client.ts` | ✅ Oui | Public | ✅ Configuré | ⚠️ À vérifier |
| `SUPABASE_SERVICE_ROLE_KEY` | `supabase/server.ts` (server-only) | ✅ Oui | **Secret** | ✅ Configuré | ⚠️ À vérifier |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `config.ts`, `api/lead/route.ts` | ✅ Oui | Public | ✅ Configuré | ⚠️ À vérifier |
| `NEXT_PUBLIC_META_PIXEL_ID` | `layout.tsx` (conditionnel) | ❌ Non | Public | ✅ Présent | ⚠️ À configurer |
| `NEXT_PUBLIC_GA_ID` | `layout.tsx` (conditionnel) | ❌ Non | Public | ✅ Présent | ⚠️ À configurer |

---

## Détail par variable

### `NEXT_PUBLIC_SUPABASE_URL`

- **Utilisé dans** : `src/lib/supabase/client.ts` + `src/lib/supabase/server.ts`
- **Impact si absent** : formulaires lead brisés (500 sur `/api/lead`), leads non enregistrés
- **Format** : `https://xxxxx.supabase.co`
- **Où trouver** : Supabase Dashboard → Project Settings → API → Project URL
- **⚠️ Critique** : sans cette variable, le formulaire ne fonctionne pas en production

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Utilisé dans** : `src/lib/supabase/client.ts` (client-side)
- **Impact si absent** : client Supabase browser non initialisé
- **Format** : JWT long (eyJh...)
- **Où trouver** : Supabase Dashboard → Project Settings → API → anon/public key
- **Sécurité** : clé publique, safe d'exposer côté browser avec RLS activé

### `SUPABASE_SERVICE_ROLE_KEY`

- **Utilisé dans** : `src/lib/supabase/server.ts` — Route Handler `/api/lead` uniquement
- **Impact si absent** : impossible d'insérer des leads dans Supabase (bypass RLS requis)
- **Format** : JWT long (eyJh...)
- **Où trouver** : Supabase Dashboard → Project Settings → API → service_role key
- **⚠️ SECRET** : ne JAMAIS préfixer `NEXT_PUBLIC_`. Jamais exposer côté client.
- **Configuration Vercel** : cocher **"Sensitive"** lors de l'ajout

### `NEXT_PUBLIC_WHATSAPP_NUMBER`

- **Utilisé dans** : `src/lib/config.ts` (affichage + liens tel:), `src/app/api/lead/route.ts` (URL WhatsApp)
- **Impact si absent** : API `/api/lead` retourne 503, bouton WhatsApp inactif, numéro non affiché
- **Format** : `212661931317` (sans +, sans espaces — ex. Maroc)
- **Valeur actuelle** : `+212 661 931 317`
- **⚠️ Critique** : sans cette variable, l'intégralité du funnel de conversion est brisée

### `NEXT_PUBLIC_META_PIXEL_ID`

- **Utilisé dans** : `src/app/layout.tsx` — conditionnel (`if PIXEL_ID`)
- **Impact si absent** : tracking Meta désactivé — site fonctionne normalement
- **Format** : nombre à 15-16 chiffres (ex. `1234567890123456`)
- **Où trouver** : Meta Business Manager → Events Manager → Pixels
- **Statut** : optionnel — activer avant lancement de campagnes Meta Ads

### `NEXT_PUBLIC_GA_ID`

- **Utilisé dans** : `src/app/layout.tsx` — conditionnel (`if GA_ID`)
- **Impact si absent** : tracking GA4 désactivé — site fonctionne normalement
- **Format** : `G-XXXXXXXXXX`
- **Où trouver** : Google Analytics → Admin → Property → Data Streams → Measurement ID
- **Statut** : optionnel — activer dès que le domaine est connecté

---

## Risques identifiés

### 🔴 Risque critique — `SUPABASE_SERVICE_ROLE_KEY` exposée

**Ce risque N'EXISTE PAS dans le code actuel** — le fichier `server.ts` est uniquement importé dans `api/lead/route.ts` (Route Handler), qui s'exécute côté serveur. La clé n'est jamais envoyée au browser.

À surveiller : ne jamais importer `src/lib/supabase/server.ts` dans un composant Client (fichier avec `'use client'`).

### 🟠 Risque — Variables absentes sur Vercel

Les variables sont configurées dans `.env.local` (local uniquement). Vercel **ne lit pas** `.env.local` — il faut les reconfigurer manuellement dans le dashboard Vercel.

### 🟡 Risque — Format `NEXT_PUBLIC_WHATSAPP_NUMBER`

Le code dans `config.ts` gère le formatage d'affichage en assumant 12 chiffres :
```ts
const display = number.length === 12
  ? `+${number.slice(0,3)} ${number.slice(3,6)}...`
  : `+${number}`
```
Le numéro `212661931317` fait bien 12 chiffres. ✅

---

## Procédure de configuration sur Vercel

### Accès

Vercel Dashboard → projet **palm-dor-dakhla** → **Settings** → **Environment Variables**

### Variables à configurer (copier depuis `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL        = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = eyJh...
SUPABASE_SERVICE_ROLE_KEY       = eyJh...  [cocher Sensitive]
NEXT_PUBLIC_WHATSAPP_NUMBER     = 212661931317
NEXT_PUBLIC_META_PIXEL_ID       = [votre Pixel ID — laisser vide si pas encore créé]
NEXT_PUBLIC_GA_ID               = [votre GA4 ID — laisser vide si pas encore créé]
```

### Environnements à cocher

Pour chaque variable, cocher **Production**, **Preview** et **Development**.

Exception : `SUPABASE_SERVICE_ROLE_KEY` — cocher uniquement **Production** et **Preview**
(en développement, le `.env.local` est utilisé).

### Après ajout des variables

Déclencher un nouveau déploiement : **Deployments** → **Redeploy** sur le dernier déploiement.

---

## Vérification post-déploiement

```bash
# Test formulaire lead (remplacer l'URL par le domaine connecté)
curl -X POST https://palmdordakhla.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"0600000000","service":"accommodation"}'

# Réponse attendue : {"success":true,"whatsappUrl":"https://wa.me/..."}
# Réponse si ENV absent : {"error":"Service temporairement indisponible"} (503)
```

---

## Résumé des actions

| Priorité | Action |
|----------|--------|
| 🔴 Critique | Configurer les 4 variables obligatoires sur Vercel avant le go-live |
| 🟠 Avant campagnes | Ajouter `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel |
| 🟠 Avant campagnes | Ajouter `NEXT_PUBLIC_GA_ID` sur Vercel |
| ✅ Déjà fait | Toutes les variables sont configurées en local (`.env.local`) |
