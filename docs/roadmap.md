# Roadmap — Palm d'Or Dakhla

## V1 — Site vitrine (livré)

- [x] Homepage optimisée conversion
- [x] Pages services : hébergements, restaurant, café, location voiture
- [x] Formulaire leads → Supabase
- [x] Redirection WhatsApp avec messages dynamiques par service
- [x] Structure tracking Meta Pixel + GA4
- [x] Design premium mobile-first
- [x] 5 appartements réels avec prix sur `/hebergements`
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

## V2 — Gestion des leads (3–6 mois)

- [ ] Dashboard admin simple (lecture des leads Supabase)
- [ ] Filtres par service / statut
- [ ] Export CSV des leads
- [ ] Notification email/WhatsApp sur nouveau lead

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
