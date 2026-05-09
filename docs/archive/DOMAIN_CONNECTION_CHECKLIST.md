# DOMAIN CONNECTION CHECKLIST — Palm d'Or Dakhla
*Domaine : palmdordakhla.com — Hébergeur : Vercel — DNS : Namecheap*

---

## Résumé

| Domaine | Cible | Type |
|---------|-------|------|
| `palmdordakhla.com` (apex) | Vercel (A record) | Principal |
| `www.palmdordakhla.com` | Vercel (CNAME) | Redirect → apex |

---

## ÉTAPE 1 — Ajouter le domaine dans Vercel

1. Aller sur [vercel.com](https://vercel.com) → Dashboard
2. Sélectionner le projet **palm-dor-dakhla**
3. Onglet **Settings** → **Domains**
4. Cliquer **Add** → entrer `palmdordakhla.com` → **Add**
5. Vercel affiche les enregistrements DNS à configurer :
   - **A record** : `@` → IP fournie par Vercel (ex. `76.76.21.21`)
   - **AAAA record** : `@` → IPv6 fournie par Vercel (optionnel, recommandé)
   - **CNAME** : `www` → `cname.vercel-dns.com`
6. Cliquer **Add** à nouveau → entrer `www.palmdordakhla.com` → choisir **Redirect to `palmdordakhla.com`**

> **Note :** Vercel génère automatiquement les IPs exactes à utiliser dans l'interface.
> Copier ces valeurs avant de passer à l'étape 2.

---

## ÉTAPE 2 — Configurer DNS sur Namecheap

### 2.1 — Accéder à la gestion DNS

1. Se connecter sur [namecheap.com](https://namecheap.com)
2. Aller dans **Domain List** → cliquer sur `palmdordakhla.com` → **Manage**
3. Onglet **Advanced DNS**
4. Désactiver **Namecheap BasicDNS** si actif, ou garder Custom DNS

### 2.2 — Supprimer les enregistrements existants

Supprimer tout enregistrement A, CNAME ou ALIAS déjà présent pour `@` et `www`.

### 2.3 — Ajouter les nouveaux enregistrements

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `@` | `76.76.21.21` *(IP fournie par Vercel)* | Automatic |
| CNAME Record | `www` | `cname.vercel-dns.com` | Automatic |

> **Important :** L'IP exacte est indiquée dans le dashboard Vercel à l'étape 1.
> Ne pas utiliser une IP fixe de mémoire — toujours la copier depuis Vercel.

### 2.4 — AAAA Record (IPv6 — recommandé)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| AAAA Record | `@` | IPv6 fournie par Vercel | Automatic |

### 2.5 — Cliquer **Save All Changes**

---

## ÉTAPE 3 — Attendre la propagation DNS

| Délai | Probabilité |
|-------|-------------|
| 5–30 minutes | Souvent suffisant |
| 1–4 heures | Cas standard |
| 24–48 heures | Maximum (rare) |

Vérifier la propagation via [dnschecker.org](https://dnschecker.org) :
- Entrer `palmdordakhla.com`
- Vérifier que les A records pointent vers l'IP Vercel depuis plusieurs pays

---

## ÉTAPE 4 — Vérifications après propagation

### 4.1 — SSL automatique

Vercel génère automatiquement un certificat SSL via Let's Encrypt.
Aucune action requise — le certificat est actif en quelques minutes après la propagation DNS.

Vérifier : `https://palmdordakhla.com` — le cadenas vert doit apparaître.

### 4.2 — Redirect www → apex

Vérifier que `https://www.palmdordakhla.com` redirige bien vers `https://palmdordakhla.com` (301).

Test via terminal :
```bash
curl -I https://www.palmdordakhla.com
# Doit retourner : HTTP/2 308 et Location: https://palmdordakhla.com
```

### 4.3 — Sitemap accessible

```
https://palmdordakhla.com/sitemap.xml
```
Doit retourner le XML avec 7 URLs commençant par `https://palmdordakhla.com/...`

### 4.4 — Robots.txt

```
https://palmdordakhla.com/robots.txt
```
Doit contenir : `Sitemap: https://palmdordakhla.com/sitemap.xml`

### 4.5 — OpenGraph

Tester avec [opengraph.xyz](https://www.opengraph.xyz) ou Facebook Sharing Debugger :
- Image OG : `https://palmdordakhla.com/og-image.jpg`
- Titre : `Palm d'Or Dakhla — Restaurant, Café & Hébergements`

### 4.6 — Schema.org

Tester avec Google Rich Results Test :
`https://search.google.com/test/rich-results`
- Entrer `https://palmdordakhla.com`
- Vérifier `LodgingBusiness` + `FoodEstablishment` détectés

### 4.7 — Vérification Vercel

Dans le dashboard Vercel → Settings → Domains :
- `palmdordakhla.com` → statut **Valid Configuration** ✅
- `www.palmdordakhla.com` → statut **Valid Configuration** ✅

---

## ÉTAPE 5 — Après connexion domaine

### 5.1 — Google Search Console

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter propriété → **Domain** : `palmdordakhla.com`
3. Vérifier via DNS TXT record (Namecheap → Advanced DNS → TXT Record)
4. Une fois vérifié, soumettre le sitemap : `https://palmdordakhla.com/sitemap.xml`

### 5.2 — Mettre à jour les ENVs Vercel

Vérifier que `SITE_URL` est cohérent avec le domaine connecté.
Le code utilise `SITE_URL = 'https://palmdordakhla.com'` hardcodé dans `src/lib/config.ts` — aucun ENV à modifier.

### 5.3 — Google Business

Dès que le domaine est connecté :
- Ouvrir la fiche Google Business
- Ajouter le lien site : `https://palmdordakhla.com`
- Compléter les catégories, horaires et 7 photos minimum

---

## Rappel : ce qui ne nécessite PAS de modification de code

Le domaine `palmdordakhla.com` est déjà hardcodé dans `src/lib/config.ts` :

```ts
export const SITE_URL = 'https://palmdordakhla.com'
```

Tous les éléments suivants utiliseront automatiquement le bon domaine :
- ✅ `metadataBase` (canonicals + OG images)
- ✅ Sitemap (`/sitemap.xml`)
- ✅ Robots (`/robots.txt`)
- ✅ Schema.org (`url`, `image`)
- ✅ Canonicals sur toutes les pages

Aucun déploiement supplémentaire nécessaire pour la connexion domaine.
