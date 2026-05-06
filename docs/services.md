# Services — Source de vérité

> Ce fichier est la référence absolue pour tout contenu affiché sur le site.
> Ne jamais inventer de données. Si une info manque, la noter dans `docs/assets-needed.md`.

## Hébergement

### Appartements disponibles : 5

Tous les appartements incluent : salon, salle à manger, cuisine, salle de bain.

| ID | Étage    | Type                 | Chambres                                       | Prix       |
| -- | -------- | -------------------- | ---------------------------------------------- | ---------- |
| 1  | 2e étage | Standard             | 1 chambre avec grand lit                       | 500 DH/nuit|
| 2  | 2e étage | 2 chambres           | 1 chambre grand lit double + 1 ch. 2 lits simples | 650 DH/nuit|
| 3  | 3e étage | Grande capacité      | 1 chambre grand lit double + 1 ch. 3 lits séparés | 750 DH/nuit|
| 4  | 4e étage | 2 chambres           | 1 chambre lit king-size + 1 ch. 2 lits simples | 650 DH/nuit|
| 5  | 4e étage | Grande capacité      | 1 chambre grand lit double + 1 ch. 3 lits séparés | 750 DH/nuit|

### Catégories homepage (AccommodationSection)

Pour la homepage, les appartements sont regroupés en 3 catégories :

- **Appartement Standard** — à partir de 500 DH/nuit (1 appartement)
- **Appartement 2 chambres** — à partir de 650 DH/nuit (2 appartements)
- **Grande capacité** — à partir de 750 DH/nuit (2 appartements)

### Capacités estimées

- Standard : 2 personnes
- 2 chambres : 3–4 personnes
- Grande capacité : 4–5 personnes

### Langage à utiliser

- ✓ appartements, résidence, hébergement
- ✗ hôtel, chambre d'hôtel, suite

---

## Restaurant

- **Nom** : Restaurant Palm d'Or
- **Type** : Cuisine locale et internationale
- **Points forts** : Produits frais, service rapide, accueil chaleureux
- **Menu** : À intégrer — voir `docs/assets-needed.md`
- **CTA WhatsApp** : "Bonjour, je souhaite réserver une table au restaurant Palm d'Or Dakhla."

---

## Café

- **Nom** : Café Palm d'Or
- **Offre** : Petit-déjeuner complet, café, thé, boissons fraîches
- **Ambiance** : Calme, ouvert chaque matin
- **CTA WhatsApp** : "Bonjour, je souhaite venir au café Palm d'Or Dakhla."

---

## Location de voitures

- **Offre** : Véhicules propres et entretenus
- **Durée** : À la journée ou à la semaine
- **Process** : Simple, via WhatsApp
- **Tarifs** : À intégrer — voir `docs/assets-needed.md`
- **CTA WhatsApp** : "Bonjour, je souhaite louer une voiture via Palm d'Or Dakhla."

---

## Messages WhatsApp par service

Définis dans `src/lib/services.ts`. Ne pas modifier sans mettre à jour ce fichier.

| Service         | Message pré-rempli                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| Hébergement     | "Bonjour, je souhaite connaître la disponibilité et les tarifs de vos appartements à Dakhla (Standard 500 DH, 2 chambres 650 DH, grande capacité 750 DH). Quelles dates sont disponibles ?" |
| Restaurant      | "Bonjour, je souhaite réserver une table au restaurant Palm d'Or Dakhla."                                 |
| Café            | "Bonjour, je souhaite venir au café Palm d'Or Dakhla."                                                    |
| Location        | "Bonjour, je souhaite louer une voiture via Palm d'Or Dakhla."                                            |
