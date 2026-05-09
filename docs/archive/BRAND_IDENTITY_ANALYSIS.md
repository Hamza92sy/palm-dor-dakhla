# BRAND IDENTITY ANALYSIS — Palm d'Or Dakhla

*Analyse complète du système de design — 2026-05-07*  
*Basée sur : globals.css, Navbar.tsx, Footer.tsx, Hero.tsx, ServicePage.tsx*

---

## 1. Identité de marque actuelle

### Catégorie visuelle
**Luxe boutique côtier marocain** — ni resort international standardisé, ni riad traditionnel.  
Le positionnement est à mi-chemin : premium accessible, chaleureusement accueillant, ancré dans Dakhla.

### Archétypes de référence visuels
- Hôtels de charme provençaux (Cormorant Garamond, espacement généreux)
- Identités riad marocaines contemporaines (or chaud, vert profond, crème)
- Marques côtières méditerranéennes premium (minimalisme, blanc/crème, traits fins)

### Perception émotionnelle
```
Calme → Raffinement → Chaleur → Authenticité → Confiance
```
Pas : froid, corporate, générique, ou surchargé.

---

## 2. Palette de couleurs exacte

### Couleurs primaires

| Nom | HEX | Usage | Rôle |
|-----|-----|-------|------|
| `palm-blue` | `#1C3A28` | Textes principaux, footer, overlays | Couleur signature — vert forêt profond |
| `palm-blue-light` | `#2B4E38` | Hover states, variantes légères | Version claire du primaire |
| `palm-gold` | `#B8922E` | Accents, labels, dividers, CTA hover | Or antique chaud — couleur accent principale |
| `palm-gold-muted` | `#D4B880` | Texte clair sur dark, icônes secondaires | Gold désaturé pour hiérarchie |
| `palm-cream` | `#F8F5EC` | Background principal, navbar | Fond chaud organique |
| `palm-cream-dark` | `#EDE5D5` | Cards, sections alternées | Variante fond sombre |

### Couleurs système

| HEX | Usage |
|-----|-------|
| `#F8F4ED` | `--background` (identique à palm-cream) |
| `#1C1917` | `--foreground` — near-black chaud |
| `#25D366` | WhatsApp vert (fonctionnel uniquement) |

### Recommandations logo — combinaisons validées

**Version primaire (fond sombre / footer / dark contexts) :**
```
Or #B8922E + Crème #F8F5EC sur fond #1C3A28
```

**Version secondaire (fond clair / navbar / print) :**
```
Vert #1C3A28 + Or #B8922E sur fond #F8F5EC ou blanc
```

**Version monochrome (documents, tampon, favicon dark) :**
```
#1C3A28 uniquement — vert forêt plein
```

**Version inversée (fond blanc pur, digital clair) :**
```
#1C3A28 texte + #B8922E accent — sur blanc #FFFFFF
```

**Ce qu'il ne faut PAS faire :**
- Or seul sur blanc → contraste insuffisant (ratio ~2.8:1)
- Noir pur `#000000` → trop froid, casse la chaleur organique
- Gold très saturé `#FFD700` → trop commercial, perd le raffinement antique

---

## 3. Typographie — Analyse

### Display : Cormorant Garamond

| Propriété | Valeur |
|-----------|--------|
| Famille | Cormorant Garamond |
| Graisses utilisées | 300 (light), 400, 500, 600 |
| Styles utilisés | Normal + **Italic** (dominant) |
| Taille hero | `clamp(4rem, 12vw, 9rem)` — 64px à 144px |
| Taille sections | `text-3xl` à `text-6xl` (30–60px) |
| Taille navbar logo | `text-xl md:text-2xl` (20–24px) |

**Personnalité :** Élégance classique française, hospitalité de charme, écriture de qualité.  
L'italic light est la signature typographique la plus forte de la marque.

### Corps : Geist Sans

| Propriété | Valeur |
|-----------|--------|
| Usage | Navigation, labels, body, CTA |
| Caractéristique | Minimaliste, neutre, moderne |
| Rôle | Contrebalance la sophistication du display serif |

### Labels (microtexte)

Présents sur tous les éléments fonctionnels :
- Taille : `text-[9px]` à `text-[11px]`
- Espacement : `tracking-[0.28em]` à `tracking-[0.6em]` (très large)
- Case : `uppercase` systématique
- Couleur : `palm-gold`, `palm-blue/40`, `white/50`
- Effet : identitaire fort — signature visuelle immédiatement reconnaissable

### Recommendation typographie logo

Le logo **doit utiliser Cormorant Garamond Italic Light** pour "Palm d'Or".  
"Dakhla" en Geist Sans ou toute sans-serif minimaliste avec tracking large uppercase est correct tel quel.

L'évolution possible pour un logo vector : styliser légèrement l'italic — plus de contraste entre pleins et déliés — pour une meilleure lisibilité aux petites tailles.

---

## 4. Langage visuel — Patterns récurrents

### Dividers
- Ligne or fine horizontale : `h-px bg-palm-gold opacity-80`
- Ligne dégradée : `bg-gradient-to-r from-transparent via-palm-gold/50 to-transparent`
- Usage : entre sections, dans footer, autour des CTA bands

### Espacements
- Sections : `py-16 md:py-24` (64–96px)
- Composants internes : `gap-4` à `gap-6`
- Max width standard : `max-w-4xl mx-auto px-5 sm:px-8 lg:px-10`
- Principe : généreux, aéré, jamais encombré

### Bordures
- `border-palm-gold/15` → présence très subtile de l'or
- `border-palm-gold/60` → état hover, accent visible
- Radius : `rounded-full` (CTA) ou `rounded-sm` (cartes, galerie)

### Ombres
- `shadow-[0_2px_24px_rgba(24,54,79,0.07)]` → ultra-subtle, on scroll
- `shadow-[0_8px_30px_rgba(0,0,0,0.15)]` → bouton CTA principal

### Overlays photos
- `bg-palm-blue/55` → overlay hero homepage
- `bg-palm-blue/60` → overlay pages service
- Toujours vert forêt, jamais noir pur

---

## 5. Contraintes logo — Placement technique

### Navbar

| Contrainte | Valeur |
|-----------|--------|
| Hauteur navbar | `h-20 md:h-24` → 80px (mobile) / 96px (desktop) |
| Zone logo disponible | ≈ 50px hauteur max |
| Fond navbar | `bg-palm-cream/96` — crème translucide |
| Logo actuel | Typographique 2 lignes : "Palm d'Or" italic / "Dakhla" uppercase |
| Largeur max recommandée | 140–160px pour ne pas empiéter sur navigation |

**Format : horizontal ou stacked 2 lignes — pas d'icône large seul.**

### Footer

| Contrainte | Valeur |
|-----------|--------|
| Fond | `bg-palm-blue` → `#1C3A28` |
| Logo couleur | Blanc + gold muted (`text-white`, `text-palm-gold-muted`) |
| Taille | `text-2xl` pour "Palm d'Or" |

### Favicon

| Contexte | Contrainte |
|---------|-----------|
| Taille minimale | 16×16px (browser tab) |
| Taille optimale | 32×32, 48×48 |
| Lecture minimale | Une seule lettre "P" ou palme stylisée |
| Fond adaptatif | Doit fonctionner sur fond blanc ET fond sombre (dark mode) |

**Recommandation favicon :** Initiale "P" en Cormorant italic dans un carré crème, ou palme géométrique or sur fond vert. Pas le logotype complet — illisible à 16px.

### OpenGraph (1200×630px)

- Logo complet visible dans le 1/3 supérieur gauche sur fond `#1C3A28`
- Texte "Palm d'Or Dakhla" en blanc
- Sous-titre service en or

### Google Business (avatar 250×250px)

- Icône carré ou rond
- Version simplifiée : "P" ou palme — pas le logotype complet
- Fond : `#1C3A28` vert avec or `#B8922E`

### Instagram (avatar circulaire 110px→320px)

- Fond plein `#1C3A28`
- Initiale "P" en Cormorant italic ou palme stylisée en `#B8922E`
- Le logotype complet "Palm d'Or / Dakhla" est illisible en avatar Instagram

---

## 6. Analyse du logo actuel (typographique)

### Structure actuelle (code)
```
Ligne 1 : "Palm d'Or"      — Cormorant Garamond, light italic, ~24px, #1C3A28
Ligne 2 : "Dakhla"         — Geist Sans, 9px, uppercase, tracking 0.45em, #B8922E
```

### Forces
- ✅ Nom de marque immédiatement lisible
- ✅ Contraste display serif vs sans-serif — tension visuelle intentionnelle
- ✅ "Dakhla" en or renforce l'ancrage géographique et la hiérarchie couleur
- ✅ L'italic Cormorant donne une signature premium reconnaissable
- ✅ Parfaitement intégré à la charte — aucune dissonance

### Limites
- ⚠️ Typographique uniquement → pas de marqueur iconique pour les contextes petits (favicon, avatar)
- ⚠️ Pas de version vectorielle autonome exploitable sans la font
- ⚠️ Dépend de la police chargée → risque flash FOUT si fallback activé

### Ce qui doit rester intact
- La hiérarchie "Palm d'Or" (grand, italic serif) / "Dakhla" (petit, uppercase, or)
- Le rapport de taille approximatif 3:1 entre les deux lignes
- La couleur exacte `#B8922E` pour "Dakhla"
- L'espacement aéré entre les deux lignes

### Ce qui peut être amélioré
- Ajouter un élément iconique : palme stylisée géométrique ou motif arabesque minimal — utilisable seul en favicon/avatar
- Version vectorielle SVG exportée en dehors des polices web (autonomie totale)
- Variante horizontale : icône + "Palm d'Or" sur une ligne pour usages spécifiques

---

## 7. Direction logo — Recommandation finale

### Concept recommandé

Un logo système à **2 composants** :

**A. Logotype** (usage texte uniquement — actuel, à conserver)
```
Palm d'Or          ← Cormorant Garamond Italic Light
    DAKHLA         ← Geist Sans / toute sans-serif uppercase tracked
```

**B. Icône** (usage avatar, favicon, signature seule)
```
Palme stylisée géométrique    ← Or #B8922E
Forme : une ou deux feuilles de palme — épurée, pas figurative
Optionnel : inscrite dans un cercle ou losange crème/vert
```

### Exports nécessaires

| Format | Taille | Usage | Version |
|--------|--------|-------|---------|
| SVG | Vectoriel | Web, print illimité | Logotype + icône |
| PNG 512×512 | 72dpi | Google Business, app | Icône seule sur fond vert |
| PNG 1200×630 | 72dpi | OpenGraph | Logotype sur fond vert |
| PNG 192×192 | 72dpi | PWA / favicon moderne | Icône seule |
| ICO 32×32 | — | Favicon navigateur | Icône simplifiée |
| PNG 2000px large | 300dpi | Print, Instagram HD | Logotype complet blanc sur vert |

### Versions couleur requises

| Version | Fond | Logo | Contexte |
|---------|------|------|---------|
| Principale | `#1C3A28` vert | `#F8F5EC` crème + `#B8922E` or | Footer, print, dark UI |
| Inverse | `#F8F5EC` crème | `#1C3A28` vert + `#B8922E` or | Navbar, fond clair |
| Monochrome | Transparent | `#1C3A28` vert plein | Documents, tampon |
| Or seul | `#1C3A28` vert | `#B8922E` or uniquement | Favicons, avatars |

---

## 8. Ce que le logo DOIT préserver

```
1. Nom complet "Palm d'Or" — pas d'abréviation
2. "Dakhla" en sous-titre — ancrage géographique fort
3. Or antique #B8922E — pas d'or jaune vif
4. Vert forêt #1C3A28 — pas de vert plus clair ou plus froid
5. Serif italic comme élément dominant du wordmark
6. Sensation premium calme — pas dynamique ou sport
```

## 9. Ce que le logo peut améliorer

```
1. Ajouter un élément iconique exploitable seul (favicon, avatar)
2. Renforcer le contraste des pleins/déliés pour les petites tailles
3. Assurer la lisibilité à 16px (favicon) sans le wordmark complet
4. Créer une version horizontale pour les usages larges (header emails, print)
```

---

*Document créé à partir de l'analyse complète du système de design en production.*  
*Logo client physique : à analyser si fourni séparément.*
