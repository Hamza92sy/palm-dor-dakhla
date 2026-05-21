# Palm d'Or Dakhla — Project Progress & Technical Reference

> **Version :** V3.8 — Rate limiting /api/lead
> **Dernière mise à jour :** 2026-05-21
> **Build :** ✓ Clean — 0 erreurs TypeScript — 28 routes
> **⚠ Dépôt GitHub actif (temporaire) :** `Hamza92sy/palm-dor-dakhla` — voir §29

---

## 1. Project Overview

**Palm d'Or Dakhla** est une résidence multi-services à Dakhla, Maroc.
Services : hébergement (6 appartements), restaurant, café, location de voitures.

### Objectif business

Convertir les visiteurs Google en réservations confirmées via un workflow structuré :

```text
Google → Site → Formulaire → Supabase → Dashboard admin → Accept/Refuse → Email client
```

### Ce que le système est maintenant

Le projet n'est **pas** un simple site vitrine. C'est un **request-based booking management system** :

- Les clients soumettent des demandes structurées (nom, téléphone, email, appartement, dates)
- L'admin reçoit une notification email immédiate
- L'admin gère les leads depuis un dashboard sécurisé
- L'admin accepte ou refuse chaque demande
- Le client reçoit un email de confirmation ou de refus

### Stack technique

| Couche          | Technologie                                       |
|----------------|--------------------------------------------------|
| Framework       | Next.js 16.2.3 App Router (Turbopack)            |
| Langage         | TypeScript strict                                 |
| Style           | Tailwind CSS 4                                    |
| Base de données | Supabase PostgreSQL 17 (eu-central-1)             |
| Email           | Resend (domaine palmdordakhla.com vérifié)        |
| Déploiement     | Vercel                                            |
| URL production  | <https://palmdordakhla.com>                       |

---

## 2. Current Production Features

### ✅ Site public

- [x] Homepage 7 sections (Hero, Services, Hébergements, Expérience, Galerie, Témoignages, CTA)
- [x] Pages service : `/hebergements`, `/restaurant`, `/cafe`, `/location-voiture`
- [x] Page galerie `/galerie` avec cross-links vers toutes les pages de conversion
- [x] Page contact `/contact` avec Google Maps
- [x] Formulaire lead structuré (homepage + chaque page service)
- [x] Formulaire hébergement : email obligatoire + arrivée + nuitées
- [x] Appartements groupés par étage sur `/hebergements` (2e/3e/4e)
- [x] Pages détail appartement `/hebergements/[aptId]` — 6 routes SSG, apt-4 avec galerie photos
- [x] Pages bilingues `/fr` et `/en` (EN = stub, non traduit)
- [x] Sitemap XML + robots.txt (`/admin` et `/api/` exclus)
- [x] Structured data complet : `LodgingBusiness` + `OfferCatalog` + `FAQPage` + `aggregateRating` + `openingHours`
- [x] Meta Pixel + GA4 (structure prête, conditionnels sur env vars)
- [x] WhatsApp secondaire (bouton flottant + success state)
- [x] Design system : `palm-cream / palm-blue / palm-gold`, Cormorant Garamond + Geist
- [x] **SEO Sprint (2026-05-16)** — voir §16

### ✅ Système de réservation (public)

- [x] Formulaire `service=accommodation` : email requis, type appartement, **arrivée requise**, nuitées
- [x] Validation frontend + backend : email · check_in · nights tous requis pour accommodation — soumission incomplète bloquée aux deux couches
- [x] Pré-sélection appartement depuis `/hebergements` : CTA `?apt=apt-X#contact` → appartement affiché en lecture seule avec option "Modifier"
- [x] `check_out` calculé côté frontend (`addDays(check_in, nights)`)
- [x] `nights_count` non stocké — calculé depuis `check_in` + `check_out` partout
- [x] Validation email côté client + côté API
- [x] POST `/api/lead` → INSERT Supabase + notification email admin
- [x] URL WhatsApp pré-rempli retourné en réponse (option secondaire post-submit)
- [x] Timeout 8s + gestion AbortController sur fetch public

### ✅ Dashboard admin (`/admin`)

- [x] Login mot de passe cookie HttpOnly 7 jours (`/admin/login`)
- [x] Middleware Edge Runtime : vérifie `admin_token` avant toute route admin
- [x] Table 8 colonnes : Date · Nom+Service · Téléphone · Email · Appartement · Séjour · Statut · Actions
- [x] Filtres URL : service, statut, recherche nom/téléphone (debounce 350ms)
- [x] **Boutons ✓ Accepter / ✗ Refuser inline** pour leads `accommodation` (sans expansion)
- [x] Statut opérationnel via `StatusSelect` : Nouveau / Contacté / Confirmé / Annulé
- [x] Badge statut décision : Accepté / Refusé (dans colonne Statut)
- [x] Notes internes auto-save 800ms (`LeadNotes.tsx`)
- [x] Panneau expandable "Détails" : DateRangePicker + ApartmentSelect + message + DecisionPanel complet
- [x] DecisionPanel complet : note textarea + boutons + warning email informatif
- [x] WhatsApp direct par lead (`wa.me` pré-rempli)
- [x] Export CSV (`/api/admin/export`) — 15 colonnes avec BOM UTF-8 pour Excel
- [x] Déconnexion Server Action

### ✅ Emails (Resend)

- [x] **Notification admin** : envoyée immédiatement à chaque nouveau lead
- [x] **Email client acceptation** : envoyé automatiquement quand admin clique Accepter
- [x] **Email client refus** : envoyé automatiquement quand admin clique Refuser
- [x] Fire-and-forget : statut DB mis à jour même si email échoue
- [x] Exécution post-réponse fiabilisée sur la route admin PATCH via `after()`
- [x] Display name expéditeur : `Palm d'Or Dakhla <notifications@palmdordakhla.com>`
- [x] Emails client en multipart `text/plain` + `html`
- [x] Preheader texte ajouté pour améliorer l'aperçu inbox
- [x] `replyTo` retiré des emails client décision après audit délivrabilité Gmail
- [x] Liens email simplifiés / plus sobres pour réduire les signaux promotionnels
- [x] **Bug corrigé (2026-05-10)** : lien WhatsApp dans emails client → pointe vers `NEXT_PUBLIC_WHATSAPP_NUMBER` (numéro Palm d'Or officiel) et non plus `lead.phone` (numéro du client)
- [x] Webhook Resend `/api/webhooks/resend` déployé — suit `delivered / bounced / complained` en temps réel
- [x] Fallback `data.email_id ?? data.id` dans le webhook (résilience payload Resend)
- [x] Tracking email côté admin déployé (`email_status`, `email_provider_id`, `email_status_at`)
- [x] Badge admin "✉ Non confirmé" si email_status reste `sent` > 60 min
- [x] Bouton WA mis en évidence dans le dashboard si bounce / failed / complained
- [x] Validation prod effectuée :
  - cas réel **Accepté** → email reçu
  - cas réel **Refusé** → email reçu
  - tests Gmail réels validés sur plusieurs comptes
- [x] Typo correction domaines email (gmial.com, hotmial.com, etc.) côté formulaires
- [x] DMARC `p=none` ajouté sur `palmdordakhla.com`
- [x] Graceful no-op si env vars Resend absentes (logs warning, pas d'exception)
- [x] `export const runtime = 'nodejs'` sur toutes les routes utilisant Resend
- [x] Domaine `palmdordakhla.com` vérifié sur Resend
- [x] FROM piloté par env vars (`RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`)

---

## 3. Reservation Workflow

```text
CLIENT
  └── Remplit le formulaire (hébergement : email + appartement + arrivée + nuitées)
        └── POST /api/lead
              ├── Validation : name, phone, email (requis héberg.), service, dates
              ├── check_out = addDays(check_in, nights)  ← calculé frontend
              ├── INSERT → Supabase leads (anon key + RLS)
              ├── sendLeadNotification() → email admin (fire-and-forget)
              └── { success: true, whatsappUrl } → affiche success state + WA optionnel

ADMIN (dashboard /admin)
  └── Voit le lead dans le tableau (email, appartement, séjour visibles directement)
        ├── Peut changer le statut opérationnel (Nouveau → Contacté → Confirmé)
        ├── Peut noter en interne (notes non visibles par le client)
        ├── Peut modifier appartement/dates via panneau Détails
        ├── Clic ✓ Accepter ou ✗ Refuser (inline ou panneau complet avec note)
        └── PATCH /api/admin/leads/:id
              ├── UPDATE Supabase (status + decision_at + decision_note)
              └── sendLeadDecisionEmail() → email client (fire-and-forget, si email présent)
```

### Note opérationnelle — Validation prod emails décision (2026-05-10)

Flow complet validé en conditions réelles :

- Clic admin ✓ Accepter → PATCH `/api/admin/leads/[id]` → UPDATE DB (`status`, `decision_at`) → `sendLeadDecisionEmail()` via `after()` → event Resend `Sent → Delivered` confirmé
- Logs Vercel observés : `[email] Sending accepted email to…` + `[email] Decision email sent: c7c4509d-…`
- Conclusion : code applicatif OK, délivrabilité technique OK
- Limitation identifiée : `Delivered` Resend ≠ visibilité inbox — Outlook peut filtrer en spam / focused-other / archive sans accusé côté expéditeur

### Note opérationnelle — Anti-spam session (2026-05-10)

Audit délivrabilité complet V2.3 — résultat :

- **Ce qui est déjà bon (code) :** expéditeur lisible `Palm d'Or Dakhla <notifications@palmdordakhla.com>`, text/plain dans les deux emails, HTML sobre, preheader client, sujets transactionnels, lien WA texte (pas bouton) dans l'email client, webhook tracking actif, DMARC p=none, domaine vérifié Resend, typo correction email côté formulaire.
- **Correctifs appliqués :** bouton WhatsApp vert `#25D366` → lien texte `#1C3A28` dans l'email admin (`sendLeadNotification`) ; couleur lien `#1a9e51` → `#1C3A28` dans l'email client (`sendLeadDecisionEmail`). Suppression de deux signaux promotionnels résiduels.
- **Prochaine étape DNS (non bloquant, priorité P1 délivrabilité) :** créer sous-domaine d'envoi dédié `mail.palmdordakhla.com` dans Resend, ajouter SPF+DKIM+DMARC dessus, mettre à jour `RESEND_FROM_EMAIL` → `notifications@mail.palmdordakhla.com`, redéployer.
- **Limite irréductible :** `Delivered` Resend ≠ affichage boîte principale. Gmail Promotions / Outlook Other/Spam décidés côté client sans signal retour. Régler via Google Postmaster Tools + signal opérateur WhatsApp si besoin.
- **Règle opérateur finalisée :** badge ≠ `✓ Délivré` après 30 min OU client dit "je n'ai rien reçu" → WhatsApp systématique.

### Note opérationnelle — Audit délivrabilité (2026-05-10)

Audit complet réalisé suite au problème "email Delivered mais client ne voit rien" :

- **Cause racine #1 (bloquante)** : `RESEND_WEBHOOK_SECRET` absent de Vercel → webhook retourne 500 → `email_status` reste éternellement `sent` → badge "✉ Non confirmé" toujours affiché → opérateur perd le signal tracking. **Action requise : configurer la var + URL webhook dans Resend dashboard.**
- **Cause racine #2 (délivrabilité)** : bouton WhatsApp fond vert dans l'email client → classifié "email promotionnel" par Gmail/Outlook → remplacé par lien texte sobre (2026-05-10).
- **Limite irréductible** : `Delivered` Resend = SMTP 250 OK côté serveur destinataire ≠ affichage inbox. Gmail Promotions / Outlook Other/Spam sont décidés côté client sans signal retour.
- **Règle opérateur** : si badge ≠ "✓ Délivré" après 30 min OU si client dit ne rien avoir reçu → WhatsApp systématique.

### Notes importantes sur le workflow

- **Workflow manuel** : pas de disponibilité automatique. L'admin valide chaque demande manuellement.
- **Logique hybride Airbnb** : le client demande, l'admin confirme. Pas de booking instantané.
- **Pas de double-booking protection** : deux demandes pour le même appartement aux mêmes dates peuvent coexister. L'admin gère le conflit manuellement.
- **Email décision optionnel** : si le lead n'a pas d'email (anciens leads), la décision est quand même enregistrée, l'email client est simplement ignoré.

---

## 4. Apartments Architecture

### Source unique : `src/lib/apartments.ts`

**Ce fichier est la seule source de vérité pour les appartements.** Il alimente :

- Formulaires publics (select appartement)
- API `/api/lead` et `/api/admin/leads/[id]` (validation)
- Dashboard admin `ApartmentSelect.tsx`
- Emails Resend (labels appartement)
- Export CSV
- Page `/hebergements`

### Les 6 appartements réels

| Appartement   | Étage | Prix      | Chambres | Capacité max | Groupe design     |
|---------------|-------|-----------|----------|--------------|-------------------|
| Appartement 1 | 2e    | 500 DH/nuit | 1      | 2 personnes  | **A — unique**    |
| Appartement 2 | 2e    | 650 DH/nuit | 2      | 4 personnes  | **B — 2/4/6**     |
| Appartement 3 | 3e    | 750 DH/nuit | 2      | 5 personnes  | **C — 3/5**       |
| Appartement 4 | 3e    | 650 DH/nuit | 2      | 4 personnes  | **B — 2/4/6**     |
| Appartement 5 | 4e    | 750 DH/nuit | 2      | 5 personnes  | **C — 3/5**       |
| Appartement 6 | 4e    | 650 DH/nuit | 2      | 4 personnes  | **B — 2/4/6**     |

### Groupes de ressemblance — règle audit photos

**Groupe A — Appartement 1** : unique visuellement, risque faible, audit simple.

**Groupe B — Appartements 2, 4, 6** : même design, très semblables. Risque élevé de mélange.

- Ne jamais attribuer une photo sur simple ressemblance générale
- Audit comparatif strict — règle du doute = exclusion
- Ordre de traitement sécurisé : 4 (fait) → 2 (fait) → 6 (à faire, comparé aux deux précédents)

**Groupe C — Appartements 3, 5** : identiques ou quasi identiques. Risque moyen à élevé.

- Même règle que groupe B
- Audit comparatif des deux lots en même temps

**Descriptions** : base commune pour les appartements d'un même groupe — précision visuelle ajoutée seulement si confirmée par les photos validées du lot spécifique.

### Stratégie éditoriale — groupes similaires

**Principe :** ne pas cacher la similarité de design, la présenter comme cohérence de standing.

**Galerie :** 5 à 7 photos fortes max par appartement — pas de galerie gonflée si les espaces se ressemblent trop. Ordre des photos différent entre unités du même groupe.

**Structure description :** base commune + variation courte sur le point distinctif réel.

#### Groupe B — Apt 2 / 4 / 6

Base commune : *"Appartement confortable avec espace salon, cuisine équipée et chambres adaptées à un séjour agréable à Dakhla."*

| Appartement | Point distinctif | Variation description |
|-------------|------------------|-----------------------|
| Apt-2 | 2e étage, grand lit double, salon lumineux | "Idéal pour un séjour en famille ou entre amis, avec une ambiance lumineuse et fonctionnelle." |
| Apt-4 | Lit king-size, salle de bain premium (vasque dorée) | "Avec une belle harmonie intérieure et une salle de bain particulièrement soignée." |
| Apt-6 | 4e étage, calme | "Pensé pour un séjour reposant, avec la même qualité de confort que les autres hébergements de la résidence." |

#### Groupe C — Apt 3 / 5

Base commune : *"Appartement spacieux 2 chambres pour 5 personnes. Salon, cuisine équipée, chambres généreusement configurées."*

| Appartement | Point distinctif | Variation description |
|-------------|------------------|-----------------------|
| Apt-3 | 3e étage, capacité familiale | "Idéal pour les grandes familles ou groupes, avec une bonne luminosité." |
| Apt-5 | 4e étage, même configuration | "Au 4e étage, même confort avec une belle hauteur." |

#### Mention optionnelle fiche détail (groupes B et C)

> *Appartement au design harmonisé avec les autres hébergements de la résidence, avec sa propre disposition et son ambiance.*

### IDs et exports

```ts
// IDs valides (nouveaux leads)
'apt-1' | 'apt-2' | 'apt-3' | 'apt-4' | 'apt-5' | 'apt-6'

// Legacy (anciens leads DB) — fallback géré dans getApartmentLabel()
'standard' | '2-chambres' | 'grande-capacite'
```

### Fonctions exportées

```ts
getApartmentLabel(id)    // "Appartement 1 (500 DH/nuit)" — utilisé emails, CSV, admin
getApartmentLabelEn(id)  // "Apartment 1 (500 MAD/night)" — réservé version EN future
APARTMENT_MAP            // Record<string, Apartment> — lookup rapide
VALID_APARTMENT_IDS      // apt-1..apt-6
ALL_VALID_APARTMENT_IDS  // apt-1..apt-6 + legacy — pour validation API
```

---

## 5. Nights UX Architecture

### Frontend (UX client)

Les formulaires publics (`LeadForm.tsx`, `ServiceContactForm.tsx`) collectent :

- **Arrivée** (`check_in`) — date picker
- **Nombre de nuitées** (`nights`) — input number, requis, min 1

### Backend / DB (stockage)

L'API et la DB stockent :

- `check_in` — date ISO YYYY-MM-DD
- `check_out` — date ISO YYYY-MM-DD (**calculé** = check_in + nights)

### Pourquoi cette séparation

Le frontend demande "combien de nuits" (UX naturelle pour l'utilisateur) mais le backend stocke `check_out` pour permettre :

```sql
-- Futures queries de disponibilité / overlap
SELECT * FROM leads
WHERE check_in < '2025-06-10'
  AND check_out > '2025-06-07'
  AND apartment_type = 'apt-3'
```

**`nights_count` n'est pas une colonne DB.** Le nombre de nuitées est toujours calculé dynamiquement depuis `check_in` et `check_out` :

```ts
const nights = Math.round(
  (new Date(check_out).getTime() - new Date(check_in).getTime()) / 86400000
)
```

Ce calcul est dupliqué dans : `email.ts`, `export/route.ts`, `DateRangePicker.tsx`.

---

## 6. Admin Dashboard Architecture

### Composants

| Composant             | Rôle                                                      | Save strategy      |
|-----------------------|-----------------------------------------------------------|--------------------|
| `AdminFilters.tsx`    | Filtres URL service/statut/search + debounce              | URL push           |
| `LeadRow.tsx`         | Ligne tableau + expansion + actions inline                | — (wrapper)        |
| `DecisionPanel.tsx`   | Boutons Accepter/Refuser + note + mode compact            | PATCH immédiat     |
| `StatusSelect.tsx`    | Dropdown 4 statuts opérationnels                          | PATCH immédiat     |
| `ApartmentSelect.tsx` | Select 6 appartements (accommodation only)                | PATCH immédiat     |
| `DateRangePicker.tsx` | Arrivée + Départ + nuitées calculées (accommodation only) | PATCH on blur      |
| `LeadNotes.tsx`       | Notes internes (non visibles client)                      | PATCH debounce 800ms |

### Modèle statut — deux axes séparés dans l'UI

**Suivi opérationnel** (colonne Statut, `StatusSelect`) :

```text
new → contacted → confirmed → cancelled
```

**Décision finale** (colonne Actions, `DecisionPanel`) :

```text
(non décidé) → accepted → (terminal, non réversible via UI)
             → rejected → (terminal, non réversible via UI)
```

Une fois `accepted` ou `rejected`, `StatusSelect` disparaît (remplacé par badge). La décision est terminale dans l'UI — une modification manuelle en DB est nécessaire pour revenir en arrière.

### DecisionPanel — deux modes

```tsx
// Mode compact — inline dans la table (sans note)
<DecisionPanel compact leadId={...} leadEmail={...} currentStatus={...} initialNote={null} />

// Mode complet — dans le panneau expandable (avec textarea note)
<DecisionPanel leadId={...} leadEmail={...} currentStatus={...} initialNote={lead.decision_note} />
```

Le mode compact envoie toujours `decision_note: null`. Pour ajouter une note, utiliser le panneau Détails.

### Export CSV — 15 colonnes

```text
Date · Nom · Téléphone · Email · Service · Message · Statut · Langue
· Appartement · Arrivée · Départ · Nuitées · Notes · Décision · Date décision
```

BOM UTF-8 inclus pour compatibilité Excel direct.

---

## 7. Database Schema

### Table `leads` — état complet post-migrations 001+002+003+004

| Colonne         | Type        | Nullable | Défaut             | Notes                              |
|-----------------|-------------|----------|--------------------|------------------------------------|
| `id`            | uuid        | non      | gen_random_uuid()  | PK                                 |
| `created_at`    | timestamptz | non      | now()              | Index leads_created_at_idx         |
| `name`          | text        | non      | —                  |                                    |
| `phone`         | text        | non      | —                  |                                    |
| `email`         | text        | oui      | null               | Requis côté form hébergement       |
| `service`       | text        | non      | —                  | CHECK accommodation/restaurant/cafe/car_rental |
| `message`       | text        | oui      | null               |                                    |
| `status`        | text        | non      | 'new'              | CHECK 6 valeurs (voir ci-dessous)  |
| `source`        | text        | non      | 'website'          | Hardcodé — extensible futur        |
| `language`      | text        | non      | 'fr'               | CHECK fr/en                        |
| `notes`         | text        | oui      | null               | Notes internes admin               |
| `check_in`      | date        | oui      | null               | Index leads_check_in_idx           |
| `check_out`     | date        | oui      | null               | Index leads_check_out_idx ; ≥ check_in |
| `apartment_type`| text        | oui      | null               | CHECK apt-1..apt-6 + legacy        |
| `decision_note`     | text        | oui      | null               | Note visible client (email)        |
| `decision_at`       | timestamptz | oui      | null               | Timestamp auto quand accepted/rejected |
| `email_status`      | text        | oui      | null               | Statut délivrabilité Resend : sent / delivered / bounced / complained / failed |
| `email_provider_id` | text        | oui      | null               | ID email Resend — clé de rattachement webhook |
| `email_status_at`   | timestamptz | oui      | null               | Timestamp du dernier événement email |

### Contraintes actives

```sql
-- Status (6 valeurs post-migration 003)
CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled', 'accepted', 'rejected'))

-- Email status (post-migration 005)
CHECK (email_status IS NULL OR email_status IN ('sent', 'delivered', 'bounced', 'complained', 'failed'))

-- Date range
CHECK (check_in IS NULL OR check_out IS NULL OR check_out >= check_in)

-- Apartment type (post-migration 004)
CHECK (apartment_type IS NULL OR apartment_type IN (
  'apt-1', 'apt-2', 'apt-3', 'apt-4', 'apt-5', 'apt-6',
  'standard', '2-chambres', 'grande-capacite'  -- legacy compat
))

-- Service
CHECK (service IN ('accommodation', 'restaurant', 'cafe', 'car_rental'))

-- Language
CHECK (language IN ('fr', 'en'))
```

### RLS

- `anon` : INSERT only (via policy `website_can_insert_leads`)
- `service_role` : ALL (bypass RLS pour routes admin serveur)
- Aucun SELECT public — les leads ne sont jamais lisibles sans service_role

---

## 8. Migrations History

| Migration            | Appliquée | Contenu                                                   |
|----------------------|-----------|-----------------------------------------------------------|
| `001_leads.sql`      | ✅ prod   | Table `leads` initiale — colonnes core + RLS + indexes    |
| `002_leads_v1.5.sql` | ✅ prod   | `notes`, `check_in`, `check_out`, `apartment_type` (legacy types) |
| `003_leads_v2.sql`   | ✅ prod   | `email`, `decision_at`, `decision_note` + statuts `accepted`/`rejected` |
| `004` (via MCP)      | ✅ prod   | Extend `apartment_type` CHECK : legacy + `apt-1..apt-6` (appliqué directement sur Supabase MCP, pas de fichier local) |
| `005_leads_email_tracking.sql` | ✅ prod   | `email_status`, `email_provider_id`, `email_status_at` + CHECK constraint |

**IMPORTANT :** La migration 004 n'a pas de fichier SQL local. Elle a été appliquée directement via le MCP Supabase. Si le schéma est resetté, reproduire manuellement :

```sql
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_apartment_type_check;
ALTER TABLE leads ADD CONSTRAINT leads_apartment_type_check
  CHECK (apartment_type IS NULL OR apartment_type IN (
    'apt-1', 'apt-2', 'apt-3', 'apt-4', 'apt-5', 'apt-6',
    'standard', '2-chambres', 'grande-capacite'
  ));
```

---

## 9. Environment Variables

| Variable                        | Requis | Statut Vercel | Rôle                                                    |
|---------------------------------|--------|---------------|----------------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | oui    | ✅ configuré  | Client + server Supabase — URL projet                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | oui    | ✅ configuré  | Client Supabase — INSERT public (anon, limité par RLS)   |
| `SUPABASE_SERVICE_ROLE_KEY`     | oui    | ✅ configuré  | Server-only — bypass RLS pour routes admin               |
| `ADMIN_SECRET`                  | oui    | ✅ configuré  | Mot de passe dashboard `/admin` (hashé en cookie)        |
| `RESEND_API_KEY`                | oui    | ✅ configuré  | SDK Resend — envoi emails admin + client                 |
| `RESEND_FROM_EMAIL`             | oui    | ✅ configuré  | Expéditeur — ex: `notifications@palmdordakhla.com`       |
| `RESEND_FROM_NAME`              | non    | ✅ configuré  | Nom affiché expéditeur — ex: `Palm d'Or Dakhla`         |
| `RESEND_WEBHOOK_SECRET`         | oui    | ✅ configuré  | Secret signature webhook Resend (`whsec_xxx`)           |
| `ADMIN_EMAIL`                   | oui    | ✅ configuré  | Destinataire notifications nouvelles demandes            |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | oui    | ✅ configuré  | Numéro international format `212XXXXXXXXX`               |
| `NEXT_PUBLIC_SITE_URL`          | non    | —             | URL canonique (OG, sitemap) — peut être hardcodé         |
| `NEXT_PUBLIC_GA_ID`             | non    | ⏳ en attente | Google Analytics 4 — conditonnel, no-op si absent        |
| `NEXT_PUBLIC_META_PIXEL_ID`     | non    | ⏳ en attente | Meta Pixel — conditionnel, no-op si absent               |

---

## 10. Critical Files

### Logique métier — ne pas modifier sans audit

```text
src/lib/apartments.ts          Source unique appartements (6 apts + legacy fallback)
src/lib/email.ts               Emails admin + client — Resend SDK v6 pattern Result
src/lib/services.ts            Types ServiceType + messages WhatsApp
src/lib/tracking.ts            Événements Meta Pixel + GA4
src/lib/supabase/server.ts     Client supabaseAdmin (service_role)
```

### API routes

```text
src/app/api/lead/route.ts                 POST — soumission formulaire public
src/app/api/admin/leads/[id]/route.ts     PATCH — modifications dashboard (runtime nodejs)
src/app/api/admin/export/route.ts         GET — CSV export
src/app/api/admin/auth/route.ts           POST — login dashboard
src/app/api/webhooks/resend/route.ts      POST — webhook Resend delivery events (runtime nodejs)
```

### Dashboard admin

```text
src/app/admin/page.tsx                    Server Component — liste leads + filtres
src/app/admin/components/LeadRow.tsx      Client — ligne table + expansion + inline actions
src/app/admin/components/DecisionPanel.tsx Client — accept/refuse (compact + full)
src/app/admin/components/StatusSelect.tsx  Client — statuts opérationnels
src/app/admin/components/ApartmentSelect.tsx Client — type appartement
src/app/admin/components/DateRangePicker.tsx Client — arrivée/départ + nuitées
src/app/admin/components/LeadNotes.tsx    Client — notes internes
src/app/admin/components/AdminFilters.tsx  Client — filtres URL
```

### Formulaires publics

```text
src/components/home/LeadForm.tsx           Formulaire homepage
src/components/service/ServiceContactForm.tsx  Formulaire pages service
```

### Migrations DB

```text
src/lib/supabase/migrations/001_leads.sql      Table initiale + RLS
src/lib/supabase/migrations/002_leads_v1.5.sql Notes + dates + appartement legacy
src/lib/supabase/migrations/003_leads_v2.sql   Email + décision + statuts accepted/rejected
```

### Infrastructure

```text
middleware.ts                  Edge Runtime — auth cookie admin_token
src/app/layout.tsx             Fonts + tracking global + metadata root
next.config.ts                 Config Next.js
```

---

## 11. Production Status

| Élément                       | État                                        |
|-------------------------------|---------------------------------------------|
| Vercel deployment             | ✅ READY — palmdordakhla.com                |
| Domaine principal             | ✅ <www.palmdordakhla.com>                  |
| Resend domaine                | ✅ palmdordakhla.com vérifié                |
| Supabase                      | ✅ ACTIVE_HEALTHY — eu-central-1            |
| Build TypeScript              | ✅ 0 erreurs                                |
| Pages générées                | ✅ 21/21                                    |
| SEO on-site                   | ✅ metadata, schemas, GBP, openingHours     |
| Formulaire public             | ✅ Lead → Supabase + email admin            |
| Dashboard admin               | ✅ Login + leads + accept/refuse            |
| Email décision client         | ✅ accept → email acceptation / refuse → email refus |
| Export CSV                    | ✅ 15 colonnes, BOM UTF-8                   |

---

## 12. Known Limitations

### Non implémenté actuellement

- ❌ **Disponibilités automatiques** — pas de calendrier, pas de blocage de dates
- ❌ **Double-booking protection** — deux demandes sur les mêmes dates/apt peuvent coexister
- ❌ **Annulation de décision** — une fois accepted/rejected, l'admin ne peut pas revenir en arrière via l'UI (nécessite modification directe en DB)
- ✅ **Webhook tracking opérationnel** — `RESEND_WEBHOOK_SECRET` configuré sur Vercel → badge `✓ Délivré` / `⚠ Bounce` actif
- ❌ **Inbox visibility non garantie** — un statut `Delivered` dans Resend confirme l'acceptation par le serveur destinataire, pas l'affichage en boîte principale (Outlook : spam, focused/other, archive, règles, filtrage fournisseur)
- ❌ **Tracking analytics actif** — Meta Pixel et GA4 sont câblés mais env vars non configurées
- ❌ **Version anglaise** — pages `/en` existent comme stubs, contenu non traduit
- ✅ **Photos apt-4** — 12 photos, galerie interactive (2026-05-18)
- ✅ **Photos apt-2** — 7 photos validées intégrées (2026-05-18), galerie interactive
- ✅ **Photos apt-3** — 5 photos validées intégrées (2026-05-19), cover salon gris + galerie
- ✅ **Photos apt-5** — 5 photos validées intégrées (2026-05-19), cover salon vert + galerie
- ✅ **Photos apt-1** — 4 photos validées intégrées (2026-05-19), cover chambre vue nocturne + galerie
- ✅ **Descriptions appartements** — `shortDescription` tous les 6 appartements (2026-05-19) — série complète
- ❌ **Dashboard mobile** — table horizontale avec scroll sur mobile, pas de vue cards
- ❌ **Paiements** — aucune intégration
- ❌ **Multi-utilisateur** — un seul compte admin
- ❌ **Sync Airbnb / OTA** — hors scope
- ❌ **Statistiques avancées** — pas de charts, pas de reporting mensuel

---

## 13. Recommended Next Priorities

### P1 — Acquisition locale (off-site, hors code)

- **Google Search Console** : ✅ sitemap soumis, indexation demandée pour 7 pages — en attente de recrawl (2–6 semaines)
- **Google Business Profile** : ✅ catégorie principale = Résidence hôtelière, catégories secondaires confirmées, GBP URL liée — en attente : validation nom "Palm d'Or Dakhla" + ajout photos
- **Photos GBP** : uploader 5 photos minimum (façade, salon, restaurant, café) — smartphone suffit
- **Photos appartements site** : Apt 4 ✅ intégré (2026-05-18) — att. photos apt 1/2/3/5/6 côté client

### P2 — Impact conversion côté code

- **Photos par appartement** : ✅ Apt-1/2/3/4/5/6 tous intégrés — série complète (2026-05-19)
- **UI premium hébergements** : galerie lightbox (P2+), équipements par appartement

### P3 — Dashboard mobile

- **LeadCard.tsx** : layout card pour mobile (`block md:hidden`, table reste pour desktop)
- Boutons WA / Accepter / Refuser visibles sur carte mobile sans scroll horizontal

### P4 — Disponibilités lecture seule

- Calendrier read-only par appartement (marquer dates réservées depuis leads accepted)
- Aucune intégration automatique requise — admin marque manuellement

### P5 — Version EN complète

- Traduction contenu toutes pages
- `language` dans formulaires (`fr`/`en` auto-détecté ou sélectionné)
- Emails Resend bilingues

### P6 — Analytics

- Configurer `NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel
- Tester événements `Lead`, `Contact`, page views

---

## 14. Do Not Touch

> Ces éléments sont en production et fonctionnels. Toute modification doit être précédée d'un audit complet.

| Élément                                   | Raison                                                     |
|-------------------------------------------|------------------------------------------------------------|
| `middleware.ts`                           | Auth admin Edge Runtime — toute modification peut créer un lockout |
| `/admin/login` + `/api/admin/auth`        | Auth sensible — stable                                     |
| `src/lib/apartments.ts`                   | Source unique — 8 fichiers dépendent de ce module           |
| Legacy apartment IDs dans `apartments.ts` | `standard / 2-chambres / grande-capacite` — anciens leads DB |
| `check_in` + `check_out` en DB            | Ne pas remplacer par `nights_count` — overlap queries futures |
| Workflow accept/refuse (`DecisionPanel`)   | En production, emails envoyés aux clients                  |
| `sendLeadDecisionEmail()` dans `email.ts` | Fire-and-forget — ne pas rendre synchrone                  |
| `export const runtime = 'nodejs'`         | Requis sur toutes routes Resend — Vercel Edge ne supporte pas le SDK |
| Schéma Supabase                           | Ne pas modifier sans migration SQL et test local           |
| `src/lib/services.ts`                     | Types ServiceType + messages WA — stable                   |
| `src/lib/tracking.ts`                     | Tracking Meta Pixel + GA4                                  |
| `src/app/layout.tsx`                      | Fonts + tracking global + metadata root                    |

---

## 31. Security hardening (phase 2) — Rate limiting /api/lead — 2026-05-21

**Correctif appliqué :**

- `src/app/api/lead/route.ts` : rate limiting in-memory par IP
  - 5 requêtes max par fenêtre de 10 minutes par IP
  - IP extraite depuis `x-forwarded-for` (standard Vercel)
  - Réponse 429 + header `Retry-After` si limite atteinte
  - Purge automatique des entrées expirées quand `Map.size > 500`
  - Zéro nouvelle dépendance — solution adaptée au faible volume actuel

**Comportement :**

- Un vrai visiteur (1–2 soumissions) : jamais bloqué
- Un bot burst (dizaines de req/min depuis une IP) : bloqué dès la 6e requête
- Après 10 minutes : compteur réinitialisé automatiquement
- Message d'erreur en français affiché dans le formulaire

**Limite connue :** le store est in-memory, il se réinitialise sur cold start Vercel et ne partage pas l'état entre instances parallèles. Acceptable à ce volume. Si trafic > 1 000 soumissions/mois, envisager Vercel KV ou Upstash.

**Build :** ✓ 0 erreurs TypeScript — 28 routes

---

## 30. Security hardening (phase 1) — 2026-05-21

**Correctifs appliqués (audit sécurité post-lancement) :**

- `next.config.ts` : ajout de 3 headers HTTP globaux sur toutes les routes :
  - `X-Frame-Options: DENY` (protection clickjacking)
  - `X-Content-Type-Options: nosniff` (protection MIME sniffing)
  - `Referrer-Policy: strict-origin-when-cross-origin`
- `src/app/api/lead/route.ts` : limite `message` à 2000 caractères max (400 si dépassé)

**Non traités dans cette phase (pour phase 2) :**

- Rate limiting `/api/lead` (priorité avant montée en charge)
- Cookie admin = secret brut → token aléatoire
- CSV formula injection dans export
- Route logout admin
- Vérification RLS Supabase (à vérifier manuellement dans le dashboard)

**Build :** ✓ 0 erreurs TypeScript — 28 routes

---

## 29. Changement opérationnel — dépôt GitHub temporaire — 2026-05-21

**Contexte :**

Blocage du push GitHub sur le compte initial `HamzaSeidous` : aucun email vérifié sur le compte, malgré plusieurs tentatives. GitHub bloque toute opération d'écriture dans ce cas, indépendamment de l'authentification CLI (`gh auth login`).

**Contournement appliqué :**

Le projet a été poussé sur un compte GitHub vérifié de secours :

- Compte : `Hamza92sy`
- Repo actif : `https://github.com/Hamza92sy/palm-dor-dakhla`
- Vercel est connecté à ce repo pour le déploiement automatique

**À faire quand `HamzaSeidous` est débloqué :**

1. Vérifier l'email sur `HamzaSeidous` (GitHub Settings → Emails)
2. Transférer le repo vers `HamzaSeidous` (GitHub Settings → Danger Zone → Transfer)
3. Mettre à jour le remote local : `git remote set-url origin https://github.com/HamzaSeidous/palm-dor-dakhla.git`
4. Reconnecter Vercel au nouveau repo si nécessaire
5. Supprimer l'ancienne note `⚠` dans l'en-tête de ce fichier

**Ce que ce changement n'est PAS :**

- Pas un changement de code applicatif
- Pas un changement d'architecture
- Pas un changement de configuration Vercel (env vars inchangées)

---

## 28. Favicon haute qualité — mark centré, fond vert foncé — 2026-05-21

**Problème identifié :**

- `icon.png` (§27) : crop 237×237 depuis transparent PNG basse résolution → upscale 3× → flou, peu lisible
- Les palms dans le mark circulaire sont à gauche du centre du crop → favicon déséquilibré

**Pipeline final :**

- Crop 500×800+206+80 depuis `palm-dor-logo.png` 1491×1055 (source haute résolution)
- Palm trunk 1 : x≈143, Palm trunk 2 : x≈358 — centre des palms = x=250.5 (≈ centre crop 500px)
- Crop Center 500×550 pour centrer verticalement (inclut fronds + troncs)
- Flood-fill fond crème → transparent (fuzz 8% depuis 4 coins)
- Remplacement couleurs opaques → cream #F8F5EC (silhouette unifiée)
- Composite sur cercle 512×512 dark green #1C3A28
- Arc or #B8922E (strokewidth 12, arc -82° → 22°)
- Scale DOWN (aucun upscale) → rendu net

**Fait :**

- `src/app/icon.png` : régénéré — 512×512, 72K, fond vert foncé, palms cream centrés
- `src/app/favicon.ico` : régénéré — 16/32/48/256px depuis icon.png
- `src/app/apple-icon.png` : régénéré — 180×180 depuis icon.png

**Build :** ✓ 0 erreurs TypeScript — 28 routes

---

## 27. Favicon dérivé du logo officiel — 2026-05-21

**Problème identifié :**

- `icon.svg` était une composition **dessinée à la main** (cercle vert + palms cream), visuellement différente du logo officiel PNG navbar
- Source master du favicon ≠ source master de la navbar = branding incohérent

**Analyse du logo officiel (`palm-dor-logo-transparent.png` 400×283) :**

- Bounding box contenu : (64, 20), taille 276×237
- Mark circulaire : x=78–250, y=28–252 (172×224px)
- Gap transparent à x=252–265 entre le mark et le texte "PALM D'OR" / "DAKHLA"
- Interior partiellement transparent (flood-fill antérieur depuis les coins)

**Fait :**

- Mark circulaire extrait : crop 237×237 depuis (40, 20) → 512×512 via Lanczos
- `src/app/icon.svg` : supprimé (source hand-crafted)
- `src/app/icon.png` : nouveau — 512×512 depuis le mark officiel (197K)
- `src/app/favicon.ico` : régénéré depuis `icon.png` (16/32/48/256px, 89K)
- `src/app/apple-icon.png` : régénéré depuis `icon.png` (180×180, 44K)
- Navbar (`palm-dor-logo-transparent.png`) : inchangée
- Route `/icon.svg` remplacée par `/icon.png` dans le build

**Build :** ✓ 0 erreurs TypeScript — 28 routes

---

## 26. Favicon centré + PROGRESS.md markdownlint — 2026-05-21

**Problèmes identifiés :**

- `icon.svg` : palms positionnés dans la moitié gauche du cercle (héritage logo-light.svg avec texte à droite) → favicon décentré
- `favicon.ico` + `apple-icon.png` : générés depuis le SVG décentré → incohérents
- `PROGRESS.md` : warnings markdownlint actifs (MD040 code sans langage, MD032 listes sans ligne vide, MD034 URLs nues)

**Fait :**

- `src/app/icon.svg` : palms centrés via `transform="translate(35, -10)"` sur le groupe palmiers+dune — composition horizontalement centrée dans le cercle vert
- `src/app/favicon.ico` : régénéré depuis `icon.svg` corrigé (16/32/48/256px)
- `src/app/apple-icon.png` : régénéré depuis `icon.svg` corrigé (180×180)
- `PROGRESS.md` : MD040 (code language), MD032 (blanks around lists), MD034 (bare URLs), MD031 (blanks around fences) — tous corrigés dans le fichier
- `.markdownlint.json` : créé pour désactiver MD013 (line-length, impraticable sur tables/code) et MD060 (table alignment, impraticable sur tables à cellules longues)

**Build :** ✓ 0 erreurs TypeScript — 28 routes

---

## 25. Correction branding — fond transparent + favicon cohérent — 2026-05-21

**Problème identifié :**

- `palm-dor-logo.png` était en mode RGB (pas RGBA) → fond crème opaque visible dans la navbar = halo rectangle
- `favicon.ico` était le Next.js par défaut (triangle Vercel)
- `apple-icon.png` absent (iOS home screen sans icône branding)

**Fait :**

- `public/assets/branding/palm-dor-logo-transparent.png` : fond supprimé par flood-fill ImageMagick (fuzz 8%) depuis les 4 coins → mode TrueColorAlpha, redimensionné 400×283, 69K
- `src/components/layout/Navbar.tsx` : logo src → `palm-dor-logo-transparent.png`
- `src/app/favicon.ico` : remplacé le Vercel default par favicon Palm d'Or multi-taille (16/32/48/256px) générés depuis `icon.svg`
- `src/app/apple-icon.png` : nouveau — 180×180px depuis `icon.svg` (Next.js l'expose automatiquement en `/apple-icon.png`)

**Build :** ✓ 0 erreurs TypeScript — 28 routes (27 + `/apple-icon.png`)

---

## 24. Branding officiel — favicon + logo navbar — 2026-05-21

**Fait :**

- `src/app/icon.svg` : remplacé le cercle vert + "P" doré par le mark palm tree complet (viewBox 400×400, fond #1C3A28, troncs+frondes cream #F8F5EC, cercle arc doré) — favicon désormais identique au mark circulaire du logo officiel
- `src/components/layout/Navbar.tsx` : remplacé logo-light.svg + texte HTML par PNG officiel `palm-dor-logo.png` (`h-12 md:h-14 w-auto`) — logo officiel remplace le logotype reconstruit
- `public/assets/branding/palm-dor-logo.png` : copié depuis `~/Desktop/LogoPalm.png` (1491×1055 PNG, mark circulaire + "Palm D'Or" + "DAKHLA")
- Footer et logo-dark.svg inchangés (fond sombre incompatible avec PNG fond crème)

**Build :** ✓ 0 erreurs TypeScript — 27 routes

---

## 23. Bugfixes pré-déploiement — 2026-05-20

**Fait :**

- `src/lib/apartments.ts` apt-2 : `coverImage` rétabli à `apt-2-chambre-vue-mer.jpg` (chambre principale vue Dakhla — différenciateur validé PROGRESS.md §18+§20) — `apt-2-vue-ensemble.jpg` replacé en 4e position galerie
- `src/lib/services.ts` : message WA `accommodation` purgé des noms legacy ("Standard", "2 chambres", "grande capacité") → remplacé par "de 500 à 750 DH/nuit"

**Build :** ✓ 0 erreurs TypeScript — 27 routes

---

## 22. Photos apt-1 + description — 2026-05-19 — Série complète

**Fait :**

- Audit visuel des 10 photos `Desktop/palmdor_appart1`
- 2 doublons certifiés exclus par MD5 : `IMG_0128.jpg` (cuisine apt-3/5) + `IMG_6597 - Copie (2).jpg` (SDB apt-3/5)
- 3 photos supplémentaires écartées : `37CD5629.jpg` (détail recadré 134KB), `de (91) - Copie.jpg` (3e angle salon redondant), `image00079 - Copie.jpeg` (SDB trop similaire visuellement apt-3/5, doute = exclusion)
- 4 photos retenues et copiées dans `public/assets/photos-client/apartments/apt-1/` avec noms sémantiques
- `apartments.ts` apt-1 : `coverImage` → `apt-1-chambre-vue-nuit.jpg` (chambre grand lit, vue nocturne Dakhla — image premium) + `gallery` 3 photos + `shortDescription`
- **Série photos appartements complète** : apt-1/2/3/4/5/6 tous intégrés

**État groupe A (apt-1) après V3.0 :**

| Apt | Cover | Différenciateur | Galerie |
|---|---|---|---|
| 1 | chambre vue nocturne Dakhla | canapé doré, vue nuit, 1 chambre | salon · cuisine · salle de bain |

**Photos écartées apt-1 (raison) :**

- `IMG_0128.jpg` — cuisine apt-3/5 (MD5 identique confirmé)
- `IMG_6597 - Copie (2).jpg` — SDB apt-3/5 (MD5 identique confirmé)
- `37CD5629.jpg` — détail coiffeuse recadré, trop partiel, 134KB
- `de (91) - Copie.jpg` — 3e angle du même salon, redondant avec de(79)
- `image00079 - Copie.jpeg` — SDB rideau rose / carrelage gris, visuellement trop proche apt-3/5

**État :** Build ✓ 0 erreurs TypeScript — 27 routes

---

## 21. Photos apt-3 et apt-5 + descriptions — 2026-05-19

**Fait :**

- Audit comparatif simultané des 8 photos `Desktop/palmdor_appart3` et 9 photos `Desktop/palmdor_appart5`
- Analyse MD5 : 6 fichiers identiques entre les deux lots (IMG_0100/0128/0586/6597/9798/9862)
- 2 photos uniques apt-3 (IMG_0036 salon gris, IMG_0214 chambre turquoise)
- 3 photos uniques apt-5 (97F6E1FD salon vert, IMG_9585 chambre turquoise, de(1) chambre verte)
- Exclusions : IMG_0100 + IMG_0128 (redondants cuisine), IMG_0586 (vasque dorée — confusion apt-4), de(1)-Copie (doublonne IMG_9585)
- 5 photos copiées dans `public/assets/photos-client/apartments/apt-3/` avec noms sémantiques
- 5 photos copiées dans `public/assets/photos-client/apartments/apt-5/` avec noms sémantiques
- `apartments.ts` apt-3 : `coverImage` → `apt-3-salon.jpg` (canapé gris, mur décor feuilles) + `gallery` 4 photos + `shortDescription`
- `apartments.ts` apt-5 : `coverImage` → `apt-5-salon.jpg` (canapé vert émeraude, différenciateur clé) + `gallery` 4 photos + `shortDescription`

**Différenciateur groupe C après V2.9 :**

| Apt | Cover | Différenciateur visuel | Étage |
|---|---|---|---|
| 3 | salon canapé gris + décor mural | canapé gris, feuilles dorées | 3e |
| 5 | salon canapé vert émeraude | canapé vert, table basse dorée | 4e |

**Photos écartées apt-3/5 (raison) :**

- `IMG_0100` + `IMG_0128` — cuisine sous deux angles redondants avec `IMG_9862`
- `IMG_0586` — vasque dorée déjà utilisée comme différenciateur apt-4, doute = exclusion
- `de (1) - Copie.jpg` — chambre similaire à `IMG_9585`, redondante

**État :** Build ✓ 0 erreurs TypeScript — 27 routes

---

## 20. Galerie groupe B rationalisée — 2026-05-18

**Fait :**

- `ApartmentGallery.tsx` : suppression de `key={active.src}` sur l'image principale — React met à jour `src` en place sans remount DOM → transition fluide au clic sans flash
- `ApartmentGallery.tsx` : grille miniatures passe de `grid-cols-6` fixe à `grid-cols-4/5/6` calculé selon le nombre réel de photos — plus de colonnes vides
- `apartments.ts` apt-2 : gallery réduite de 6 à 4 photos (suppression salon-2 et salon-3 redondants)
- `apartments.ts` apt-4 : gallery réduite de 11 à 4 photos — sélection : salon, chambre-1 (king), salle-de-bain-vasque (différenciateur clé), cuisine
- `apartments.ts` apt-6 : inchangé (déjà 3 photos gallery, cohérent)

**État groupe B après V2.8 :**

| Apt | Cover | Gallery | Total | Différenciateur |
|---|---|---|---|---|
| 2 | chambre vue mer | salon · salle à manger · chambre 2 · vue ensemble | 5 | canapé beige, 2e étage |
| 4 | chambre king nuit | salon · chambre king · vasque dorée · cuisine | 5 | vasque dorée, vue nocturne |
| 6 | salon canapé blanc | vue dakhla · chambre 1 · salle à manger | 4 | canapé blanc, 4e étage |

**État :** Build ✓ 0 erreurs TypeScript — 27 routes

---

## 19. Photos apt-6 + description — 2026-05-18

**Fait :**

- Audit visuel des 13 photos `Desktop/palmdor_appart6` — 9 écartées (6 doublons apt-2 canapé beige, 2 hors-sujet réception/restaurant, 1 chambre indiscernable apt-4)
- 4 photos retenues et copiées dans `public/assets/photos-client/apartments/apt-6/` avec noms sémantiques
- `apartments.ts` apt-6 : `coverImage` → `apt-6-salon.jpg` (canapé blanc, différenciateur visuel clé vs apt-2 beige et apt-4 jaune) + `gallery` → 3 photos (vue-dakhla, chambre-1, salle-a-manger)
- `shortDescription` : "Deux chambres au 4e étage pour 4 personnes. Lit king-size, cuisine équipée, salon avec vue sur la ville."

**Photos écartées apt-6 (raison) :**

- `IMG_0095.jpg`, `IMG_0063.jpg`, `IMG_0066.jpg`, `IMG_0082.jpg`, `IMG_0086.jpg`, `IMG_9572.jpg` — canapé beige / espace identique à apt-2
- `IMG_9864.jpg` — chambre 2 lits indiscernable de apt-4
- `IMG_0003.jpg` — hall d'entrée / réception (hors-sujet)
- `IMG_0010.jpg` — salle de restaurant (hors-sujet)

**Différenciateur apt-6 vs groupe B :**

- Apt-2 (2e étage) : canapé beige → cover chambre vue mer
- Apt-4 (3e étage) : canapé jaune → cover chambre king nuit
- Apt-6 (4e étage) : canapé blanc → cover salon + vue panoramique

**État :** Build ✓ 0 erreurs TypeScript — 27 routes

---

## 18. Photos apt-2 + descriptions appartements — 2026-05-18

**Fait :**

- Audit visuel des 13 photos `Desktop/palmdor_appart2` — 6 écartées (3 doublons exacts avec apt-4, 2 duplicates internes, 1 salle de bain ambiguë)
- 7 photos retenues et copiées dans `public/assets/photos-client/apartments/apt-2/` avec noms sémantiques
- `apartments.ts` apt-2 : `coverImage` → `apt-2-chambre-vue-mer.jpg` + `gallery` → 6 photos (salon ×3, vue ensemble, salle à manger, chambre 2 lits)
- Nouveau champ `shortDescription?: string` ajouté à l'interface `Apartment`
- `shortDescription` renseignée pour apt-2 et apt-4 (factuelle, basée sur données confirmées)
- Listing `/hebergements` : affichage conditionnel de `shortDescription` entre la composition et les espaces communs
- Page détail `/hebergements/[aptId]` : affichage de `shortDescription` dans la fiche, après nom/prix

**Photos écartées apt-2 (raison) :**

- `IMG_0487.jpg` + `IMG_0487 - Copie.jpg` — chambre 2 lits identique à `apt-4-chambre-2.jpg`
- `IMG_0214.jpg` — chambre double indiscernable de `apt-4-chambre-1.jpg`
- `image00079 - Copie.jpeg` — douche avec même rideau que `apt-4-salle-de-bain-douche.jpg`
- `IMG_0044 - Copie.jpg` — doublon de `IMG_0044.jpg`
- `IMG_0044.jpg` — redondant avec les 3 autres photos salon déjà retenues

**État :** Build ✓ 0 erreurs TypeScript — 27 routes

---

## 17. Galerie photos apt-4 complète — 2026-05-18

**Fait :**

- 12 photos validées copiées depuis `Desktop/palmdor_appart4` vers `public/assets/photos-client/apartments/apt-4/` avec noms sémantiques
- `apartments.ts` apt-4 : `coverImage` → `apt-4-chambre-vue-nuit.jpg` (chambre king, vue nocturne Dakhla) + `gallery` → 11 photos (salon ×2, salle à manger ×2, cuisine ×2, chambre king ×2, chambre 2 lits, salle de bain ×2)
- Nouveau composant `src/components/hebergements/ApartmentGallery.tsx` (Client Component) : grande image principale + 12 miniatures cliquables — clic miniature change l'image principale — badge compteur (X/12)
- Page `/hebergements/[apartmentId]` : remplace l'ancien grid 3 colonnes statique par `<ApartmentGallery>` interactive
- `/hebergements` listing non modifié — reste léger
- CTA "Réserver cet appartement" préservé (hero + fiche)

**État :**

- Build : ✓ 0 erreurs TypeScript — 27 routes
- Apt 1/2/3/5/6 : en attente photos client (architecture `coverImage`/`gallery` déjà en place)

---

## 16. SEO Sprint — 2026-05-16

**Fait :**

- Mode maintenance retiré de toutes les pages publiques (Sprints successifs)
- `robots.ts` : `disallow: ['/admin', '/api/']` ajouté
- `sitemap.ts` : priorités corrigées (hébergements 0.9 > restaurant 0.8 > café 0.75 > ...), `lastModified` dynamique
- `layout.tsx` + tous les titres/descriptions : repositionnement hébergement-first
- `Hero.tsx` : H1 sémantique = "Appartements meublés & séjour complet à Dakhla" (marque en `<p>`)
- `ExperienceSection.tsx` : Hébergements en 1re position (était Restaurant-first)
- `galerie/page.tsx` : bande "Découvrez nos services" avec 4 liens de conversion
- `AccommodationSection.tsx` : CTA primaire → `/hebergements`, WhatsApp secondaire
- `Footer.tsx` : description et navigation hébergement-first
- `schemas.ts` + `layout.tsx` : `aggregateRating` (5★ / 180 avis), `openingHours` (lodging 24h/24, resto + café Mo-Su 08:00-23:30)
- `config.ts` : `GOOGLE_BUSINESS_URL = 'https://maps.app.goo.gl/TxngU7XTec4SD2zX9'` → `sameAs` + `hasMap` actifs dans tous les schemas

**État SEO on-site :**

- Schemas valides : `LodgingBusiness`, `Restaurant`, `CafeOrCoffeeShop`, `AutoRental`, `FAQPage` × 5, `aggregateRating`, `openingHours`
- Liaison GBP active via `sameAs` et `hasMap`
- Aucune valeur inventée

**Dépendances off-site restantes :**

- GSC : ✅ sitemap soumis, indexation demandée pour 7 pages — en attente recrawl Google (2–6 semaines)
- GBP : ✅ catégorie principale = Résidence hôtelière, catégories secondaires ok, GBP URL liée au site — en attente : validation nom court "Palm d'Or Dakhla" (appel en cours) + photos à uploader
- Photos appartements (GBP + site) : mapping `apt-1..apt-6` → fichier photo à fournir par le client
- `openingHours` café : à re-vérifier si les heures diffèrent du restaurant en pratique

---

## 15. Current Data Flow (complet V2.3)

```text
CLIENT
  └── LeadForm.tsx / ServiceContactForm.tsx
        ├── accommodation: email* + apartmentType + checkIn + nights
        ├── autres services: name + phone + message
        └── POST /api/lead
              ├── Validation stricte (email requis si accommodation, dates, apt IDs)
              ├── check_out = addDays(check_in, nights)
              ├── INSERT leads (Supabase anon key + RLS INSERT policy)
              ├── sendLeadNotification() → RESEND (fire-and-forget, .catch logged)
              └── { success: true, whatsappUrl }
                    └── UI: success state + WA optionnel

ADMIN
  └── /admin (middleware vérifie cookie admin_token)
        ├── supabaseAdmin.from('leads').select('*') — service_role bypass RLS
        ├── Table 8 colonnes — email + apt + séjour visibles sans expansion
        ├── Actions inline accommodation : [✓ Accepter] [✗ Refuser] direct
        │
        ├── PATCH /api/admin/leads/:id
        │     ├── status update → déclenche decision_at auto si accepted/rejected
        │     ├── notes / decision_note / check_in / check_out / apartment_type
        │     ├── DB update (supabaseAdmin)
        │     └── si accepted/rejected : sendLeadDecisionEmail() (fire-and-forget)
        │           ├── lead.email présent → email client envoyé
        │           └── lead.email absent → log warning, pas d'exception
        │
        └── GET /api/admin/export → CSV 15 colonnes (BOM UTF-8)

EMAIL CLIENT (Resend)
  ├── Acceptation : "Votre réservation Palm d'Or Dakhla — Confirmée ✓"
  │     └── inclut : appartement + check_in + nuitées + check_out + note admin
  └── Refus : "Votre demande Palm d'Or Dakhla"
        └── inclut : service + note admin (si présente) + CTA WhatsApp
```
