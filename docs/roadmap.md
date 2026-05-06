# Roadmap — Palm d'Or Dakhla

## V1 — Site vitrine (livré)

- [x] Homepage optimisée conversion
- [x] Pages services : hébergements, restaurant, café, location voiture
- [x] Formulaire leads → Supabase
- [x] Redirection WhatsApp avec messages dynamiques par service
- [x] Structure tracking Meta Pixel + GA4
- [x] Design premium mobile-first
- [x] 6 appartements réels, 3 configurations sur `/hebergements`
- [x] Documentation projet (AGENTS.md, CLAUDE.md, docs/)

## V1.1 — Contenu réel (en cours)

- [ ] Remplacer toutes les images Unsplash par photos client
- [ ] Activer Meta Pixel (ajouter ID dans `.env.local`)
- [ ] Activer GA4 (ajouter ID dans `.env.local`)
- [ ] Ajouter menu restaurant
- [ ] Témoignages clients réels (remplacer placeholders)
- [ ] Corriger les 404 nav (galerie, contact, /en)
- [ ] Compléter fiche Google Business

## V1.2 — SEO et acquisition

- [ ] Page `/galerie` avec toutes les photos
- [ ] Page `/contact` avec carte Google Maps
- [ ] `sitemap.xml` et `robots.txt`
- [ ] Schema.org (LocalBusiness, LodgingBusiness)
- [ ] Optimisation Core Web Vitals (images WebP, lazy load)

## V2 — Gestion des réservations (3–6 mois)

Objectif : remplacer progressivement le fichier Excel manuel par un système simple dans Supabase.

### Table `reservations` (à créer)

Champs :

- `id` — uuid
- `apartment_type` — standard | 2-chambres | grande-capacite
- `status` — pending | confirmed | cancelled | completed
- `check_in` — date
- `check_out` — date
- `guest_name` — text
- `guest_phone` — text
- `source` — whatsapp | form | direct
- `notes` — text (interne)
- `created_at` — timestamp

### Fonctionnalités

- [ ] Dashboard admin simple (lecture Supabase — leads + réservations)
- [ ] Filtres par appartement / statut / date
- [ ] Export CSV/Excel des réservations
- [ ] Notification email/WhatsApp sur nouveau lead
- [ ] Import Excel ponctuel si nécessaire (migration données existantes)

## V3 — Automatisation (6–12 mois)

- [ ] Message WhatsApp automatique de confirmation au client
- [ ] Suivi statut réservation (confirmé / annulé)
- [ ] Intégration Meta Ads (pixel conversions optimisées)
- [ ] Campagnes Google Ads locales

## V4 — Évolutions produit (12+ mois)

- [ ] Calendrier de disponibilité temps réel
- [ ] Paiement d'arrhes en ligne (Stripe)
- [ ] Version anglaise du site (`/en/*`)
- [ ] Application mobile (si volume justifie)

---

## Principes de priorisation

1. Contenu réel avant nouvelles features
2. Tracking actif avant acquisition payante
3. SEO local avant SEO national
4. Leads manuels avant automatisation
