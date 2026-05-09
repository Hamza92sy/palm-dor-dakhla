# BUSINESS EMAIL USAGE — Palm d'Or Dakhla
*Email professionnel : reservation@palmdordakhla.com*
*Créé le 2026-05-07*

---

## Email configuré dans le code

L'email est défini dans `src/lib/config.ts` :

```ts
export const BUSINESS_EMAIL = 'reservation@palmdordakhla.com'
```

Il est intégré dans 3 endroits :

| Endroit | Fichier | Usage |
|---------|---------|-------|
| Page Contact | `src/app/contact/page.tsx` | Lien `mailto:` cliquable dans la fiche contact |
| Footer | `src/components/layout/Footer.tsx` | Lien `mailto:` discret dans la colonne Contact |
| Schema.org | `src/app/layout.tsx` | Champ `email` dans `LodgingBusiness` — signal SEO |

---

## Recommandations par canal

### ✅ Intégré — Contact page

L'email apparaît dans la fiche contact sous un format `mailto:` cliquable.
- Position : entre la grille Téléphone/Services et les boutons CTA
- Style : cohérent avec les autres éléments de contact
- Rôle : canal secondaire pour les clients qui préfèrent l'email au WhatsApp

### ✅ Intégré — Footer

Email ajouté dans la colonne Contact, avant Instagram.
- Discret, en `text-white/45` cohérent avec le reste du footer
- Rôle : crédibilité business, référence de contact complète

### ✅ Intégré — Schema.org

Champ `email` ajouté au `LodgingBusiness` dans `layout.tsx`.
- Améliore la fiche Knowledge Graph Google
- Apparaît potentiellement dans les résultats enrichis
- Sert de signal de vérification pour Google Business

---

## Où NE PAS intégrer l'email (décisions intentionnelles)

### ❌ Formulaires (LeadForm, ServiceContactForm)

Les formulaires postent vers `/api/lead` → Supabase → WhatsApp.
Ajouter un champ email destinataire dans le formulaire déplacerait le lead hors du funnel WhatsApp-first.
Si à l'avenir on veut notifier par email à chaque lead, implémenter côté serveur (ex. via Resend/SendGrid dans `api/lead/route.ts`), pas côté client.

### ❌ CTAs principaux

Le CTA universel est WhatsApp. L'email ne doit jamais concurrencer ce canal principal.
Il reste un canal de secours, pas un entonnoir de conversion.

### ❌ Metadata SEO (title, description)

L'email n'a pas sa place dans les meta tags — inutile pour le SEO et potentiellement scraped par des bots.

---

## Chantiers futurs liés à l'email

### Notifications lead par email (V2)

Quand un prospect remplit le formulaire, le gérant ne reçoit pas encore de notification email.
Pour implémenter :
1. Ajouter un service email transactionnel (Resend recommandé — intégration simple Next.js)
2. Dans `src/app/api/lead/route.ts`, après l'insert Supabase, envoyer un email à `reservation@palmdordakhla.com` avec les détails du lead
3. ENV à ajouter : `RESEND_API_KEY`

Exemple de template :
```
Sujet : Nouveau lead Palm d'Or Dakhla — [Service] — [Nom]
Corps :
  Service : Hébergement
  Nom : Jean Dupont
  Téléphone : 0661 234 567
  Message : Je cherche un appartement pour 2 nuits...
  → Lien WhatsApp direct pour répondre
```

### Email dans Google Business

Lors de la complétion de la fiche Google Business, ajouter `reservation@palmdordakhla.com` dans le champ email de la fiche.

### Email dans Meta Business Manager

Lors de la création du compte Meta Business, utiliser `reservation@palmdordakhla.com` comme email de contact principal.

### Email dans Supabase notifications

Dans Supabase Dashboard → Auth → Email settings, configurer le "from email" si des notifications Supabase sont utilisées dans le futur.

---

## Note technique — Email avec caractère accentué

L'email initial mentionné était `réservation@palmdordakhla.com` (avec accent é).

Le code utilise `reservation@palmdordakhla.com` (sans accent) pour :
- Compatibilité universelle avec tous les clients mail (RFC 5321 standard)
- Éviter les problèmes d'encodage dans les liens `mailto:`
- Support par tous les serveurs SMTP sans SMTPUTF8

Si le prestataire email a créé l'adresse avec accent, vérifier lequel des deux formats est actif et mettre à jour `BUSINESS_EMAIL` dans `src/lib/config.ts` en conséquence.
