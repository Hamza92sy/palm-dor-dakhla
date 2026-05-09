# TECH_DEBT_AUDIT — Palm d'Or Dakhla

*Exécuté le 2026-05-07 — État production*

---

## Résumé exécutif

**Dette technique réelle : FAIBLE.**

Le projet est propre, TypeScript strict, 0 TODO, 0 hack, 0 import inutilisé (sauf 1 config obsolète).
Zéro refactoring nécessaire pour maintenir la stabilité en production.

---

## 1. Quick wins (actions sans risque)

### 1.1 `remotePatterns` Unsplash obsolète — ✅ CORRIGÉ

**Fichier** : `next.config.ts`

Anciennement configuré pour autoriser les images Unsplash (`images.unsplash.com`).
Toutes les images sont désormais locales (`public/assets/photos-client/`).
La configuration a été retirée le 2026-05-07.

### 1.2 Dépendance `lucide-react` — NOTE

**Fichier** : `package.json`

`lucide-react@1.8.0` est déclaré en dépendance.
**Statut** : Utilisé dans `src/components/layout/Navbar.tsx` (icônes `Menu` et `X` du menu mobile).
**Action** : Aucune — la dépendance est légitime.

### 1.3 Fichiers images non utilisés

**Localisation** : `public/assets/photos-client/`

| Fichier | Taille | Statut |
|---------|--------|--------|
| `cafe-ambiance.jpg` | 129K | Copié, jamais intégré dans le code |
| `de (130).jpg` | 1.4M | Copié, jamais intégré dans le code |
| `salon-sejour.jpg` | 1.7M | Réservé futur usage (selon RESTART_AUDIT) |

**Action** : Peuvent être supprimés ou gardés. Impact nul sur le build.
Si supprimés : vérifier que le code ne les référence pas avant (`grep -r "cafe-ambiance\|de (130)\|salon-sejour" src/`).

---

## 2. Risques production réels

### 2.1 Variables ENV Vercel — 🔴 CRITIQUE

**Risque** : Si `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` ne sont pas configurées sur Vercel, le site est live mais :
- Formulaires Supabase = silencieusement inactifs
- CTA WhatsApp = URL malformée sans numéro

**Vérification** : Vercel Dashboard → Settings → Environment Variables

### 2.2 Note Google 5★ · 180+ hardcodée — 🟠 CRÉDIBILITÉ

**Fichier** : `src/lib/google-reviews.ts`
**Risque** : Le chiffre "180+" est hardcodé. S'il est incorrect, c'est une fausse promesse visible.
**Action** : Confirmer avec client avant toute campagne publicitaire.

### 2.3 Images sources non pré-converties en WebP — 🟡 PERFORMANCE

**Fichiers** : `de (175).jpg` (1.6M), `de (171).jpg` (1.5M), `de (199).jpg` (974K), `de (218).jpg` (807K)

Next.js convertit automatiquement en AVIF/WebP à la volée, mais les fichiers sources sont lourds.
Le cache 1 an (`minimumCacheTTL: 31536000`) compense après le premier hit.

**Impact** : Premier chargement lent pour un nouvel utilisateur sur ces images.
**Action** : Pré-convertir en WebP avec `cwebp` ou `sharp` si Core Web Vitals deviennent un enjeu.

### 2.4 `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local` — 🟠 SÉCURITÉ

**Risque** : Cette clé ne doit jamais être commitée dans git.
**Vérification** : `cat .gitignore | grep env` doit montrer `.env*`.
**Action** : S'assurer que `.env.local` est bien dans `.gitignore` (c'est le comportement par défaut Next.js).

---

## 3. Zéro dette détectée sur

| Élément | Statut |
|---------|--------|
| TypeScript strict | ✅ 0 `any`, 0 `as unknown`, 0 `@ts-ignore` |
| Imports inutilisés | ✅ Aucun dans `src/` |
| TODO/FIXME | ✅ Zéro dans tout le codebase |
| Build errors | ✅ 15/15 pages, 0 erreur |
| Over-engineering | ✅ Code simple, pas d'abstractions prématurées |
| Duplication JSX | ✅ `ServicePage.tsx` utilisé pour 4 pages services |
| Images non-optimisées | ✅ `next/image` avec `fill`, `sizes`, `priority` partout |
| Dépendances obsolètes | ✅ Toutes à jour (Next.js 16, React 19, Tailwind 4) |

---

## 4. Architecture — points solides à conserver

| Composant/Fichier | Rôle | Ne pas toucher car |
|-------------------|------|--------------------|
| `src/lib/services.ts` | ServiceType + messages WhatsApp | Partagé par tous les CTAs du site |
| `src/lib/config.ts` | SITE_URL, coords, email, WA | Utilisé par canonical, schema.org, sitemap |
| `src/lib/gallery.ts` | GALLERY_IMAGES | Partagé entre homepage et /galerie |
| `src/app/layout.tsx` | Schema.org, OG global, tracking | Régression SEO garantie si mal modifié |
| `src/components/service/ServicePage.tsx` | Template 4 pages services | Changement = impact global sur restaurant, café, voiture, hébergements |
| `src/app/api/lead/route.ts` | API Supabase leads | Point d'entrée critique — ne pas modifier sans tester |

---

## 5. Recommandations

**Ne pas faire** :
- Refactoring du design system (globals.css) — stable
- Restructurer les composants — bien organisés
- Changer le système images — 0 Unsplash, tout est local, tout fonctionne
- Ajouter des dépendances non nécessaires

**Faire avant v2** :
- Vérifier ENV Vercel (bloquant)
- Pré-convertir les images `de (*.jpg)` lourdes en WebP si Core Web Vitals dégradés

---

*Prochaine révision : avant tout ajout de fonctionnalité V2*
