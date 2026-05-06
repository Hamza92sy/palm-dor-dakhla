# Plan d'intégration images — Palm d'Or Dakhla

Dernière mise à jour : 2026-05-06

## Objectif

Préparer le remplacement progressif de tous les placeholders visuels du site avec une première série de vraies photos client, sans casser le positionnement conversion-first ni la crédibilité locale.

## Résumé exécutif

- **Slots image à couvrir sur le site** : `26`
- **Slots déjà sans image volontairement** : `1`
  `/location-voiture` hero est désormais en fond design system, en attente des vraies photos véhicules.
- **Photos client déjà mentionnées comme disponibles** : `9 fichiers`
  `de (130).jpg`, `de (136).jpg`, `de (171).jpg`, `de (175).jpg`, `de (200).jpg`, `de (201).jpg`, `de (206).jpg`, `de (219).jpg`, `de (220).jpg`
- **Photos immédiatement exploitables avec bon niveau de crédibilité** : `8`
  `de (136).jpg`, `de (130).jpg`, `de (175).jpg`, `de (171).jpg`, `de (201).jpg` ou `de (200).jpg`, `de (206).jpg`, `de (219).jpg`, `de (220).jpg`
- **Photos manquantes à demander en priorité** : `6`
  façade/extérieure résidence, salle restaurant, plat restaurant signature, ambiance café large, véhicule principal, véhicule secondaire ou lineup

## Photos déjà disponibles

| Fichier | Sujet estimé | Qualité d'usage recommandée | Usage recommandé |
| --- | --- | --- | --- |
| `de (136).jpg` | Petit-déjeuner | Très forte | Hero café, carte café homepage, galerie petit-déjeuner |
| `de (130).jpg` | Petit-déjeuner secondaire | Bonne | Galerie secondaire, renfort contenu café |
| `de (175).jpg` | Salon appartement principal | Très forte | Hero hébergements, hero homepage temporaire, galerie featured |
| `de (171).jpg` | Salon appartement secondaire | Bonne | Signature section, galerie secondaire, renfort hébergements |
| `de (200).jpg` | Chambre principale | Bonne | Alternative si `de (201).jpg` cadre moins bien |
| `de (201).jpg` | Chambre principale | Très forte | Carte appartement standard, galerie chambre |
| `de (206).jpg` | Chambre galerie | Bonne | Carte 2 chambres ou galerie |
| `de (219).jpg` | Chambre galerie | Bonne | Galerie hébergements |
| `de (220).jpg` | Chambre galerie | Bonne | Carte grande capacité ou galerie |

## Photos manquantes à demander au client

### Critiques

1. **Façade / extérieur résidence**
   Usage : hero homepage idéal, Google Business, crédibilité locale immédiate.
2. **Salle du restaurant**
   Usage : hero `/restaurant`, carte restaurant homepage, galerie service restaurant.
3. **Plat signature restaurant**
   Usage : image secondaire `/restaurant`, galerie, Google Business.
4. **Véhicule principal**
   Usage : hero `/location-voiture` quand le service sera illustré.
5. **Deuxième photo véhicule ou lineup**
   Usage : galerie, crédibilité du service, futur Google Business.

### Importantes

6. **Ambiance café large**
   Usage : alternative au petit-déjeuner serré pour `/cafe`.
7. **Vue d'ensemble appartement 2 chambres**
   Usage : meilleure différenciation produit entre catégories.
8. **Vue d'ensemble grande capacité**
   Usage : éviter de sur-représenter uniquement des chambres.

### Optionnelles

9. **Cuisine / salle à manger**
   Usage : enrichir `/hebergements`, galerie, Google Business.
10. **Salle de bain**
    Usage : rassurance produit, surtout pour les séjours famille.

## Audit complet des images actuelles

### Homepage

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Hero | `photo-1586023492125-27b2c045efd7` | Première impression, crédibilité, conversion principale | Critique | `1920x1080`, paysage large | **Temporaire** : `de (175).jpg` ; **idéal final** : façade/extérieure résidence |
| 2 | ExperienceSection · Restaurant | `photo-1414235077428-338989a2e8c0` | Découverte du service restaurant depuis homepage | Importante | `1200x1600` ou `900x1200`, vertical | **Manquante** : salle restaurant réelle |
| 3 | ExperienceSection · Café | `photo-1501339847302-ac426a4a7cbb` | Découverte du service café | Importante | `1200x1600` ou `900x1200`, vertical | `de (136).jpg` |
| 4 | ExperienceSection · Hébergements | `photo-1555041469-a586c61ea9bc` | Découverte du service hébergements | Importante | `1200x1600` ou `900x1200`, vertical | `de (175).jpg` |
| 5 | SignatureSection | `photo-1414235077428-338989a2e8c0` | Ton premium, hospitalité, respiration éditoriale | Importante | `1600x1067`, paysage large | `de (171).jpg` |
| 6 | AccommodationSection · Appartement Standard | `photo-1618773928121-c32242e63f39` | Produit hébergement, prix d'entrée | Critique | `1200x900`, `4:3` | `de (201).jpg` ou `de (200).jpg` |
| 7 | AccommodationSection · 2 chambres | `photo-1602002418082-a4443e081dd1` | Produit hébergement, famille/petit groupe | Critique | `1200x900`, `4:3` | `de (206).jpg` |
| 8 | AccommodationSection · Grande capacité | `photo-1560448204-603b3fc33ddc` | Produit hébergement, groupe | Critique | `1200x900`, `4:3` | `de (220).jpg` |
| 9 | GallerySection · featured | `photo-1414235077428-338989a2e8c0` | Preuve visuelle immédiate | Critique | `1600x1200`, large | `de (175).jpg` |
| 10 | GallerySection · tile 2 | `photo-1555041469-a586c61ea9bc` | Variété galerie | Importante | `1200x1200` ou `1200x900` | `de (201).jpg` |
| 11 | GallerySection · tile 3 | `photo-1618773928121-c32242e63f39` | Variété galerie | Importante | `1200x1200` ou `1200x900` | `de (206).jpg` |
| 12 | GallerySection · tile 4 | `photo-1501339847302-ac426a4a7cbb` | Montrer l'offre petit-déjeuner/café | Importante | `1200x1200` ou `1200x900` | `de (136).jpg` |
| 13 | GallerySection · tile 5 | `photo-1560448204-603b3fc33ddc` | Variété galerie | Importante | `1200x1200` ou `1200x900` | `de (171).jpg` |

### `/hebergements`

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 14 | Hero | `photo-1618773928121-c32242e63f39` | Page produit principale hébergement | Critique | `1920x1080`, paysage large | `de (175).jpg` |

### `/restaurant`

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 15 | Hero | `photo-1414235077428-338989a2e8c0` | Conversion restaurant, crédibilité du lieu | Critique | `1920x1080`, paysage large | **Manquante** : salle restaurant réelle |
| 16 | Image secondaire | `photo-1533089860892-a7c6f0a88666` | Renfort de preuve visuelle | Importante | `1200x900`, `4:3` | **Temporaire** : `de (130).jpg` ; **idéal final** : plat signature restaurant |

### `/cafe`

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 17 | Hero | `photo-1495474472287-4d71bcdd2085` | Conversion café/petit-déjeuner | Critique | `1920x1080`, paysage large | `de (136).jpg` |

### `/location-voiture`

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 18 | Hero | Aucun visuel, fond design system | Preuve de service auto | Critique | `1920x1080`, paysage large | **Manquante** : véhicule principal |

### `/galerie`

| Slot | Section | Image actuelle | Rôle business | Priorité | Format idéal | Photo client recommandée |
| --- | --- | --- | --- | --- | --- | --- |
| 19 | Tile featured | `photo-1414235077428-338989a2e8c0` | Première preuve visuelle galerie | Critique | `1600x1000`, large | `de (175).jpg` |
| 20 | Tile 2 | `photo-1555041469-a586c61ea9bc` | Montrer le salon | Importante | `1200x900` | `de (171).jpg` |
| 21 | Tile 3 | `photo-1618773928121-c32242e63f39` | Montrer la chambre | Importante | `1200x900` | `de (201).jpg` ou `de (200).jpg` |
| 22 | Tile 4 | `photo-1501339847302-ac426a4a7cbb` | Montrer café/petit-déjeuner | Importante | `1200x900` | `de (136).jpg` |
| 23 | Tile 5 | `photo-1560448204-603b3fc33ddc` | Renfort hébergement | Importante | `1200x900` | `de (206).jpg` |
| 24 | Tile 6 | `photo-1533089860892-a7c6f0a88666` | Renfort restauration | Importante | `1200x900` | `de (130).jpg` **temporaire** ou photo plat réelle **idéale** |
| 25 | Tile 7 | `photo-1495474472287-4d71bcdd2085` | Renfort café | Importante | `1200x900` | `de (219).jpg` si chambre, sinon attendre photo café réelle |
| 26 | Tile 8 | `photo-1549317661-bd32c8ce0db2` | Renfort location voiture | Importante | `1200x900` | **Manquante** : véhicule secondaire ou lineup |

### `/contact`

- **Slots photo actuels** : `0`
- **Élément visuel actuel** : Google Maps embed
- **Action recommandée** : ne pas ajouter de photo tant qu’une façade claire et exploitable n’est pas disponible.

## Mapping recommandé à court terme

### Remplacement immédiat possible avec les photos déjà disponibles

| Photo client | Emplacements recommandés |
| --- | --- |
| `de (175).jpg` | Homepage hero temporaire, homepage Experience hébergements, `/hebergements` hero, homepage Gallery featured, `/galerie` featured |
| `de (171).jpg` | Homepage SignatureSection, homepage Gallery tile 5, `/galerie` tile 2 |
| `de (136).jpg` | Homepage Experience café, `/cafe` hero, homepage Gallery tile 4, `/galerie` petit-déjeuner |
| `de (130).jpg` | Renfort galerie, image secondaire restaurant **temporaire seulement** |
| `de (201).jpg` ou `de (200).jpg` | Homepage Accommodation standard, `/galerie` chambre principale |
| `de (206).jpg` | Homepage Accommodation 2 chambres, homepage Gallery tile 3 |
| `de (219).jpg` | `/galerie` chambre supplémentaire |
| `de (220).jpg` | Homepage Accommodation grande capacité, `/galerie` chambre supplémentaire |

### Ne pas forcer tant que les bonnes photos ne sont pas reçues

| Emplacement | Pourquoi attendre |
| --- | --- |
| Homepage Experience restaurant | Une photo petit-déjeuner ne raconte pas correctement le restaurant |
| `/restaurant` hero | Il faut une vraie salle restaurant ou un plat signature fort |
| `/location-voiture` hero | Le service perd en crédibilité si on montre autre chose qu’un vrai véhicule |
| `/galerie` tile voiture | Une chambre ou un petit-déjeuner sous label voiture serait trompeur |

## Priorisation globale

### Critique

- Homepage hero
- Homepage AccommodationSection `3 images`
- `/hebergements` hero
- `/restaurant` hero
- `/cafe` hero
- `/location-voiture` hero
- `/galerie` featured

### Importante

- Homepage ExperienceSection `3 images`
- Homepage SignatureSection
- Homepage GallerySection `4 images secondaires`
- `/restaurant` image secondaire
- `/galerie` tiles secondaires

### Optionnelle

- Photos supplémentaires cuisine, salle à manger, salle de bain
- Variantes supplémentaires pour éviter la répétition si la galerie grandit

## Risques si on utilise une mauvaise image

1. **Restaurant illustré par un simple petit-déjeuner**
   Risque : le visiteur comprend “café du matin” au lieu de “restaurant”, ce qui affaiblit la conversion restaurant.
2. **Homepage hero trop serré ou purement chambre**
   Risque : perte de stature, impression d’offre réduite, moins bonne crédibilité locale.
3. **Même salon répété partout**
   Risque : le site paraît pauvre en contenu réel et moins fiable.
4. **Photos chambres utilisées pour la location de voitures**
   Risque : confusion immédiate sur les services, baisse de confiance.
5. **Photos trop recadrées en hero desktop**
   Risque : perte d’impact premium, composition faible sur grand écran.

## Recommandation opérationnelle

1. **Phase 1**
   Remplacer immédiatement les slots hébergement et café avec les photos déjà reçues.
2. **Phase 2**
   Demander en urgence façade résidence, salle restaurant et véhicules.
3. **Phase 3**
   Finaliser `/galerie`, homepage hero et les cartes service restaurant/location avec les vraies images métier.
