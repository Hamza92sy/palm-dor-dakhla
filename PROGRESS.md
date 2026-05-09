# Palm d'Or Dakhla — Project Progress & Technical Reference

> **Version :** V2.3 — Request-Based Booking Management System
> **Dernière mise à jour :** 2026-05-09
> **Build :** ✓ Clean — 0 erreurs TypeScript — 20 pages

---

## 1. Project Overview

**Palm d'Or Dakhla** est une résidence multi-services à Dakhla, Maroc.
Services : hébergement (6 appartements), restaurant, café, location de voitures.

### Objectif business

Convertir les visiteurs Google en réservations confirmées via un workflow structuré :

```
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
| URL production  | https://palmdordakhla.com                         |

---

## 2. Current Production Features

### ✅ Site public

- [x] Homepage 7 sections (Hero, Services, Hébergements, Expérience, Galerie, Témoignages, CTA)
- [x] Pages service : `/hebergements`, `/restaurant`, `/cafe`, `/location-voiture`
- [x] Page galerie `/galerie`
- [x] Page contact `/contact` avec Google Maps
- [x] Formulaire lead structuré (homepage + chaque page service)
- [x] Formulaire hébergement : email obligatoire + arrivée + nuitées
- [x] Appartements groupés par étage sur `/hebergements` (2e/3e/4e)
- [x] Pages bilingues `/fr` et `/en` (EN = stub, non traduit)
- [x] Sitemap XML + robots.txt
- [x] Structured data (FAQ schema)
- [x] Meta Pixel + GA4 (structure prête, conditionnels sur env vars)
- [x] WhatsApp secondaire (bouton flottant + success state)
- [x] Design system : `palm-cream / palm-blue / palm-gold`, Cormorant Garamond + Geist

### ✅ Système de réservation (public)

- [x] Formulaire `service=accommodation` : email requis, type appartement, arrivée, nuitées
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
- [x] Graceful no-op si env vars Resend absentes (logs warning, pas d'exception)
- [x] `export const runtime = 'nodejs'` sur toutes les routes utilisant Resend
- [x] Domaine `palmdordakhla.com` vérifié sur Resend
- [x] FROM : `notifications@palmdordakhla.com`

---

## 3. Reservation Workflow

```
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

| Appartement   | Étage | Prix      | Chambres | Capacité max |
|---------------|-------|-----------|----------|--------------|
| Appartement 1 | 2e    | 500 DH/nuit | 1      | 2 personnes  |
| Appartement 2 | 2e    | 650 DH/nuit | 2      | 4 personnes  |
| Appartement 3 | 3e    | 750 DH/nuit | 2      | 5 personnes  |
| Appartement 4 | 3e    | 650 DH/nuit | 2      | 4 personnes  |
| Appartement 5 | 4e    | 750 DH/nuit | 2      | 5 personnes  |
| Appartement 6 | 4e    | 650 DH/nuit | 2      | 4 personnes  |

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
```
new → contacted → confirmed → cancelled
```

**Décision finale** (colonne Actions, `DecisionPanel`) :
```
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

```
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
| `decision_note` | text        | oui      | null               | Note visible client (email)        |
| `decision_at`   | timestamptz | oui      | null               | Timestamp auto quand accepted/rejected |

### Contraintes actives

```sql
-- Status (6 valeurs post-migration 003)
CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled', 'accepted', 'rejected'))

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
| `ADMIN_EMAIL`                   | oui    | ✅ configuré  | Destinataire notifications nouvelles demandes            |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | oui    | ✅ configuré  | Numéro international format `212XXXXXXXXX`               |
| `NEXT_PUBLIC_SITE_URL`          | non    | —             | URL canonique (OG, sitemap) — peut être hardcodé         |
| `NEXT_PUBLIC_GA_ID`             | non    | ⏳ en attente | Google Analytics 4 — conditonnel, no-op si absent        |
| `NEXT_PUBLIC_META_PIXEL_ID`     | non    | ⏳ en attente | Meta Pixel — conditionnel, no-op si absent               |

---

## 10. Critical Files

### Logique métier — ne pas modifier sans audit

```
src/lib/apartments.ts          Source unique appartements (6 apts + legacy fallback)
src/lib/email.ts               Emails admin + client — Resend SDK v6 pattern Result
src/lib/services.ts            Types ServiceType + messages WhatsApp
src/lib/tracking.ts            Événements Meta Pixel + GA4
src/lib/supabase/server.ts     Client supabaseAdmin (service_role)
```

### API routes

```
src/app/api/lead/route.ts                 POST — soumission formulaire public
src/app/api/admin/leads/[id]/route.ts     PATCH — modifications dashboard (runtime nodejs)
src/app/api/admin/export/route.ts         GET — CSV export
src/app/api/admin/auth/route.ts           POST — login dashboard
```

### Dashboard admin

```
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

```
src/components/home/LeadForm.tsx           Formulaire homepage
src/components/service/ServiceContactForm.tsx  Formulaire pages service
```

### Migrations DB

```
src/lib/supabase/migrations/001_leads.sql      Table initiale + RLS
src/lib/supabase/migrations/002_leads_v1.5.sql Notes + dates + appartement legacy
src/lib/supabase/migrations/003_leads_v2.sql   Email + décision + statuts accepted/rejected
```

### Infrastructure

```
middleware.ts                  Edge Runtime — auth cookie admin_token
src/app/layout.tsx             Fonts + tracking global + metadata root
next.config.ts                 Config Next.js
```

---

## 11. Production Status

| Élément                       | État                                        |
|-------------------------------|---------------------------------------------|
| Vercel deployment             | ✅ READY — palmdordakhla.com                |
| Domaine principal             | ✅ www.palmdordakhla.com                    |
| Resend domaine                | ✅ palmdordakhla.com vérifié                |
| Supabase                      | ✅ ACTIVE_HEALTHY — eu-central-1            |
| Build TypeScript              | ✅ 0 erreurs                                |
| Pages générées                | ✅ 20/20                                    |
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
- ❌ **Tracking analytics actif** — Meta Pixel et GA4 sont câblés mais env vars non configurées
- ❌ **Version anglaise** — pages `/en` existent comme stubs, contenu non traduit
- ❌ **Photos appartements** — pages hébergements sans photos individuelles par apt
- ❌ **Dashboard mobile** — table horizontale avec scroll sur mobile, pas de vue cards
- ❌ **Paiements** — aucune intégration
- ❌ **Multi-utilisateur** — un seul compte admin
- ❌ **Sync Airbnb / OTA** — hors scope
- ❌ **Statistiques avancées** — pas de charts, pas de reporting mensuel

---

## 13. Recommended Next Priorities

### P1 — Impact conversion immédiat

- **Photos appartements** : ajouter photos individuelles sur `/hebergements` (1 photo par apt minimum)
- **UI premium hébergements** : galerie lightbox, capacité, équipements par appartement

### P2 — Dashboard mobile

- **LeadCard.tsx** : layout card pour mobile (`block md:hidden`, table reste pour desktop)
- Boutons WA / Accepter / Refuser visibles sur carte mobile sans scroll horizontal

### P3 — Disponibilités lecture seule

- Calendrier read-only par appartement (marquer dates réservées depuis leads accepted)
- Aucune intégration automatique requise — admin marque manuellement

### P4 — Version EN complète

- Traduction contenu toutes pages
- `language` dans formulaires (`fr`/`en` auto-détecté ou sélectionné)
- Emails Resend bilingues

### P5 — Analytics

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
