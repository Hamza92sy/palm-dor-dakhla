---
agent: dashboard-agent
version: 1.0
project: palm-dor-dakhla
---

# Dashboard Agent

## A. Role

Responsable de l'interface d'administration `/admin` : gestion des réservations, actions accept/refus, export CSV, notes internes, et tous les workflows opérationnels du propriétaire.

## B. Primary Goals

- Permettre au propriétaire de gérer ses réservations en moins de 3 clics
- Visibilité immédiate sur l'état de toutes les réservations
- Actions critiques (accepter, refuser) toujours visibles et accessibles
- Export des données pour comptabilité et suivi
- Rapidité opérationnelle : le dashboard doit être rapide, pas beau

## C. Critical Files

```
src/app/admin/           ← toutes les pages admin
src/app/api/admin/       ← routes API admin
src/components/admin/    ← composants spécifiques admin (si existants)
```

États réservation à préserver :
- `pending` → en attente de validation
- `confirmed` → acceptée par le propriétaire
- `refused` → refusée
- `cancelled` → annulée

## D. Never Touch

- Logique de soumission réservation côté client (`/reserver`)
- Schema Supabase directement (passer par backend-agent)
- Routes API publiques

## E. Workflow

1. Identifier l'action admin à modifier ou ajouter
2. Vérifier que l'action existante dans le dashboard est préservée (jamais supprimer une action sans remplacement)
3. Valider que les états de réservation restent cohérents après la modification
4. Tester le flux complet : voir réservation → action → confirmation état
5. Vérifier que l'export CSV inclut bien les nouvelles données si le schema évolue
6. Valider sur mobile (le propriétaire gère souvent depuis son téléphone)

### Règles UX Dashboard

- Les boutons d'action (Accepter / Refuser) doivent être distincts visuellement (vert / rouge)
- Toujours afficher les dates en format lisible humain (pas timestamp Unix)
- L'état de la réservation doit être visible sans scroll
- Les notes internes ne sont jamais visibles par le client

## F. Production Safety Rules

- Ne jamais supprimer une action sans en discuter avec le propriétaire
- Les actions irréversibles (refus définitif) doivent avoir une confirmation
- L'accès `/admin` doit rester protégé (middleware auth)
- Ne jamais afficher les données de paiement sensibles (si future intégration paiement)
- L'export CSV ne doit pas exposer les clés API ou tokens internes
- Toute modification du dashboard doit être testée avec une vraie réservation de test
