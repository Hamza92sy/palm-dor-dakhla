# TRACKING SETUP — Palm d'Or Dakhla
*Guide d'activation Meta Pixel + GA4*
*Créé le 2026-05-07*

---

## État actuel

| Tracker | Code présent | ID configuré | Actif |
|---------|-------------|-------------|-------|
| Meta Pixel | ✅ Oui (layout.tsx) | ⚠️ Non | ❌ Non |
| GA4 | ✅ Oui (layout.tsx) | ⚠️ Non | ❌ Non |

Le code de tracking est déjà en place et conditionnel. Il s'active automatiquement dès qu'un ID est fourni via variable ENV — sans aucune modification de code.

---

## Variables ENV requises

| Variable | Format | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890123456` (15-16 chiffres) | ID du pixel Meta Ads |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | ID de mesure Google Analytics 4 |

**Activation** : ajouter ces variables dans Vercel Dashboard → Settings → Environment Variables.
Redéployer après ajout.

---

## Où le tracking est injecté

### `src/app/layout.tsx`

```tsx
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const GA_ID    = process.env.NEXT_PUBLIC_GA_ID

// Meta Pixel — injecté si PIXEL_ID défini
{PIXEL_ID && <Script id="meta-pixel" strategy="afterInteractive">...</Script>}
{PIXEL_ID && <noscript>...</noscript>}

// GA4 — injecté si GA_ID défini
{GA_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />}
{GA_ID && <Script id="gtag-init" strategy="afterInteractive">...</Script>}
```

`strategy="afterInteractive"` = les scripts chargent après l'hydratation React → n'impacte pas les Core Web Vitals.

### `src/lib/tracking.ts`

Fonctions disponibles dans tout le code :

```ts
trackLead()      // Meta: Lead, GA4: generate_lead
trackWhatsApp()  // Meta: Contact, GA4: contact
```

Ces fonctions sont déjà appelées dans :
- `src/components/home/LeadForm.tsx` — à la soumission du formulaire
- `src/components/ui/WhatsAppButton.tsx` — à chaque clic WhatsApp

---

## Événements recommandés

### Événements déjà implémentés ✅

| Événement | Déclencheur | Meta | GA4 |
|-----------|-------------|------|-----|
| `PageView` | Chargement de chaque page | `fbq('track', 'PageView')` | `gtag('config', GA_ID)` |
| `Lead` | Soumission formulaire lead | `fbq('track', 'Lead')` | `event: generate_lead` |
| `Contact` | Clic bouton WhatsApp | `fbq('track', 'Contact')` | `event: contact` |

### Événements à ajouter (optionnels, V2)

| Événement | Déclencheur recommandé | Valeur business |
|-----------|----------------------|----------------|
| `ViewContent` | Visite `/hebergements`, `/restaurant`, `/cafe` | Mesure intérêt par service |
| `InitiateCheckout` | Clic CTA "Réserver" sur `/hebergements` | Signale intention de réservation forte |
| `Purchase` | Confirmation réservation (V2 avec table reservations) | Conversion finale |
| `Search` | Futur moteur recherche dispo (V3+) | Intention recherche |

Pour ajouter un événement :
```ts
// src/lib/tracking.ts
export function trackViewContent(contentName: string) {
  window.fbq?.('track', 'ViewContent', { content_name: contentName })
  window.gtag?.('event', 'view_item', { item_name: contentName })
}
```

---

## Procédure d'activation Meta Pixel

### Étape 1 — Créer le Pixel

1. [business.facebook.com](https://business.facebook.com) → **Events Manager**
2. **Connecter des sources de données** → **Web**
3. **API Meta Pixel** → nommer le pixel : `Palm d'Or Dakhla`
4. Copier l'ID Pixel (ex. `1234567890123456`)

### Étape 2 — Ajouter dans Vercel

```
Variable : NEXT_PUBLIC_META_PIXEL_ID
Valeur   : 1234567890123456
```

### Étape 3 — Vérifier

Installer l'extension Chrome **Meta Pixel Helper**.
Visiter `https://palmdordakhla.com` — le pixel doit être détecté en vert.

### Étape 4 — Test des événements

Dans **Events Manager** → **Test Events** :
- Visiter le site → vérifier `PageView`
- Soumettre un formulaire test → vérifier `Lead`
- Cliquer WhatsApp → vérifier `Contact`

---

## Procédure d'activation GA4

### Étape 1 — Créer la propriété GA4

1. [analytics.google.com](https://analytics.google.com) → **Admin** → **Create Property**
2. Nommer : `Palm d'Or Dakhla`
3. Fuseau horaire : `Maroc (UTC+1)` / Devise : `MAD`
4. **Web stream** → entrer `palmdordakhla.com`
5. Copier le **Measurement ID** : `G-XXXXXXXXXX`

### Étape 2 — Ajouter dans Vercel

```
Variable : NEXT_PUBLIC_GA_ID
Valeur   : G-XXXXXXXXXX
```

### Étape 3 — Vérifier

Dans GA4 → **Realtime** : visiter le site → observer le trafic en temps réel.

### Étape 4 — Configurer Google Search Console (recommandé)

Dans GA4 → **Admin** → **Product Links** → **Search Console Linking** : lier la propriété Search Console pour obtenir les données de mots-clés dans GA4.

---

## Remarque : Conformité RGPD / ePrivacy

Le Maroc est sous la **loi 09-08** sur la protection des données personnelles. Pour une audience incluant des visiteurs européens, une bannière de consentement est recommandée.

Implémentation recommandée (V1.2 si audience EU) : **Cookiebot** ou **Axeptio** (léger, français).

Pour l'instant, le site cible principalement une audience locale/nationale — la conformité stricte RGPD est de moindre urgence mais à prévoir avant toute campagne ciblant l'Europe.
