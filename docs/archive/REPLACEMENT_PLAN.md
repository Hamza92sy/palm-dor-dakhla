# REPLACEMENT PLAN — Palm d'Or Dakhla
*Plan validé avant exécution — 2026-05-07*

## Fichiers à copier vers `public/assets/photos-client/`

| Source (newpicspalmd'or/) | Destination | Raison |
|--------------------------|-------------|--------|
| `PHOTO-2026-05-06-17-54-44 2.jpg` | `chambre-double.jpg` | Chambre Standard — image commerciale clé |
| `PHOTO-2026-05-06-17-54-40 6.jpg` | `restaurant-salle.jpg` | Restaurant hero — intérieur propre et moderne |
| `PHOTO-2026-05-06-17-54-43 4.jpg` | `restaurant-seafood.jpg` | Restaurant gallery — plateau fruits de mer |
| `PHOTO-2026-05-06-17-54-43.jpg` | `restaurant-seafood-gros-plan.jpg` | Gallery featured — gros plan macro crevettes |
| `PHOTO-2026-05-06-17-54-44 4.jpg` | `restaurant-palmdor.jpg` | Homepage hero — logo Palm d'Or visible |
| `PHOTO-2026-05-06-17-54-41 4.jpg` | `cafe-crepes.jpg` | Café image 2 — crêpes nutella fruits |

---

## Plan de remplacement par section

| Section | Fichier | Ancienne image | Nouvelle image | Action | Pourquoi |
|---------|---------|---------------|---------------|--------|---------|
| Homepage Hero | `Hero.tsx` | `de (175).jpg` (salon) | `restaurant-palmdor.jpg` | Remplacer | Logo Palm d'Or visible, branding fort, tons chauds ≠ salon générique |
| Homepage ExperienceSection — Restaurant | `ExperienceSection.tsx` | Unsplash stock photo | `restaurant-salle.jpg` | Remplacer | Éliminer dernier Unsplash homepage, vraie salle Palm d'Or |
| Homepage AccommodationSection — Standard | `AccommodationSection.tsx` | `de (175).jpg` (salon) | `chambre-double.jpg` | Remplacer | Carte "Appartement Standard 1 chambre" doit montrer une chambre, pas un salon |
| Page /hebergements — Hero | `hebergements/page.tsx` | `de (175).jpg` (salon) | `chambre-double.jpg` | Remplacer | Hero hébergement = chambre, pas salon. Image plus commerciale. |
| Page /restaurant — Hero | `restaurant/page.tsx` (via ServicePage) | Unsplash stock photo | `restaurant-salle.jpg` | Remplacer | Photo réelle Palm d'Or vs. Unsplash générique |
| Page /restaurant — Gallery | `restaurant/page.tsx` (via ServicePage) | Unsplash stock photo | `restaurant-seafood.jpg` | Remplacer | Montre la cuisine réelle (fruits de mer = spécialité Dakhla) |
| Page /cafe — Image 2 | `cafe/page.tsx` | `de (130).jpg` (petit-déj. flou) | `cafe-crepes.jpg` | Remplacer | Photo plus nette + diversifie l'offre (dessert/café) |
| Gallery lib — tous | `gallery.ts` | 4 images (hébergement + café) | 7 images (+ restaurant) | Enrichir | Ajouter restaurant, rééquilibrer, chambre double en featured |

---

## Nouvelle structure de `GALLERY_IMAGES`

```
[0] chambre-double.jpg       → hebergement, featured:true   ← NOUVELLE (image premium)
[1] restaurant-seafood-gros-plan.jpg → restaurant           ← NOUVELLE (macro crevettes = impact)
[2] restaurant-salle.jpg     → restaurant                   ← NOUVELLE (intérieur propre)
[3] de (136).jpg             → cafe                         ← conservée (petit-déj. marocain)
[4] de (175).jpg             → hebergement                  ← conservée (salon, 5e position)
[5] de (199).jpg             → hebergement                  ← conservée (chambre twin)
[6] de (218).jpg             → hebergement                  ← conservée (grande capacité)
```

**Homepage GallerySection** affiche `slice(0, 5)` = chambre double + seafood + restaurant + café + salon.
**Page /galerie** affiche les 7 = +twin +grande capacité.

---

## Images conservées sans modification

| Image | Raison |
|-------|--------|
| `de (171).jpg` | SignatureSection — usage éditorial, fondu, contexte différent. Conserver. |
| `de (199).jpg` | Chambre twin — bonne photo, pertinente pour 2 chambres |
| `de (218).jpg` | Grande capacité 3 lits — bonne photo, pertinente |
| `de (136).jpg` | Petit-déjeuner marocain — photo authentique, bonne qualité |
| `og-image.jpg` | SEO OG image — ne jamais toucher |

---

## Images retirées de certains usages (sans suppression de fichier)

| Image | Ancien usage | Nouveau statut |
|-------|-------------|---------------|
| `de (175).jpg` | Hero homepage + hébergements hero + AccomSection standard + gallery[0] | Conservé seulement en gallery[4] |
| `de (130).jpg` | Café image 2 | Retiré du café, fichier conservé |
| Unsplash `photo-1414235077428` | Restaurant hero + ExperienceSection | Supprimé de tous les usages |
| Unsplash `photo-1533089860892` | Restaurant gallery | Supprimé de tous les usages |

---

## Contraintes respectées

- ✅ Build ne sera pas cassé (aucun composant structurel modifié)
- ✅ Next/Image conservé avec `fill`, `priority`, `sizes` corrects
- ✅ Alt texts mis à jour pour SEO
- ✅ Responsive inchangé (aucun layout modifié)
- ✅ schema.org non touché
- ✅ Métadonnées SEO non touchées
- ✅ ServicePage component non modifié
- ✅ Aucune dépendance ajoutée
