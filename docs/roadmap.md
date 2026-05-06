# Roadmap — Palm d'Or Dakhla

Dernière mise à jour : 2026-05-06

## V1 — Site vitrine ✅ Livré

- [x] Homepage optimisée conversion (7 sections)
- [x] Pages services : hébergements, restaurant, café, location voiture
- [x] Formulaire leads → Supabase
- [x] Redirection WhatsApp avec messages dynamiques par service
- [x] Structure tracking Meta Pixel + GA4
- [x] Design premium mobile-first
- [x] 6 appartements réels, 3 configurations sur `/hebergements`
- [x] Page `/galerie` avec photos client
- [x] Page `/contact` avec carte Google Maps
- [x] Documentation projet (AGENTS.md, CLAUDE.md, docs/)

## V1.1 — Contenu réel (en cours)

- [x] Premières photos client intégrées (6 photos hébergement + café)
- [x] Cross-links inter-services sur toutes les pages
- [x] SEO local : titles, meta, OpenGraph, schema.org LodgingBusiness
- [x] `sitemap.xml` et `robots.txt`
- [x] Suppression PDF 85MB, CTA menu → WhatsApp
- [ ] **Remplacer Unsplash restaurant** (ExperienceSection + /restaurant — 3 images)
- [ ] **Photo façade/extérieur résidence** (hero homepage idéal + Google Business)
- [ ] **Photo grand lit** (manquante pour Appartement Standard)
- [ ] **Photo salle restaurant + plat signature**
- [ ] **Photos véhicules** (location voiture)
- [ ] Témoignages clients — confirmer note Google (5★ · 180+ affiché, à vérifier)
- [ ] Activer Meta Pixel (ajouter ID dans `.env.local`)
- [ ] Activer GA4 (ajouter ID dans `.env.local`)
- [ ] Compléter fiche Google Business

## V1.2 — SEO et acquisition

- [x] Schema.org (LodgingBusiness + FoodEstablishment)
- [x] OpenGraph sur toutes les pages
- [ ] Optimisation Core Web Vitals (photos source en WebP/AVIF)
- [ ] Google Business : minimum 7 photos, catégories, horaires
- [ ] Backlinks locaux (annuaires Dakhla, guides voyage)
- [ ] Vérification Google Search Console

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
