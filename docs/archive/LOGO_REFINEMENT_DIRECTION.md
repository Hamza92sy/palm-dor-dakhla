# LOGO REFINEMENT DIRECTION — Palm d'Or Dakhla

*Analyse du logo client existant — 2026-05-07*

---

## 1. Audit du logo actuel

### Ce qu'on voit

Composition circulaire. Silhouette de deux palmiers en ombrage total, occupant les 2/3 gauches du cercle. Texte "PALM DOR" positionné dans le quart supérieur droit. Fond transparent. Monochrome noir.

### Forces

| Élément | Valeur |
|---------|--------|
| Composition circulaire | Parfait pour avatar, favicon, tampon, cachet |
| Concept palmier | Littéralement "Palm d'Or" — immédiat, reconnaissable |
| Silhouette pleine | Lisible à distance, impact graphique fort |
| Fond transparent | Polyvalent, prêt pour intégration |

### Faiblesses — Liste exhaustive

**Erreur critique :**
- Le texte dit **"PALM DOR"** — il manque l'apostrophe. Le nom de la marque est **"Palm d'Or"**. Cette erreur doit être corrigée dans toute version future.

**Typographie :**
- Font générique — serif académique non identifiable, sans personnalité de luxe
- Uppercase trop rigide pour l'hospitalité haut de gamme
- Spacing des lettres trop serré — perd son lisibilité sur fond complexe
- Taille trop petite par rapport à l'icône (déséquilibre textuel)
- Absence du mot "Dakhla" — l'ancrage géographique manque totalement

**Composition et géométrie :**
- Déséquilibre lourd : palmiers 65% / texte 35%
- Le texte est compressé dans l'angle supérieur droit — pas centré sur l'axe visuel
- Le palmier de gauche sort du cercle → rupture de l'unité formelle
- La végétation basse au sol ajoute du bruit sans valeur ajoutée
- Le tronc du palmier de droite touche presque le bord du cercle

**Qualité d'illustration :**
- Frondaisons trop découpées — aspect clip-art reconnaissable
- Les feuilles ressemblent à des herbes ou fougères, pas à des palmes tropicales nobles
- Niveau de détail trop élevé pour les petits formats (favicon 16px → illisible)
- L'épaisseur du cercle est uniforme et trop lourde — manque de finesse

**Positionnement :**
- Look générique "beach bar" ou "resort économique" — pas "résidence de luxe boutique"
- Trop proche de logos de location de vacances grand public

---

## 2. Ce qui DOIT rester

```
✓ Composition circulaire (badge/cachet)
✓ Motif palmiers en silhouette — c'est l'ADN visuel direct du nom
✓ Monochrome comme version de base (adaptable en or, vert, crème)
✓ Le sentiment "destination tropicale authentique"
```

---

## 3. Ce qui DOIT être raffiné

```
✗→✓ "PALM DOR" → "PALM D'OR" (correction obligatoire)
✗→✓ Ajouter "DAKHLA" comme sous-ligne ou arc inférieur
✗→✓ Remplacer la font par un serif de luxe (Bodoni, Didot, ou Cormorant-adjacent)
✗→✓ Réduire les détails des frondaisons → formes propres et géométriques
✗→✓ Rééquilibrer : palmier 50% / texte 50% dans le cercle
✗→✓ Contenir les éléments DANS le cercle (ou les couper net dessus)
✗→✓ Affiner l'épaisseur du cercle (trait plus fin = plus élégant)
✗→✓ Supprimer la végétation basse — trop de bruit
```

---

## 4. Direction typographie

### Ce qu'il faut éviter
- Toute sans-serif → trop tech/startup
- Serifs académiques lourds (Times, Georgia) → trop générique
- Scripts ou calligraphies → trop décoratif, illisible à petite taille

### Ce qu'il faut utiliser

**Option A — Cohérence website (recommandée)**  
→ **Cormorant Garamond** en Small Caps ou Uppercase Regular  
→ Directement aligné avec la typographie du site  
→ Version light/regular, non-italic pour la lisibilité en cercle

**Option B — Luxe renforcé**  
→ **Bodoni** ou **Playfair Display SC** (Small Caps)  
→ Contraste pleins/déliés très marqué → signal luxe immédiat  
→ Large tracking (0.2em–0.35em) pour aérer

**Ce qui doit rester :**  
- Uppercase pour "PALM D'OR"  
- Uppercase + très large tracking (0.4em+) pour "DAKHLA"  
- Rapport de taille : "PALM D'OR" 2× la taille de "DAKHLA"

---

## 5. Recommandations couleur par contexte

| Version | Fond | Logo | Usage |
|---------|------|------|-------|
| **Primaire** | `#1C3A28` vert | `#B8922E` or | Footer, print, dark UI, Google Business |
| **Inverse** | `#F8F5EC` crème | `#1C3A28` vert | Navbar, fond clair |
| **Or pur** | `#1C3A28` vert | `#B8922E` or seul | Instagram avatar, favicon |
| **Monochrome** | Blanc ou transparent | `#1C3A28` vert plein | Documents, cachet, broderie |
| **Blanc** | `#1C3A28` vert | `#FFFFFF` blanc | Overlay photos, signalétique |

---

## 6. Stratégie favicon

Le logo actuel est **non-viable** en favicon 16×32px — trop de détail.

**Solution :** Version favicon dédiée = icône simplifiée uniquement.

Deux options :
1. **Une seule palme stylisée** dans le cercle — version ultra-épurée, 2-3 fronds max
2. **Initiale "P"** en Cormorant italic dans un cercle — cohérent avec le wordmark web

Format recommandé favicon :
```
Cercle plein #1C3A28 (fond)
Palme simplifiée ou "P" en #B8922E (icône)
Export : 16×16, 32×32, 48×48, 180×180 (Apple touch icon)
```

---

## 7. Système logo complet — Récapitulatif

| Variante | Format | Usage |
|----------|--------|-------|
| Logo complet | SVG + PNG 2000px | Print, web principal |
| Logo horizontal | SVG + PNG 800px large | Navbar, email header |
| Icône seule | SVG + PNG 512px | Avatar, app icon |
| Favicon | ICO + PNG 32px | Navigateur |
| Instagram | PNG 800×800px | Avatar carré |
| OG Image | PNG 1200×630px | Open Graph, partage social |

Safe area recommandée : padding min = 10% du diamètre du cercle sur tous les côtés.

---

## 8. Prompt final — Génération AI (Midjourney / DALL-E / Ideogram / Gemini)

### Prompt de génération

```
Luxury boutique hotel logo, minimalist circular badge design.

CONCEPT:
- Elegant circle frame with fine stroke weight
- Two simplified palm tree silhouettes, contained WITHIN the circle
- Palms are geometric and clean — NOT clipart, NOT grass-like fronds
- Palm fronds have smooth arching curves, 4-6 fronds per tree maximum
- Palms positioned on left half of circle, balanced

TYPOGRAPHY:
- "PALM D'OR" in Bodoni or Didot-style high contrast luxury serif
- Small caps or uppercase, generously letter-spaced (0.3em+)
- Positioned on the right half, vertically centered with the palms
- Below: "DAKHLA" in smaller uppercase sans-serif, tracked wide
- Optional: "DAKHLA" curved along the bottom arc of the circle

STYLE:
- Timeless luxury hospitality — NOT tropical beach bar
- References: Aman Hotels, La Mamounia Marrakech, One&Only branding
- Vector-perfect geometry, no texture, no gradients
- Fine detail only where it adds luxury — not noise
- Circle stroke: thin and elegant, not heavy

COLOR VERSION TO GENERATE:
- Version 1: Deep forest green #1C3A28 background, antique gold #B8922E logo
- Version 2: Warm cream #F8F5EC background, deep green #1C3A28 logo

AVOID:
- Clipart palm trees with jagged grass-like fronds
- Generic resort/beach logo aesthetic
- Script or calligraphy fonts
- Gradient fills or shadow effects
- Palm trees extending beyond the circle boundary
- Overcrowded composition
- Any tourism or travel industry clichés

OUTPUT: Circular logo badge, transparent background, white space properly balanced between icon and text. Print-ready quality.
```

### Prompt court (pour interfaces avec limite de caractères)

```
Luxury boutique hotel circular logo badge. Minimalist geometric palm tree silhouettes (2 palms, clean simplified fronds, contained in circle). "PALM D'OR" in Bodoni luxury serif uppercase with wide tracking, right-aligned in circle. "DAKHLA" smaller below. Color: deep forest green #1C3A28 + antique gold #B8922E. References: Aman Hotels, La Mamounia. NOT clipart, NOT beach bar. Timeless premium hospitality. Vector clean, transparent background.
```

---

## 9. Score de cohérence marque — Logo actuel vs site

| Dimension | Logo actuel | Site web | Gap |
|-----------|------------|---------|-----|
| Typographie | 3/10 | 9/10 | ⚠️ Critique |
| Couleurs | N/A (monochrome) | 10/10 | À adapter |
| Niveau de luxe | 4/10 | 8/10 | ⚠️ Fort |
| Lisibilité favicon | 2/10 | N/A | ⚠️ Critique |
| Concept iconique | 8/10 | 8/10 | ✅ Aligné |
| Composition | 4/10 | 9/10 | ⚠️ Important |
| **Global** | **4/10** | **9/10** | |

**Score cible post-raffinement : 8.5/10**

Le concept est bon. L'exécution doit monter de 4→8.

---

*Ce document accompagne `docs/BRAND_IDENTITY_ANALYSIS.md`.*  
*À transmettre à un designer ou utiliser comme brief pour génération AI.*
