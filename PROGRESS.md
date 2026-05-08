# Palm d'Or Dakhla — Project Progress

## Current Production State

| Élément            | Valeur                                                    |
|--------------------|-----------------------------------------------------------|
| Framework          | Next.js 16.2.3 (App Router, Turbopack)                   |
| Language           | TypeScript strict                                         |
| Style              | Tailwind CSS 4                                            |
| BDD                | Supabase PostgreSQL 17 (région eu-central-1)              |
| Déploiement        | Vercel                                                    |
| URL production     | https://palmdordakhla.com                                 |
| Statut général     | Live, opérationnel, build 0 erreurs (20 pages)           |

### Fonctionnalités publiques actives
- Site vitrine 7 sections homepage
- Pages service : `/hebergements`, `/restaurant`, `/cafe`, `/location-voiture`
- Galerie photo `/galerie`
- Contact `/contact` avec carte Google Maps
- Formulaire lead → WhatsApp (sur homepage, /contact, et chaque page service)
- Pages bilingues `/fr` et `/en` (stubs — EN non encore implémenté)
- Sitemap XML + robots.txt
- Structured data (FAQ schema)
- Meta Pixel + GA4 (structure prête, envoi conditionnel si env vars présentes)

### Fonctionnalités admin actives (`/admin`)
- Login par mot de passe (cookie HttpOnly, 7 jours)
- Liste des leads avec filtres (service, statut, recherche nom/téléphone)
- Mise à jour statut (Nouveau / Contacté / Confirmé / Annulé)
- Notes internes par lead (auto-save 800ms)
- Dates check-in / check-out par lead (blur-save, accommodation only)
- Type d'appartement par lead (immediate-save, accommodation only)
- Lien WhatsApp direct par lead
- Export CSV enrichi (11 colonnes avec BOM UTF-8)
- Déconnexion (Server Action)

### Supabase
- Projet ID : `mkpiriemezuzqkcupdqs` — région eu-central-1 — ACTIVE_HEALTHY
- Table `leads` active avec RLS (anon INSERT only, service_role ALL)
- Migrations 001 + 002 appliquées

### Tracking
- Meta Pixel : structure prête, déclenché si `NEXT_PUBLIC_META_PIXEL_ID` présent
- GA4 : structure prête, déclenché si `NEXT_PUBLIC_GA_ID` présent
- Événements implémentés : `Lead`, `Contact`, page views

---

## Completed Work

### Phase 1 — Site vitrine public
- Homepage 7 sections (Hero, Services, Hébergement, Expérience, Galerie, Témoignages, CTA)
- Pages service individuelles
- Formulaire lead → Supabase → WhatsApp
- SEO (metadata, OG, Twitter cards, sitemap, robots, structured data)
- Design system palm-cream / palm-blue / palm-gold (Cormorant Garamond + Geist)
- Mobile-first, Tailwind CSS 4

### Phase 2 — Corrections P2
- Footer duplicate text corrigé
- Contact page anchor link `/contact#reservation` corrigé
- `docs/services.md` : appartement count 5 → 6

### Phase 3 — Dashboard admin V1
- Route protégée `/admin` (middleware Edge Runtime)
- Login `/admin/login` + API `/api/admin/auth` (cookie HttpOnly)
- Tableau leads avec filtres URL (service, statut, recherche)
- StatusSelect component (PATCH partiel, badges colorés)
- WhatsApp CTA par ligne
- Export CSV (`/api/admin/export`)
- Notification email Resend (fire-and-forget, graceful no-op si env vars absentes)

### Phase 4 — Dashboard V1.5 — Reservation details
- Migration 002 appliquée en production (notes, check_in, check_out, apartment_type)
- LeadRow.tsx — ligne expandable ▼/▲
- LeadNotes.tsx — notes internes auto-save 800ms
- DateRangePicker.tsx — arrivée/départ, blur-save, validation check_out ≥ check_in
- ApartmentSelect.tsx — type appartement immediate-save (accommodation only)
- PATCH route étendu — mise à jour partielle de tous les nouveaux champs
- Export CSV étendu — 4 nouvelles colonnes (Appartement, Arrivée, Départ, Notes)

---

## Current Data Flow

```text
Client (browser)
  └── remplit LeadForm.tsx ou ServiceContactForm.tsx
        └── POST /api/lead
              ├── validation (name, phone, service, message?, language?)
              ├── INSERT → Supabase leads (anon key)
              ├── sendLeadNotification() → Resend (fire-and-forget)
              └── retourne { success: true, whatsappUrl }
                    └── window.open(whatsappUrl) → WhatsApp pré-rempli

Admin (browser)
  └── /admin (cookie admin_token validé par middleware)
        ├── lecture leads → supabaseAdmin (service_role)
        ├── PATCH /api/admin/leads/:id → update status/notes/dates/apt
        └── GET /api/admin/export → CSV téléchargé
```

---

## Current Lead Fields

### Envoyés par les formulaires publics (actuellement)
| Champ      | Type   | Requis | Notes                              |
|------------|--------|--------|------------------------------------|
| `name`     | string | oui    | min 2 chars                        |
| `phone`    | string | oui    | min 8 chars                        |
| `service`  | string | oui    | accommodation/restaurant/cafe/car_rental |
| `message`  | string | non    | textarea libre, converti en null si vide |
| `language` | string | non    | hardcodé `'fr'` dans les deux forms |

### Présents en base Supabase (après migration 002)
| Colonne         | Type        | Nullable | Source actuelle         |
|-----------------|-------------|----------|-------------------------|
| `id`            | uuid        | non      | auto (gen_random_uuid)  |
| `created_at`    | timestamptz | non      | auto (now())            |
| `name`          | text        | non      | formulaire public       |
| `phone`         | text        | non      | formulaire public       |
| `service`       | text        | non      | formulaire public       |
| `message`       | text        | oui      | formulaire public       |
| `status`        | text        | non      | défaut 'new', admin     |
| `source`        | text        | non      | hardcodé 'website'      |
| `language`      | text        | non      | formulaire public ('fr')|
| `notes`         | text        | oui      | admin seulement         |
| `check_in`      | date        | oui      | **admin seulement**     |
| `check_out`     | date        | oui      | **admin seulement**     |
| `apartment_type`| text        | oui      | **admin seulement**     |

### Modifiables dans le dashboard admin
- `status` — StatusSelect, toutes les lignes
- `notes` — LeadNotes, toutes les lignes (panneau expandable)
- `check_in` + `check_out` — DateRangePicker, accommodation uniquement
- `apartment_type` — ApartmentSelect, accommodation uniquement

### Non encore envoyés automatiquement depuis le site public
- `check_in` — client doit écrire dans message ou admin remplit manuellement
- `check_out` — idem
- `apartment_type` — idem
- `language` — hardcodé 'fr', pas de sélection utilisateur

---

## Admin Dashboard Features

| Fonctionnalité     | Composant/Route                          | État    |
|--------------------|------------------------------------------|---------|
| Login              | `/admin/login` + `/api/admin/auth`       | actif   |
| Logout             | Server Action dans `/admin/page.tsx`     | actif   |
| Liste leads        | `/admin` (Server Component)             | actif   |
| Filtre service     | `AdminFilters.tsx`                       | actif   |
| Filtre statut      | `AdminFilters.tsx`                       | actif   |
| Recherche nom/tél  | `AdminFilters.tsx` (debounce 350ms)      | actif   |
| Mise à jour statut | `StatusSelect.tsx` + PATCH route         | actif   |
| Notes internes     | `LeadNotes.tsx` (debounce 800ms)         | actif   |
| Check-in/out       | `DateRangePicker.tsx` (blur-save)        | actif   |
| Type appartement   | `ApartmentSelect.tsx` (immediate)        | actif   |
| WhatsApp CTA       | `LeadRow.tsx` (lien `wa.me`)             | actif   |
| Export CSV (11 cols)| `/api/admin/export`                     | actif   |
| Notification email | `src/lib/email.ts` (Resend)              | actif*  |

*actif si `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL` configurés sur Vercel

---

## Known Environment Variables

| Variable                        | Requis | Statut        | Usage                              |
|---------------------------------|--------|---------------|------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | oui    | configuré     | Client + server Supabase           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | oui    | configuré     | Client Supabase (INSERT public)    |
| `SUPABASE_SERVICE_ROLE_KEY`     | oui    | configuré     | Admin Supabase (bypass RLS)        |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | oui    | configuré     | Génération URL WhatsApp            |
| `ADMIN_SECRET`                  | oui    | configuré     | Authentification dashboard         |
| `NEXT_PUBLIC_GA_ID`             | non    | en attente    | Google Analytics 4                 |
| `NEXT_PUBLIC_META_PIXEL_ID`     | non    | en attente    | Meta Pixel                         |
| `RESEND_API_KEY`                | non    | en attente    | Notifications email leads          |
| `RESEND_FROM_EMAIL`             | non    | en attente    | Adresse expéditeur Resend          |
| `ADMIN_EMAIL`                   | non    | en attente    | Destinataire notifications Resend  |

---

## Known Risks

| Risque                                    | Impact   | Statut       |
|-------------------------------------------|----------|--------------|
| Meta Pixel non configuré                  | tracking | en attente client |
| Resend non configuré                      | email    | en attente   |
| Version EN non implémentée                | SEO/UX   | session séparée |
| Favicon/logo polish                       | branding | en attente designer |
| Photos véhicule et façade manquantes      | UX       | en attente client |
| Formulaire public ne collecte pas check-in/out ni apartment_type | conversion | → V1.7 |
| `LeadForm` et `ServiceContactForm` sont deux composants quasi-identiques | dette technique | à surveiller |
| Email Resend hardcode uniquement `fr` labels | i18n   | non critique pour l'instant |
| WhatsApp message ne mentionne pas les dates même si admin les saisit | UX admin | → V1.7 |
| Google Sheets non implémenté              | ops      | hors scope   |

---

## Next Recommended Step — V1.7 Booking Form Extension

### Objectif
Permettre aux clients de renseigner directement dans le formulaire public :
- Date d'arrivée
- Date de départ
- Type d'appartement (Standard / 2 chambres / Grande capacité)

Ces données apparaissent alors **automatiquement** dans le dashboard admin dès la soumission du lead.

### Champs ciblés
Uniquement visibles quand `service === 'accommodation'` — les autres services ne sont pas concernés.

---

## Safe Implementation Plan for V1.7

### 1. Frontend — `LeadForm.tsx` et `ServiceContactForm.tsx`

**Changements :**
- Ajouter `checkIn: string`, `checkOut: string`, `apartmentType: string` à l'état local
- Afficher conditionellement ces champs quand `service === 'accommodation'`
  - `<input type="date">` pour arrivée (min = today)
  - `<input type="date">` pour départ (min = checkIn)
  - `<select>` pour type d'appartement (Standard / 2 chambres / Grande capacité)
- Inclure ces valeurs dans le `JSON.stringify()` du body — les autres services envoient `null`
- Réinitialiser ces champs si l'utilisateur change de service

**Risque :** Les deux composants sont indépendants — modifier l'un sans l'autre crée une incohérence.  
**Mitigation :** Extraire vers un composant partagé `BookingFields.tsx`, ou mettre à jour les deux en une seule PR.

### 2. API — `/api/lead/route.ts`

**Changements :**
- Ajouter validation optionnelle pour `check_in`, `check_out`, `apartment_type`
  - Regex `YYYY-MM-DD` pour les dates, null accepté
  - Enum pour `apartment_type` : `standard | 2-chambres | grande-capacite | null`
  - Vérification `check_out >= check_in` si les deux sont fournis
  - Validation cohérente avec le service : `check_in/out/apartment_type` seulement si `service === 'accommodation'`
- Inclure ces champs dans l'INSERT Supabase
- Mettre à jour `buildWhatsAppMessage()` pour inclure les dates si fournies
- Mettre à jour `LeadNotification` dans `src/lib/email.ts` pour inclure les nouveaux champs

**Risque :** L'API reçoit actuellement des corps sans ces champs — avec validation optionnelle (`'check_in' in body`) il n'y a aucun breaking change.

### 3. Supabase

**Aucune migration nécessaire** — les colonnes `check_in`, `check_out`, `apartment_type` existent déjà depuis la migration 002. Toutes sont nullable : les leads existants et futurs sans ces données continuent de fonctionner.

### 4. Dashboard admin

**Aucune modification nécessaire** — les champs sont déjà affichés et éditables via le panneau expandable (`LeadRow.tsx`). Les nouvelles valeurs apparaîtront automatiquement à la lecture du lead.

Optionnel : afficher un badge visuel (ex: dates dans la colonne principale) pour les leads avec check-in/out — mais hors scope V1.7.

### 5. Tests avant déploiement

- [ ] Tester formulaire avec `service=accommodation` : vérifier que les champs dates/type apparaissent
- [ ] Tester formulaire avec `service=restaurant` : vérifier que les champs n'apparaissent PAS
- [ ] Soumettre un lead accommodation avec dates → vérifier en DB que les valeurs sont insérées
- [ ] Soumettre un lead restaurant → vérifier que `check_in/out/apartment_type` sont NULL en DB
- [ ] Vérifier que le WhatsApp pré-rempli inclut les dates pour accommodation
- [ ] Vérifier l'export CSV avec un lead ayant des dates
- [ ] `npm run build` — 0 erreurs TypeScript

### 6. Plan de rollback

Les colonnes DB sont nullable et l'API valide optionnellement → rollback = redéployer le commit précédent sur Vercel. Aucune migration DB à annuler.

---

## Do Not Touch

| Élément                              | Raison                                    |
|--------------------------------------|-------------------------------------------|
| `middleware.ts`                      | Auth admin — fonctionne en production     |
| `/admin/login` + `/api/admin/auth`   | Auth admin — ne pas modifier              |
| `StatusSelect.tsx`                   | Stable, utilisé en production             |
| `src/lib/tracking.ts`               | Tracking Meta Pixel + GA4 — ne pas toucher |
| `src/app/layout.tsx`                | Fonts, tracking global, metadata root     |
| `src/lib/services.ts`               | Types ServiceType et messages WA          |
| `/api/admin/leads/[id]/route.ts`    | PATCH route stable — si modifié, tester  |
| Schéma Supabase                      | Stable post-002 — aucune migration nécessaire pour V1.7 |
| Routing bilingue `/fr`, `/en`        | Session séparée — hors scope              |
| Design global public (couleurs, typo)| Ne pas introduire de nouvelle dépendance UI |
