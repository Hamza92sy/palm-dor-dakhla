# VERCEL ENV AUDIT — Palm d'Or Dakhla

*Audit mis à jour le 2026-05-10 — V2.3 post-validation production*

---

## Inventaire complet des variables d'environnement

| Variable | Obligatoire | Type | Statut Vercel | Rôle |
|----------|-------------|------|---------------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | Public | ✅ Configuré | Client + server Supabase — URL projet |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui | Public | ✅ Configuré | Client Supabase — INSERT public (RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Oui | **Secret** | ✅ Configuré | Server-only — bypass RLS pour routes admin |
| `ADMIN_SECRET` | Oui | **Secret** | ✅ Configuré | Mot de passe dashboard `/admin` (hashé en cookie) |
| `ADMIN_EMAIL` | Oui | Secret | ✅ Configuré | Destinataire notifications nouvelles demandes |
| `RESEND_API_KEY` | Oui | **Secret** | ✅ Configuré | SDK Resend — envoi emails admin + client |
| `RESEND_FROM_EMAIL` | Oui | Secret | ✅ Configuré | Adresse expéditeur — ex: `notifications@palmdordakhla.com` |
| `RESEND_FROM_NAME` | Non | Secret | ✅ Configuré | Nom affiché expéditeur — ex: `Palm d'Or Dakhla` |
| `RESEND_WEBHOOK_SECRET` | Oui | **Secret** | ✅ Configuré | Signature webhook Resend (`whsec_xxx`) — tracking délivrabilité |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Oui | Public | ✅ Configuré | Numéro officiel Palm d'Or — format `212XXXXXXXXX` |
| `NEXT_PUBLIC_SITE_URL` | Non | Public | — Non configuré | URL canonique — hardcodé en fallback `palmdordakhla.com` |
| `NEXT_PUBLIC_GA_ID` | Non | Public | ⏳ En attente | Google Analytics 4 — no-op si absent |
| `NEXT_PUBLIC_META_PIXEL_ID` | Non | Public | ⏳ En attente | Meta Pixel — no-op si absent |

---

## Détail par variable

### `NEXT_PUBLIC_SUPABASE_URL`

- **Utilisé dans** : `src/lib/supabase/client.ts` + `src/lib/supabase/server.ts`
- **Impact si absent** : formulaires lead brisés (500 sur `/api/lead`), leads non enregistrés
- **Format** : `https://xxxxx.supabase.co`
- **Où trouver** : Supabase Dashboard → Project Settings → API → Project URL

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Utilisé dans** : `src/lib/supabase/client.ts` (client-side)
- **Impact si absent** : client Supabase browser non initialisé
- **Format** : JWT long (eyJh...)
- **Sécurité** : clé publique, safe d'exposer côté browser avec RLS activé

### `SUPABASE_SERVICE_ROLE_KEY`

- **Utilisé dans** : `src/lib/supabase/server.ts` — routes admin server-only
- **Impact si absent** : impossible d'accéder aux leads depuis le dashboard ou les routes admin
- **Format** : JWT long (eyJh...)
- **CRITIQUE** : ne JAMAIS préfixer `NEXT_PUBLIC_`. Ne jamais importer dans un composant `'use client'`.
- **Configuration Vercel** : cocher **"Sensitive"** lors de l'ajout

### `ADMIN_SECRET`

- **Utilisé dans** : `/api/admin/auth/route.ts` — login dashboard
- **Impact si absent** : impossible de se connecter au dashboard admin
- **Format** : chaîne libre (mot de passe)
- **Configuration Vercel** : cocher **"Sensitive"**

### `ADMIN_EMAIL`

- **Utilisé dans** : `src/lib/email.ts` — `sendLeadNotification()`
- **Impact si absent** : pas d'email de notification à chaque nouvelle demande (warning loggé, pas d'erreur)
- **Format** : adresse email valide

### `RESEND_API_KEY`

- **Utilisé dans** : `src/lib/email.ts` — SDK Resend (emails admin + client)
- **Impact si absent** : aucun email envoyé (warning loggé, pas d'erreur — graceful no-op)
- **Format** : `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Où trouver** : Resend Dashboard → API Keys
- **Configuration Vercel** : cocher **"Sensitive"**

### `RESEND_FROM_EMAIL`

- **Utilisé dans** : `src/lib/email.ts` — champ `from` de tous les emails
- **Impact si absent** : aucun email envoyé (no-op)
- **Format** : adresse email vérifiée sur Resend — `notifications@palmdordakhla.com`
- **Prérequis** : le domaine `palmdordakhla.com` doit être vérifié dans Resend (✅ fait)

### `RESEND_FROM_NAME`

- **Utilisé dans** : `src/lib/email.ts` — nom affiché dans le champ `from`
- **Impact si absent** : fallback hardcodé `Palm d'Or Dakhla` (non bloquant)
- **Format** : texte libre — ex: `Palm d'Or Dakhla`

### `RESEND_WEBHOOK_SECRET`

- **Utilisé dans** : `/api/webhooks/resend/route.ts` — vérification signature Svix
- **Impact si absent** : webhook retourne 500, tracking délivrabilité inactif (badge `✓ Délivré` jamais affiché)
- **Format** : `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Où trouver** : Resend Dashboard → Webhooks → signing secret
- **Statut** : ✅ configuré sur Vercel — webhook opérationnel

### `NEXT_PUBLIC_WHATSAPP_NUMBER`

- **Utilisé dans** : `src/lib/services.ts`, `src/lib/email.ts` (lien WA dans emails client), `src/app/api/lead/route.ts`
- **Impact si absent** : lien WhatsApp non généré dans les emails client, bouton WA flottant inactif
- **Format** : `212XXXXXXXXX` (sans +, sans espaces)
- **CRITIQUE** : ce numéro est utilisé comme **destinataire** du lien WhatsApp dans les emails client — s'assurer que c'est le numéro officiel Palm d'Or, pas un numéro personnel

### `NEXT_PUBLIC_SITE_URL`

- **Utilisé dans** : `src/lib/email.ts` (footer emails), sitemap, OG tags
- **Impact si absent** : fallback `https://palmdordakhla.com` hardcodé — fonctionnel
- **Format** : `https://palmdordakhla.com`
- **Statut** : non configuré sur Vercel — le fallback hardcodé suffit pour la prod actuelle

### `NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_META_PIXEL_ID`

- **Utilisé dans** : `src/app/layout.tsx` — conditionnel (no-op si absent)
- **Impact si absent** : tracking désactivé — site fonctionnel normalement
- **Priorité** : P5 — activer avant lancement de campagnes payantes

---

## Sécurité — règles actives

- `SUPABASE_SERVICE_ROLE_KEY` : importé uniquement dans des Route Handlers serveur — jamais côté client
- `ADMIN_SECRET` : jamais exposé dans les logs ou les réponses API
- `RESEND_API_KEY` : server-only (`import('resend')` dynamique dans des fonctions serveur)
- `RESEND_WEBHOOK_SECRET` : utilisé uniquement pour vérifier la signature des webhooks entrants

Surveiller : ne jamais importer `src/lib/supabase/server.ts` ou `src/lib/email.ts` dans un composant `'use client'`.

---

## Procédure de vérification post-déploiement

```bash
# Test formulaire lead
curl -X POST https://palmdordakhla.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"0600000000","service":"restaurant","message":"test"}'
# Réponse attendue : {"success":true,"whatsappUrl":"https://wa.me/212..."}

# Test webhook Resend (vérifier dans Vercel logs que le endpoint retourne 200)
# Resend Dashboard → Webhooks → tester l'envoi d'un event
```

---

## Actions restantes (non bloquantes)

| Priorité | Action |
|----------|--------|
| P3 délivrabilité | Créer sous-domaine d'envoi `mail.palmdordakhla.com` dans Resend + SPF/DKIM/DMARC dédiés |
| P5 analytics | Configurer `NEXT_PUBLIC_GA_ID` sur Vercel |
| P5 analytics | Configurer `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel |
