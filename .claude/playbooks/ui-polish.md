---
playbook: ui-polish
version: 1.0
project: palm-dor-dakhla
---

# Playbook — UI Polish

Utiliser ce playbook pour améliorer l'apparence, la clarté visuelle, et l'expérience hospitality du site sans toucher à la logique métier.

---

## Principe fondamental

Un polish UI améliore la perception sans changer la fonction.
Si une modification change le comportement → utiliser le playbook `new-feature.md`.

---

## Étape 1 — Identifier le problème de design

Être précis sur ce qui doit être amélioré :
- "Le hero manque d'impact sur mobile" ✓
- "Le site est moche" ✗ (trop vague)
- "Le CTA de réservation n'est pas visible sur mobile" ✓
- "Les couleurs ne sont pas bien" ✗ (trop vague)

Identifier la page et le composant exact avant de toucher au code.

---

## Étape 2 — Preserve Backend

Règle absolue :
- Aucune modification de `src/app/api/`
- Aucune modification de `src/lib/email.ts`
- Aucune modification de `src/lib/supabase.ts`
- Aucune modification du schema de données des formulaires

Si le polish semble nécessiter un changement backend → c'est une new-feature, pas un polish.

---

## Étape 3 — Improve Clarity

Chaque modification UI doit répondre à l'une de ces questions :
- Est-ce que ça aide le visiteur à comprendre ce que propose Palm d'Or ?
- Est-ce que ça guide vers la réservation ?
- Est-ce que ça renforce la confiance ?

Si la réponse est non à toutes → ne pas faire le changement.

---

## Étape 4 — Mobile Validation

Test obligatoire à chaque polish :

1. Ouvrir DevTools → viewport 375px (iPhone SE)
2. Vérifier le changement sur mobile
3. Monter à 768px (tablette)
4. Monter à 1280px (desktop)

Un polish qui améliore le desktop en cassant le mobile est une régression.

---

## Étape 5 — Hospitality Premium Feel

Checklist qualité avant validation :

- [ ] L'espacement est généreux (rien n'est cramped)
- [ ] Les images sont bien dimensionnées et non pixelisées
- [ ] La typographie est hiérarchisée et lisible
- [ ] Les couleurs restent dans la palette Palm d'Or
- [ ] Les CTAs sont visibles et attirants
- [ ] Aucun élément ne "détonne" par rapport au reste de la page

---

## Étape 6 — Build et vérification fonctionnelle

```bash
npm run build
```

Puis tester manuellement :
- [ ] La page polie s'affiche correctement
- [ ] Les liens et boutons fonctionnent
- [ ] Le formulaire de réservation est toujours opérationnel (si la page contient un formulaire)
