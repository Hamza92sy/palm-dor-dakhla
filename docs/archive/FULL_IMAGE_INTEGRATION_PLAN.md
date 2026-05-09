# FULL IMAGE INTEGRATION PLAN — Palm d'Or Dakhla
*Exécuté le 2026-05-07 — Build ✓ OK*

---

## Plan de remplacement et d'intégration

| Page / section | Image avant | Nouvelle image | Pourquoi | Priorité |
|---------------|------------|---------------|---------|---------|
| Homepage — Hero | `de (175).jpg` (salon) | `restaurant-palmdor.jpg` | Logo Palm d'Or visible, branding fort | A |
| Homepage — ExperienceSection Restaurant | Unsplash stock | `restaurant-salle.jpg` | Photo réelle Palm d'Or | A |
| Homepage — ExperienceSection Café | `de (136).jpg` (petit-déj.) | `cafe-crepes.jpg` | Visuellement plus fort pour une carte cliquable | B |
| Homepage — AccomSection Standard | `de (175).jpg` (salon) | `chambre-double.jpg` | Carte "1 chambre" → montre une chambre | A |
| /hebergements hero | `de (175).jpg` (salon) | `chambre-double.jpg` | Hero hébergement = chambre, pas salon | A |
| /restaurant hero | Unsplash générique | `restaurant-salle.jpg` | Vraie salle Palm d'Or | A |
| /restaurant gallery (4 images) | Unsplash + 1 photo | Seafood + burger + salade + table | Mix complet des plats proposés | A |
| /cafe hero | `de (136).jpg` | `de (136).jpg` (conservé) | Bon petit-déj. marocain, garder | — |
| /cafe gallery (2 images) | `de (130).jpg` (faible) | `cafe-crepes.jpg` + `cafe-ambiance.jpg` | Crêpes + ambiance lounge = meilleur mix | B |
| /galerie (10 images) | 4 images (héberg. seul.) | 10 images mix équilibré | Représente les 3 services | C |

---

## Nouvelles images ajoutées au projet

### Session 1 (2026-05-07 matin) — 6 images
| Fichier | Source | Usage |
|---------|--------|-------|
| `chambre-double.jpg` | PHOTO-44 2 | Hero hébergements + AccomSection Standard + Gallery[0] |
| `restaurant-salle.jpg` | PHOTO-40 6 | Restaurant hero + ExperienceSection + Gallery |
| `restaurant-seafood.jpg` | PHOTO-43 4 | Restaurant gallery plat 1 |
| `restaurant-seafood-gros-plan.jpg` | PHOTO-43 | Gallery[1] — image macro premium |
| `restaurant-palmdor.jpg` | PHOTO-44 4 | Homepage hero |
| `cafe-crepes.jpg` | PHOTO-41 4 | Café gallery + ExperienceSection café card |

### Session 2 (2026-05-07 après-midi) — 5 images
| Fichier | Source | Usage |
|---------|--------|-------|
| `restaurant-burger.jpg` | PHOTO-42 5 | Restaurant gallery plat 2 |
| `restaurant-salade.jpg` | PHOTO-42 | Restaurant gallery plat 3 |
| `restaurant-table.jpg` | PHOTO-41 | Restaurant gallery plat 4 |
| `cafe-ambiance.jpg` | PHOTO-40 4 | Café gallery 3e image |
| `salon-sejour.jpg` | de (227) | Copié, réservé pour usage futur |

---

## Structure finale de la galerie (10 images)

```
[0] chambre-double.jpg          → hebergement  featured:true
[1] restaurant-seafood-gros-plan.jpg → restaurant
[2] restaurant-salade.jpg       → restaurant  (NEW)
[3] restaurant-salle.jpg        → restaurant
[4] restaurant-burger.jpg       → restaurant  (NEW)
[5] de (136).jpg                → cafe
[6] cafe-crepes.jpg             → cafe
[7] de (175).jpg                → hebergement
[8] de (199).jpg                → hebergement
[9] de (218).jpg                → hebergement
```

**Homepage GallerySection** affiche `slice(0, 5)` :
→ chambre double (featured) + seafood + salade + salle + burger

---

## Structure finale page /restaurant

**Hero :** `restaurant-salle.jpg`

**Galerie 4 images** (via `images.slice(1, 5)`) :
1. `restaurant-seafood.jpg` — plateau complet
2. `restaurant-burger.jpg` — burger maison
3. `restaurant-salade.jpg` — salade entrée fraîche
4. `restaurant-table.jpg` — table dressée

---

## Structure finale page /cafe

**Hero :** `de (136).jpg` (petit-déjeuner marocain)

**Galerie 2 images** :
1. `cafe-crepes.jpg` — crêpes nutella fruits
2. `cafe-ambiance.jpg` — lounge berbère Palm d'Or

---

## Modification technique apportée

**`ServicePage.tsx`** — Gallery section :
- Avant : `images.slice(0, 2)` → 2 images fixes dont le hero répété
- Après : `images.slice(1, 5)` → jusqu'à 4 images après le hero, grid dynamique
- Rétrocompatible : si 1 seule image, section masquée ; si 2+, grid adaptatif

---

## Images non retenues et pourquoi

| Image | Raison |
|-------|--------|
| `PHOTO-40 3.jpg` | Doublon exact de 40 2 |
| `PHOTO-41 5.jpg` & `41 6.jpg` | Doublons de 41 4 (même crêpes) |
| `PHOTO-42 3.jpg` | Doublon exact de 42 2 |
| `PHOTO-42 4.jpg` | Overhead moins fort que close-up 42 5 |
| `PHOTO-42 6.jpg` | Quasi-doublon de 42 2 |
| `PHOTO-43 2.jpg` | Quasi-doublon de 43 |
| `PHOTO-40.jpg` | Lumière violette artificielle, ambiance moins premium |
| `PHOTO-40 5.jpg` | Neon dominant, sombre |
| `PHOTO-44.jpg` | Verres renversés, lumière sombre |
| `de (130).jpg` | Qualité faible, flou |
| `de (171).jpg` | Quasi-doublon de de175 |

---

## Images encore nécessaires (manquantes)

| Type | Pourquoi |
|------|---------|
| Façade extérieure | Aide le SEO local + crédibilité Google Business |
| Terrasse ou vue Dakhla | Ancre géographiquement la destination |
| Salle de bain appartement | Renforce la perception qualité hébergement |
| Service en salle (serveur) | Humanise le restaurant |
| Plat de poisson local (thiof, etc.) | Signature terroir Dakhla |

---

## Résultat build

```
✓ Compiled successfully in 8.9s
✓ TypeScript OK
✓ 15/15 pages générées
✓ Zéro erreur, zéro warning code
```
