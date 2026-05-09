---
playbook: new-feature
version: 1.0
project: palm-dor-dakhla
---

# Playbook — New Feature

Utiliser ce playbook pour toute nouvelle fonctionnalité, qu'elle soit frontend, backend, ou cross-domain.

---

## Étape 1 — Lire PROGRESS.md

```
Lire PROGRESS.md en entier.
```

Objectifs :
- Comprendre l'état actuel du projet
- Identifier les décisions récentes qui impactent la nouvelle feature
- Repérer les éventuels travaux en cours sur la même zone

Ne pas commencer sans avoir lu PROGRESS.md.

---

## Étape 2 — Identifier les systèmes impactés

Lister explicitement :
- Quelles pages sont touchées ?
- Quelles routes API sont impliquées ?
- Quelles tables Supabase sont concernées ?
- Quels composants existants sont modifiés ou réutilisés ?
- `apartments.ts` est-il concerné ?

Si la feature touche plus de 3 systèmes → la décomposer en sous-tâches.

---

## Étape 3 — Analyser les risques

Questions à répondre avant de coder :
- Est-ce que cette feature peut casser le flux de réservation ?
- Est-ce que cette feature nécessite une migration schema ?
- Est-ce que cette feature a un impact sur les emails ?
- Est-ce que cette feature touche le dashboard admin ?

Pour chaque risque identifié, définir la stratégie de mitigation avant de commencer.

---

## Étape 4 — Préserver l'architecture

Vérifications obligatoires :
- [ ] Consulter `.claude/rules/architecture.md`
- [ ] Vérifier s'il existe un composant/route/util réutilisable
- [ ] Préférer l'extension à la réécriture
- [ ] Respecter les conventions de nommage existantes

---

## Étape 5 — Build

Ordre recommandé :
1. Backend en premier si nouvelle route API ou migration nécessaire
2. Frontend ensuite, en consommant les nouvelles APIs
3. Intégration et test du flux complet
4. Lancer `npm run build` → corriger toutes les erreurs avant de continuer

---

## Étape 6 — Update docs

Mettre à jour **immédiatement après** le build vert :

- [ ] `PROGRESS.md` — décrire ce qui a été fait et l'état actuel
- [ ] `CLAUDE.md` — si la feature change l'architecture
- [ ] `AGENTS.md` — si de nouveaux rôles ou responsabilités émergent
- [ ] `docs/` — si documentation de référence nécessaire

Ne pas reporter la documentation : elle se périme en quelques jours.
