# Parcours utilisateurs

## Flow principal (conversion)

```text
1. Visiteur arrive via Google (SEO local "appartement Dakhla", etc.)
2. Atterrit sur Homepage ou page service
3. Voit le CTA WhatsApp dans le hero
4. Clique → wa.me avec message pré-rempli
5. WhatsApp s'ouvre avec le message
6. Palm d'Or répond → réservation confirmée
```

Événements trackés :

- Clic WA → `trackWhatsApp()` → Meta Pixel `Contact` + GA4 `contact`

## Flow formulaire (lead qualifié)

```text
1. Visiteur préfère ne pas ouvrir WhatsApp directement
2. Remplit le formulaire (nom, téléphone, service, message optionnel)
3. POST /api/lead → validation → INSERT Supabase
4. Tracking : trackLead() → Meta Pixel `Lead` + GA4 `generate_lead`
5. Redirection automatique vers WhatsApp avec message détaillé
6. Lead enregistré en base pour suivi
```

Message WhatsApp généré par l'API :

```text
Bonjour,
Je souhaite faire une demande pour :
Service : [service]
Nom : [nom]
Téléphone : [téléphone]
[message optionnel]
Merci de me confirmer la disponibilité.
```

## Flow hébergement spécifique

```text
1. Visiteur sur /hebergements
2. Parcourt les 5 cartes appartements (étage, composition, prix)
3. Clique sur "Vérifier disponibilité" d'un appartement précis
4. wa.me avec message pré-rempli mentionnant l'appartement exact et le prix
5. Palm d'Or reçoit une demande qualifiée (type + budget connu)
```

## Statuts lead (Supabase)

```text
new        → Lead entrant, pas encore traité
contacted  → Palm d'Or a répondu via WhatsApp
confirmed  → Réservation confirmée
cancelled  → Annulé ou non qualifié
```

## Points de friction identifiés

- Liens nav `/galerie` et `/contact` → 404 (pages manquantes)
- Liens langue `/en/*` → 404 (version anglaise non implémentée)
- Tracking inactif (IDs Meta Pixel + GA4 non configurés)
