# Plan d'intégration images — Palm d'Or Dakhla

Dernière mise à jour : 2026-05-06

## Résumé exécutif

- **Photos client présentes dans `public/`** : 6 fichiers
- **Photos intégrées dans le code** : 6/6 (toutes utilisées)
- **Unsplash restants** : 3 occurrences (toutes liées au restaurant)
- **Photos manquantes critiques** : 5 (façade, grand lit, salle restaurant, plat, véhicule)

---

## Photos présentes et leur usage

| Fichier | Sujet | Utilisé dans |
| --- | --- | --- |
| `de (175).jpg` | Salon principal | Hero homepage, Hero hébergements, AccomSection Standard, galerie featured |
| `de (171).jpg` | Salon angle 2 | SignatureSection |
| `de (136).jpg` | Petit-déjeuner | ExperienceSection café, `/cafe` hero, galerie |
| `de (130).jpg` | Petit-déjeuner 2 | `/cafe` image secondaire |
| `de (199).jpg` | Chambre 2 lits | AccomSection 2 chambres, galerie |
| `de (218).jpg` | Chambre 3 lits | AccomSection grande capacité, galerie |

---

## Unsplash restants à remplacer

| Fichier source | Emplacement | Image Unsplash actuelle | Remplacement attendu |
| --- | --- | --- | --- |
| `src/components/home/ExperienceSection.tsx` | Carte Restaurant | `photo-1414235077428` | Salle restaurant réelle |
| `src/app/restaurant/page.tsx` | Hero `/restaurant` | `photo-1414235077428` | Salle restaurant réelle |
| `src/app/restaurant/page.tsx` | Image secondaire | `photo-1533089860892` | Plat signature restaurant |

**Procédure de remplacement** : déposer la photo dans `public/assets/photos-client/`, mettre à jour le `src` dans les 2 fichiers ci-dessus.

---

## Photos manquantes — Ce qu'il faut demander au client

### Critique (bloque le remplacement des Unsplash)

1. **Salle du restaurant** — plan large, lumière naturelle si possible
   - Remplace Unsplash dans `ExperienceSection.tsx` et `restaurant/page.tsx`

2. **Plat signature restaurant** — mise en scène soignée
   - Remplace image secondaire dans `restaurant/page.tsx`

3. **Véhicule(s) disponibles** — extérieur, fond neutre ou rue
   - Débloque le hero de `/location-voiture` (actuellement fond design system)

4. **Façade / extérieur résidence**
   - Idéale pour hero homepage (actuellement salon intérieur)
   - Indispensable pour Google Business

5. **Chambre grand lit** (Appartement Standard)
   - AccomSection Standard montre actuellement le salon — OK visuellement mais pas idéal pour le produit

### Importante

6. **Vue d'ensemble appartement 2 chambres** — cadrage large, 2 lits visibles
7. **Ambiance café** — plan large de l'espace ou terrasse

---

## Règles d'intégration

- Toujours déposer dans `public/assets/photos-client/`
- Nommer clairement : ex. `facade.jpg`, `salle-restaurant.jpg`, `vehicule-principal.jpg`
- Utiliser `next/image` avec `fill`, `sizes` approprié, `alt` descriptif
- `priority` uniquement sur les images above-the-fold (hero sections)
- Ne jamais utiliser `<img>` natif — uniquement `next/image`

---

## Restaurer le PDF menu (quand disponible)

Le PDF 85MB a été supprimé. Quand le client fournit un PDF optimisé (< 2MB) :
1. Déposer dans `public/assets/menu-palm-dor.pdf`
2. Dans `src/lib/config.ts` : ajouter `export const MENU_PDF_URL = '/assets/menu-palm-dor.pdf'`
3. Dans `src/components/restaurant/MenuSection.tsx` : remplacer le CTA WhatsApp par le lien PDF
