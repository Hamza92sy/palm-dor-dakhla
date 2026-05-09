---
playbook: dashboard-change
version: 1.0
project: palm-dor-dakhla
---

# Playbook — Dashboard Change

Utiliser ce playbook pour toute modification de l'interface `/admin` : nouveaux filtres, nouvelles actions, refonte d'un workflow opérationnel, export, etc.

---

## Contexte métier

Le dashboard est l'outil de travail quotidien du propriétaire. Toute dégradation de vitesse ou de clarté a un impact direct sur l'opération de l'établissement. Ce n'est pas un espace d'expérimentation.

---

## Étape 1 — Comprendre le workflow actuel

Avant de modifier quoi que ce soit :
1. Ouvrir `/admin` en local (`npm run dev`)
2. Comprendre le workflow actuel pour l'action concernée
3. Identifier ce qui fonctionne bien et doit être préservé
4. Identifier précisément ce qui doit changer et pourquoi

---

## Étape 2 — Preserve Workflows

Les workflows existants ne doivent jamais régresser :
- Accepter une réservation → envoi email → changement statut
- Refuser une réservation → notification → changement statut
- Voir le détail complet d'une réservation
- Exporter en CSV

Si la modification casse l'un de ces workflows, c'est un bug critique — même si c'est intentionnel dans la logique de la feature.

---

## Étape 3 — Preserve Speed

Le dashboard charge vite parce que les requêtes sont directes. Ne pas introduire :
- Des requêtes imbriquées qui multiplient les appels Supabase
- Des animations qui bloquent l'affichage des données
- Des bibliothèques tierces lourdes pour des fonctionnalités légères

Mesure de référence : la liste des réservations doit s'afficher en < 500ms.

---

## Étape 4 — No Hidden Actions

Vérifier après la modification :
- Les boutons Accepter et Refuser sont-ils toujours visibles directement ?
- Le statut de chaque réservation est-il lisible sans interaction ?
- Les actions critiques nécessitent-elles toujours une confirmation si irréversibles ?

Si une action est maintenant plus profonde dans la navigation → problème UX à corriger.

---

## Étape 5 — Validate Operational UX

Test avec un scénario réel :

Scénario test standard :
1. Une nouvelle réservation arrive (simuler avec des données de test en base)
2. La voir dans le dashboard
3. Accéder au détail
4. L'accepter (ou la refuser)
5. Vérifier le changement de statut
6. Vérifier l'email envoyé (logs Resend ou test email)

Si ce scénario passe sans friction → la modification est validée.

---

## Étape 6 — Build

```bash
npm run build
```

Puis déployer si build vert et tests passés.
