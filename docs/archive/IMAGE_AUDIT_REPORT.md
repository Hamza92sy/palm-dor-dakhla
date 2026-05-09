# IMAGE AUDIT REPORT — Palm d'Or Dakhla
*Audit réalisé le 2026-05-07*

## Images actuellement utilisées sur le site

### Fichiers dans `/public/assets/photos-client/`

| Fichier | Sujet réel | Qualité |
|---------|-----------|---------|
| `de (175).jpg` | Salon appartement — canapé gris L, TV, papier peint feuilles jaunes | Correcte, pas premium |
| `de (171).jpg` | Même salon, angle légèrement différent (quasi-identique à 175) | Correcte, quasi-doublon de 175 |
| `de (199).jpg` | Chambre 2 lits simples — coussins verts, tapis berbère | Bonne |
| `de (218).jpg` | Grande capacité 3 lits — vue large, même style que 199 | Bonne |
| `de (136).jpg` | Petit-déjeuner marocain — msemen, miel, jus, yaourt | Bonne |
| `de (130).jpg` | Petit-déjeuner (angle différent) — moins net, plus désorganisé | Faible |
| `og-image.jpg` | Image OG — ne pas toucher | N/A |

### Placeholders Unsplash encore en production

| Section | URL Unsplash | Problème |
|---------|-------------|---------|
| `restaurant/page.tsx` — hero | `photo-1414235077428` (restaurant générique) | Stock photo ≠ Palm d'Or |
| `restaurant/page.tsx` — gallery | `photo-1533089860892` (petit-déj. générique) | Stock photo ≠ Palm d'Or |
| `ExperienceSection.tsx` — restaurant card | `photo-1414235077428` (même) | Stock photo sur homepage |

---

## Analyse section par section

### Homepage — Hero (`Hero.tsx`)
- **Image** : `de (175).jpg` (salon)
- **Qualité** : Fonctionnelle mais peu impactante. Un salon gris avec TV n'est pas le meilleur premier contact.
- **Problème** : Cette même image est utilisée 4× sur le site → fatigue visuelle.
- **Verdict** : **Remplacer**

### Homepage — ExperienceSection (`ExperienceSection.tsx`)
- **Restaurant** : Unsplash — **Remplacer**
- **Café** : `de (136).jpg` (petit-déj.) — **Garder**
- **Hébergements** : `de (175).jpg` — **Remplacer** (doublonnage excessif)

### Homepage — SignatureSection (`SignatureSection.tsx`)
- **Image** : `de (171).jpg` (salon, quasi-identique à 175)
- **Usage** : Éditorial, plein écran avec fondu. L'image fonctionne dans ce contexte.
- **Verdict** : **Garder** (usage distinct, overlay compense la similitude)

### Homepage — AccommodationSection (`AccommodationSection.tsx`)
- **Standard** : `de (175).jpg` → PROBLÈME : montre un salon pour "Appartement Standard 1 chambre" — **Remplacer** par une chambre
- **2 chambres** : `de (199).jpg` — chambre twin, pertinente — **Garder**
- **Grande capacité** : `de (218).jpg` — 3 lits, pertinent — **Garder**

### Homepage — GallerySection
- Source : `GALLERY_IMAGES.slice(0, 5)` depuis `gallery.ts`
- 4 images actuelles, toutes hébergement sauf 1 (café) — **Pas de restaurant représenté**
- **Verdict** : **Enrichir**

### Page `/hebergements`
- **Hero** : `de (175).jpg` → salon en hero d'une page hébergement — **Remplacer** par une chambre

### Page `/restaurant`
- **Hero** : Unsplash générique — **Remplacer**
- **Gallery** : Unsplash générique — **Remplacer**

### Page `/cafe`
- **Image 1** : `de (136).jpg` — bonne, authentique — **Garder**
- **Image 2** : `de (130).jpg` — moins net, même sujet — **Remplacer** par image plus variée

### Page `/galerie` (GALLERY_IMAGES complètes)
- 4 images : 3 hébergement + 1 café — aucun restaurant représenté
- **Verdict** : **Enrichir avec restaurant**

---

## Doublons identifiés

| Image A | Image B | Problème |
|---------|---------|---------|
| `de (175).jpg` | `de (171).jpg` | Même salon, angles proches → doublon éditorial |
| `de (175).jpg` | Utilisée 4× | Hero homepage + hébergements hero + AccomSection standard + Gallery featured |

## Synthèse des priorités

| Priorité | Action |
|----------|--------|
| 1 — URGENT | Sortir `de (175).jpg` des 4 positions → max 1 usage |
| 2 — URGENT | Éliminer les 3 Unsplash du site |
| 3 — IMPORTANT | Avoir une vraie photo de chambre pour l'Appartement Standard |
| 4 — IMPORTANT | Ajouter des images restaurant dans la galerie |
| 5 — UTILE | Remplacer `de (130).jpg` (faible) dans le café |
