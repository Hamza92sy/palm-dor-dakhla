---
playbook: bugfix
version: 1.0
project: palm-dor-dakhla
---

# Playbook — Bug Fix

Utiliser ce playbook pour corriger tout bug, qu'il soit UX, logique métier, ou infrastructure.

---

## Étape 1 — Reproduire

Avant tout, reproduire le bug de manière fiable :
- Quelle action déclenche le bug ?
- Sur quel device / browser ?
- Toujours ou de manière intermittente ?
- Le bug existe-t-il en production et en local, ou seulement l'un des deux ?

Un bug non reproductible ne se corrige pas : il se contourne, ce qui génère de la dette.

---

## Étape 2 — Root Cause Analysis

Ne pas corriger le symptôme — corriger la cause :

Outils :
- Logs browser console (erreurs JS, réseau)
- Logs Vercel (erreurs serveur, API failures)
- Logs Supabase (erreurs requêtes)
- `console.log` / `console.error` ciblés dans le code suspect

Questions à répondre :
- Où exactement l'erreur se produit-elle (quelle fonction, quelle ligne) ?
- Quelle donnée inattendue déclenche le bug ?
- Ce bug existait-il avant une modification récente ?

Vérifier `PROGRESS.md` pour identifier les changements récents si le bug est apparu soudainement.

---

## Étape 3 — Minimal Fix

Appliquer le fix le plus petit possible qui corrige la cause racine :

- Ne pas refactorer le code environnant pendant un bugfix
- Ne pas ajouter de features pendant un bugfix
- Ne pas changer de style ou de structure sans lien avec le bug

Si le bugfix nécessite un changement de schema Supabase → créer une migration.
Si le bugfix touche une route API → valider la logique de validation complète.
Si le bugfix touche le flux email → tester l'envoi.

---

## Étape 4 — Build

```bash
npm run build
```

Build doit être vert. TypeScript ne ment pas.

---

## Étape 5 — Regression Check

Après correction, vérifier que rien d'autre n'est cassé :

- [ ] Flux réservation complet (du formulaire à la confirmation)
- [ ] Dashboard admin (liste réservations, actions)
- [ ] Pages publiques (home, appartements, réservation)
- [ ] Si bug email était concerné : tester un envoi

Si une régression est détectée, corriger avant de pusher.

---

## Note

Un bugfix en production n'attend pas la perfection : il demande la justesse. Corriger proprement, documenter dans `PROGRESS.md`, déployer.
