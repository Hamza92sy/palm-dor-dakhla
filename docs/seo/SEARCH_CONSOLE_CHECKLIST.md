# Search Console — Checklist d'indexation Palm d'Or Dakhla

## Statut technique : READY FOR INDEXING

Tous les prérequis techniques sont en place.

---

## Étape 1 — Vérification du domaine

1. Ouvrir [search.google.com/search-console](https://search.google.com/search-console)
2. Cliquer "Ajouter une propriété"
3. Choisir **"Préfixe d'URL"** (pas "Domaine")
4. Entrer : `https://palmdordakhla.com`
5. Méthode de vérification recommandée : **fichier HTML** ou **balise meta**
   - Pour la balise meta : coller la valeur dans `src/app/layout.tsx` dans la section `metadata.verification`
   - Exemple :
     ```ts
     verification: {
       google: 'VOTRE_CODE_VERIFICATION',
     }
     ```
   - Puis redéployer sur Vercel.

---

## Étape 2 — Soumettre le sitemap

1. Dans Search Console → menu gauche → "Sitemaps"
2. Entrer : `sitemap.xml`
3. Cliquer "Envoyer"
4. Vérifier le statut "Succès" (peut prendre 24-48h)

URL du sitemap : `https://palmdordakhla.com/sitemap.xml`

Pages incluses dans le sitemap :
- `https://palmdordakhla.com` — priorité 1.0
- `https://palmdordakhla.com/hebergements` — priorité 0.9
- `https://palmdordakhla.com/restaurant` — priorité 0.9
- `https://palmdordakhla.com/contact` — priorité 0.9
- `https://palmdordakhla.com/cafe` — priorité 0.85
- `https://palmdordakhla.com/location-voiture` — priorité 0.85
- `https://palmdordakhla.com/galerie` — priorité 0.8

---

## Étape 3 — Demander l'indexation manuelle (Request Indexing)

Priorité haute — à faire dans cet ordre :

1. Search Console → "Inspection d'URL"
2. Coller l'URL, cliquer "Tester l'URL en ligne"
3. Cliquer **"Demander l'indexation"**

Pages à soumettre (ordre de priorité business) :

| URL | Raison |
|-----|--------|
| `https://palmdordakhla.com` | Page d'accueil, signal de domaine |
| `https://palmdordakhla.com/hebergements` | Principal levier de revenus |
| `https://palmdordakhla.com/restaurant` | Deuxième service clé |
| `https://palmdordakhla.com/cafe` | Trafic local quotidien |
| `https://palmdordakhla.com/location-voiture` | Service différenciant |
| `https://palmdordakhla.com/contact` | Confiance + Maps |

---

## Étape 4 — Vérifier robots.txt

URL : `https://palmdordakhla.com/robots.txt`

Contenu attendu :
```
User-agent: *
Allow: /

Host: https://palmdordakhla.com
Sitemap: https://palmdordakhla.com/sitemap.xml
```

Tester avec l'outil : Search Console → "Testeur de robots.txt" (dans Ancien Search Console).

---

## Étape 5 — Lier GA4 à Search Console (optionnel mais recommandé)

1. Dans GA4 → Admin → "Liens Search Console"
2. Sélectionner la propriété `palmdordakhla.com`
3. Activer le lien

Cela active les rapports "Acquisition organique" dans GA4 avec les termes de recherche réels.

---

## Timeline d'indexation estimée

| Action | Délai estimé |
|--------|-------------|
| Verification domaine | Immédiat |
| Sitemap soumis → traité | 24–72h |
| Request Indexing → indexé | 1–7 jours |
| Premières impressions visibles | 7–14 jours |
| Rankings stables | 4–8 semaines |

---

## Monitoring recommandé (post-indexation)

**Semaine 1 :**
- Vérifier que les 6 pages sont indexées (Couverture → Pages valides)
- Confirmer aucune erreur dans le rapport "Couverture"

**Semaine 2-4 :**
- Consulter "Résultats de recherche" → quels mots-clés génèrent des impressions
- Repérer les pages avec CTR bas (titre/description à améliorer si < 2%)

**Mensuel :**
- Suivre l'évolution des positions pour les requêtes cibles
- Comparer avec les événements GA4 (`page_view`, `whatsapp_click`, `generate_lead`)

---

## Requêtes cibles par page

| Page | Requêtes prioritaires |
|------|----------------------|
| `/hebergements` | appartement dakhla, hébergement dakhla, location appartement dakhla |
| `/restaurant` | restaurant dakhla, où manger dakhla |
| `/cafe` | café dakhla, petit-déjeuner dakhla |
| `/location-voiture` | location voiture dakhla, louer voiture dakhla |
| `/contact` | palm d'or dakhla, AV Al Walaa dakhla |

---

## Notes techniques

- **canonical** : toutes les pages ont un canonical relatif résolu via `metadataBase: https://palmdordakhla.com`
- **robots global** : `index: true, follow: true` — aucun `noindex` détecté sur le site
- **sitemap** : généré dynamiquement via Next.js App Router `sitemap.ts`
- **JSON-LD** : schémas `LodgingBusiness`, `Restaurant`, `CafeOrCoffeeShop`, `AutoRental` + `FAQPage` sur chaque page de service
- **metadataBase** : configuré dans `layout.tsx` — garantit des URLs absolues correctes pour OG et canonicals
