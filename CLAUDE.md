@AGENTS.md

# Palm d'Or Dakhla — Master Brief

## Qu'est-ce que c'est

Palm d'Or Dakhla est une résidence multi-services à Dakhla, Maroc.

Services :

- **Hébergement** — 6 appartements meublés (3 configs : Standard 500, 2ch 650, Grande capa 750 DH/nuit)
- **Restaurant** — cuisine locale et internationale
- **Café** — petit-déjeuner et boissons
- **Location de voitures** — véhicules à la journée ou semaine

## Objectif business

Convertir les visiteurs Google en réservations WhatsApp.

Funnel unique :

```text
Google → Site → WhatsApp → Réservation confirmée
```

## Contexte actuel

Le site est **live et opérationnel**. Voir `docs/PROJECT_RESTART_AUDIT.md` pour l'état technique complet et `docs/PROJECT_ALIGNMENT_REPORT.md` pour l'audit post-lancement.

## Stack technique

| Couche          | Technologie                       |
| --------------- | --------------------------------- |
| Framework       | Next.js 16 App Router             |
| Langage         | TypeScript (strict)               |
| Style           | Tailwind CSS 4                    |
| Base de données | Supabase (PostgreSQL + RLS)       |
| Déploiement     | Vercel                            |
| Tracking        | Meta Pixel + GA4 (structure prête)|

## Design system

- **Couleurs** : `palm-cream` / `palm-blue` / `palm-gold` (définis dans `globals.css`)
- **Typo display** : Cormorant Garamond (italic, light)
- **Typo body** : Geist Sans
- **Ton** : premium, minimal, hospitalité de qualité
- **Interdit** : le mot "hôtel" — utiliser "appartements", "résidence", "hébergement"

## Structure pages

```text
/                    Homepage (7 sections)
/hebergements        6 appartements, 3 configurations avec prix
/restaurant          Page service
/cafe                Page service
/location-voiture    Page service
/galerie             10 photos client
/contact             Adresse + Maps + formulaire
/api/lead            API Supabase (POST)
```

## Fichiers de référence

- Offres et prix : `docs/services.md`
- État technique complet : `docs/PROJECT_RESTART_AUDIT.md`
- Audit post-lancement : `docs/PROJECT_ALIGNMENT_REPORT.md`
- Roadmap post-lancement : `docs/POST_LAUNCH_ROADMAP.md`
- Schéma base de données : `docs/db-schema.md`
- Parcours utilisateur : `docs/user-flows.md`
- Roadmap : `docs/roadmap.md`

## Règles absolues

1. Lire `docs/services.md` avant tout contenu hébergement
2. Ne jamais inventer des prix, menus ou descriptions
3. Exécuter `npm run build` et corriger avant de livrer
4. Ne pas refactor ce qui fonctionne
5. Voir `AGENTS.md` pour les règles complètes
