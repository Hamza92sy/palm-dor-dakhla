# Actifs manquants — À demander au client

Dernière mise à jour : 2026-05-06

> Ce fichier liste ce qui bloque la mise en ligne complète.
> Cocher au fur et à mesure de la réception.

---

## Photos — État actuel

### Reçues et intégrées ✅

- [x] `de (175).jpg` — Salon principal → Hero homepage, hébergements, AccomSection Standard
- [x] `de (171).jpg` — Salon angle 2 → SignatureSection
- [x] `de (136).jpg` — Petit-déjeuner → Café hero, galerie
- [x] `de (130).jpg` — Petit-déjeuner 2 → Café image secondaire
- [x] `de (199).jpg` — Chambre 2 lits → AccomSection 2 chambres, galerie
- [x] `de (218).jpg` — Chambre 3 lits → AccomSection grande capacité, galerie

### Manquantes — Priorité critique 🔴

- [ ] **Façade / extérieur résidence** — Hero homepage idéal, Google Business, crédibilité locale
- [ ] **Chambre grand lit** — Appartement Standard (actuellement montré avec salon)
- [ ] **Salle restaurant** — Hero `/restaurant` et ExperienceSection (3 Unsplash restants bloqués par cette photo)
- [ ] **Plat signature restaurant** — Image secondaire `/restaurant`
- [ ] **Véhicule principal** — Hero `/location-voiture`

### Manquantes — Priorité importante 🟠

- [ ] **Ambiance café large** — Alternative au plan serré petit-déjeuner
- [ ] **Vue ensemble appartement 2 chambres** — Différenciation produit
- [ ] **Véhicule secondaire ou lineup** — Renfort `/location-voiture`

### Manquantes — Optionnel 🟡

- [ ] Cuisine / salle à manger appartement
- [ ] Salle de bain appartement
- [ ] Photos Google Business supplémentaires (objectif : 7 minimum)

**Format demandé au client** : JPG ou WebP, qualité originale, minimum 2000px côté large.

---

## Contenu texte

### Restaurant

- [ ] Menu complet (plats + prix) — actuellement 5 plats en dur dans le code
- [ ] Horaires d'ouverture

### Café

- [ ] Carte boissons et petit-déjeuner complète avec prix
- [ ] Horaires d'ouverture

### Location de voitures

- [ ] Types de véhicules disponibles
- [ ] Tarifs (jour / semaine)
- [ ] Conditions (permis, caution, kilométrage)

### Général

- [ ] Confirmation note Google réelle (site affiche 5★ · 180+ avis)
- [ ] Horaires check-in / check-out
- [ ] PDF menu optimisé (< 2MB) — l'ancien 85MB a été supprimé ; quand disponible, déposer dans `public/assets/menu-palm-dor.pdf` et restaurer le lien dans `MenuSection.tsx`

---

## Technique

- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — ID Facebook Pixel
- [ ] `NEXT_PUBLIC_GA_ID` — ID Google Analytics 4
- [ ] Domaine `palmdordakhla.com` — connecter à Vercel
- [ ] Variables d'environnement à ajouter dans Vercel Dashboard (pas seulement en local)

---

## Google Business

- [ ] Fiche revendiquée et vérifiée
- [ ] Minimum 7 photos uploadées
- [ ] Catégories correctes (Résidence, Restaurant, Café)
- [ ] Horaires remplis
- [ ] Lien site web → domaine final
