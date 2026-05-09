---
rule: dashboard
version: 1.0
project: palm-dor-dakhla
---

# Dashboard Rules

## Admin-First Usability

Le dashboard est un outil opérationnel, pas un showcase design. Les priorités sont :

1. **Rapidité** — trouver une réservation en < 5 secondes
2. **Clarté** — l'état de chaque réservation visible sans ambiguïté
3. **Action** — Accepter / Refuser accessible en un clic
4. **Fiabilité** — les actions produisent le résultat attendu, toujours

## Reservation Actions Must Be Visible

Les actions sur réservation ne se cachent jamais derrière :
- Des menus déroulants à 3 niveaux
- Des modals imbriqués
- Des colonnes masquées par défaut
- Un scroll horizontal non annoncé

Règle : si une action n'est pas visible dans le viewport principal sur mobile, la remonter.

## No Hidden Critical Actions

Les actions irréversibles ou importantes doivent être :
- Visuellement distinctes (couleur, taille)
- Accompagnées d'une confirmation si irréversibles
- Accessibles sans navigation complexe

Liste des actions critiques :
- Accepter une réservation → confirmation email automatique
- Refuser une réservation → notification client
- Marquer comme payée
- Exporter les données CSV

## Preserve Operational Speed

Le propriétaire gère son activité depuis le dashboard en temps réel. Les modifications qui ralentissent le dashboard sont inacceptables :

- Pas de requêtes N+1 (charger toutes les réservations en une requête)
- Pas d'animations qui retardent l'affichage des données
- Pagination ou infinite scroll si > 50 réservations
- Filtres et recherche si > 20 réservations régulièrement

## State Consistency

Les états de réservation doivent rester cohérents à travers tout le système :

```
pending    → en attente de validation propriétaire
confirmed  → acceptée, email envoyé au client
refused    → refusée, notification envoyée
cancelled  → annulée (par client ou propriétaire)
```

Un changement d'état dans le dashboard déclenche toujours une action (email, notification). Ne jamais changer un état sans vérifier que l'action associée fonctionne.
