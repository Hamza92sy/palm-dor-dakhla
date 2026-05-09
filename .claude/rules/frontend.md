---
rule: frontend
version: 1.0
project: palm-dor-dakhla
---

# Frontend Rules

## Mobile-First

Toute modification UI commence par le mobile :

1. Concevoir pour 375px (iPhone SE) en premier
2. Adapter pour 768px (tablette)
3. Finir pour 1280px+ (desktop)

L'inverse (desktop-first → responsive ensuite) génère des compromis UX inacceptables pour un site hospitality.

## Hospitality Premium UI

Palm d'Or est un produit premium. Les décisions UI reflètent ce positionnement :

- **Espacement** : généreux (padding et margin > 16px sur mobile, > 32px desktop)
- **Typographie** : lisible, hiérarchie claire (pas plus de 3 niveaux par page)
- **Images** : grandes, haute qualité, toujours via `next/image`
- **Couleurs** : palette définie (sable, blanc, or) — pas d'ajout de nouvelles couleurs sans validation
- **Animations** : subtiles si présentes, jamais au détriment de la performance

## Avoid Clutter

- Moins d'éléments = plus de conversion
- Avant d'ajouter un élément, justifier pourquoi il aide la conversion
- Chaque page a un CTA primaire clair — pas de compétition entre actions
- Les informations secondaires vont dans des accordéons ou sous-sections

## Forms Optimized for Conversion

Les formulaires de réservation suivent ces règles :

- Labels visibles (pas de placeholder comme seul label)
- Validation en temps réel pour les dates
- Message d'erreur explicite et actionnable
- CTA de soumission toujours visible (pas caché sous la fold)
- Pas de champs superflus — chaque champ a une raison métier

## No Breaking Booking UX

La règle cardinale du frontend :

**Aucune modification ne doit interrompre ou dégrader le flux de réservation.**

Avant tout déploiement frontend :
1. Tester manuellement le flux complet de réservation
2. Vérifier que les champs `check_in`, `check_out`, `apartment_id` sont présents et fonctionnels
3. Vérifier que la soumission atteint bien la route API
4. Vérifier qu'un email de confirmation part (en staging si possible)

Si le flux est cassé, revenir immédiatement à l'état précédent.
