# BUSINESS_CONVERSION_AUDIT — Palm d'Or Dakhla

*Exécuté le 2026-05-07 — Audit conversion et crédibilité*

---

## Résumé exécutif

Le funnel WhatsApp est correctement implémenté. Chaque page pousse vers WhatsApp avec un message pré-rempli par service. Les CTA sont présents à tous les niveaux (hero, milieu de page, bas de page). Le principal risque de conversion est **l'absence de contenu visuel sur `/location-voiture`** et **la non-confirmation de la note Google**.

---

## 1. Funnel WhatsApp — État

### Messages par service

| Service | Message | Statut |
|---------|---------|--------|
| Hébergement | "Bonjour, je souhaite connaître la disponibilité et les tarifs de vos appartements à Dakhla (Standard 500 DH, 2 chambres 650 DH, grande capacité 750 DH). Quelles dates sont disponibles ?" | ✅ Production-ready |
| Restaurant | "Bonjour, je souhaite réserver une table au restaurant Palm d'Or Dakhla." | ✅ Production-ready |
| Café | "Bonjour, je souhaite venir au café Palm d'Or Dakhla." | ✅ Production-ready |
| Location voiture | "Bonjour, je souhaite louer une voiture via Palm d'Or Dakhla." | ✅ Production-ready |

### Numéro WhatsApp
- Configuré : `+212 661 931 317`
- Format affiché sur le site : `+212 661 931 317` ✅
- Format ENV : `212661931317` (sans + ni espaces) ✅

---

## 2. CTA par page

| Page | Hero CTA | Mid-page CTA | Bottom CTA | Score |
|------|----------|--------------|-----------|-------|
| `/` | ✅ 2 boutons (WA + scroll) | ✅ ExperienceSection 3×, AccomSection | ✅ LeadForm + FinalCTA | ★★★★★ |
| `/hebergements` | ✅ 2 boutons (WA + scroll-prix) | ✅ 3 cartes appartements + bouton WA chacune | ✅ Bandeau bleu + ServiceContactForm | ★★★★★ |
| `/restaurant` | ✅ Bouton WA + MenuSection | ✅ Galerie 5 plats | ✅ ServiceContactForm | ★★★★☆ |
| `/cafe` | ✅ 3 images + bouton WA | ✅ Galerie café | ✅ ServiceContactForm | ★★★★☆ |
| `/location-voiture` | ⚠️ Fond design system (sans photo véhicule) | — | ✅ ServiceContactForm | ★★★☆☆ |
| `/galerie` | — | ✅ 10 photos équilibrées | ✅ Bandeau WA | ★★★★☆ |
| `/contact` | — | ✅ Adresse + Maps + email cliquable | ✅ LeadForm | ★★★★☆ |

---

## 3. Visibilité coordonnées

| Élément | Présent | Cliquable | Pages |
|---------|---------|-----------|-------|
| Téléphone `+212 661 931 317` | ✅ | ✅ `tel:` | Footer, /contact |
| Email `reservation@palmdordakhla.com` | ✅ | ✅ `mailto:` | Footer, /contact, schema.org |
| Adresse `AV Al Walaa, Dakhla 73000` | ✅ | ✅ Lien Maps | /contact, schema.org |
| Instagram `@palm_dor_dakhla` | ✅ | ✅ Lien externe | Footer, schema.org |
| Google Maps embed | ✅ | ✅ Interactif | /contact |

---

## 4. Structure offres et prix

### Hébergements (le plus fort driver de conversion)

| Configuration | Nombre d'apparts | Capacité | Prix/nuit | CTA individuel |
|---|---|---|---|---|
| Standard | 1 | 2 personnes | 500 DH | ✅ WhatsApp |
| 2 chambres | 3 | 3–4 personnes | 650 DH | ✅ WhatsApp |
| Grande capacité | 2 | 4–5 personnes | 750 DH | ✅ WhatsApp |

**Note** : Le message WhatsApp hébergement inclut les prix (500, 650, 750 DH) — le client arrive informé, réduisant la friction.

### Restaurant
- Prix : non affichés (positionnement qualité sans friction tarifaire)
- CTA : menu complet → WhatsApp (bon levier engagement)

### Café
- Prix : non affichés
- CTA : "Nous contacter" → WhatsApp

### Location voiture
- Prix : non affichés
- **Point faible** : aucune image véhicule — conversion depuis `/location-voiture` probablement faible

---

## 5. Crédibilité locale

### Témoignages

| Élément | Statut | Risque |
|---------|--------|--------|
| 3 avis Google hardcodés | ✅ Intégrés dans `TestimonialsSection.tsx` | — |
| Note "5★ · 180+ avis" | ⚠️ Hardcodée, non vérifiée | Si incorrect → crédibilité abîmée |
| Nom des reviewers | ✅ Plausibles (Rachid, Fatima, Ahmed) | — |

**Action recommandée** : Confirmer le chiffre "180+" avec client avant toute campagne.

### SEO local

| Signal | Statut |
|--------|--------|
| Schema.org `LodgingBusiness + FoodEstablishment` | ✅ Actif |
| Schema.org `geo` (coords Dakhla) | ✅ Actif |
| Keywords `appartement dakhla`, `restaurant dakhla` dans titles | ✅ Actif |
| Google Business | ⚠️ Non complétée (critique pour Maps) |
| Backlinks locaux | ❌ Zéro pour l'instant |

---

## 6. Responsivité mobile

| Aspect | Statut | Détail |
|--------|--------|--------|
| Grilles adaptatives | ✅ | `grid-cols-1 md:grid-cols-3` partout |
| Texte mobile-first | ✅ | `text-sm md:text-base` |
| Boutons tactiles | ✅ | Padding suffisant (`py-3 px-6` minimum) |
| Formulaires | ✅ | `type="tel"`, `type="email"`, `autocomplete` |
| Placeholder numéro | ✅ | `+212 6XX XXX XXX` (format Maroc familier) |
| Images | ✅ | `next/image` avec ratios corrects |

---

## 7. Friction identifiée (à corriger)

| # | Problème | Impact | Effort correction |
|---|---------|--------|------------------|
| 1 | `/location-voiture` sans photo véhicule | Conversion faible sur cette page | Faible (client doit fournir photo) |
| 2 | Note Google 5★ non vérifiée | Crédibilité à risque si incorrecte | Très faible (question au client) |
| 3 | Google Business non complétée | Invisibilité sur Google Maps | Moyen (compte 30-45 min) |
| 4 | Tracking inactif (Meta Pixel, GA4) | Zéro données pour optimiser | Faible (15 min pour activer) |

---

## 8. Gains conversion simples (sans code)

Par ordre d'impact :

1. **Vérifier ENV Vercel** — active les CTAs WhatsApp fonctionnels en production
2. **Compléter Google Business** — visibilité Maps = trafic organique local
3. **Confirmer note Google** — crédibilité immédiate
4. **Activer Meta Pixel** — données pour optimiser les campagnes
5. **Photo véhicule** — débloque conversion `/location-voiture`

---

## 9. Cohérence branding

| Élément | Statut | Détail |
|---------|--------|--------|
| Couleurs | ✅ | `palm-cream` / `palm-blue` / `palm-gold` cohérentes partout |
| Typographie | ✅ | Cormorant Garamond (titres) + Geist Sans (corps) |
| Ton | ✅ | Premium, chaleureux, sans "hôtel" |
| Instagram `@palm_dor_dakhla` | ✅ | Mentionné dans schema.org et footer |
| Logo | ⚠️ | Pas de logo SVG — branding textuel uniquement (acceptable pour V1) |

---

*Prochaine révision : après activation tracking et analyse premiers résultats*
