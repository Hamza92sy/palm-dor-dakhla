# ADMIN-WORKFLOW — Guide opérateur Palm d'Or Dakhla

> **Version :** V2.3 — mis à jour le 2026-05-10
> **Référence architecture :** PROGRESS.md § Admin Dashboard Architecture

---

## Accès au dashboard

- URL : `https://palmdordakhla.com/admin`
- Login : mot de passe unique (admin)
- Session : 7 jours (cookie HttpOnly sécurisé)
- En cas de perte du mot de passe : contacter le prestataire technique (variable `ADMIN_SECRET` sur Vercel)

---

## Lire une nouvelle demande

Le tableau affiche 8 colonnes : **Date · Nom+Service · Téléphone · Email · Appartement · Séjour · Statut · Actions**

Les informations clés sont visibles sans expansion :
- Nom du client et service demandé
- Téléphone (cliquer pour appeler depuis mobile)
- Email (affiché si fourni)
- Appartement demandé et dates de séjour
- Statut et décision

Pour voir le message client ou modifier l'appartement/dates : cliquer la ligne pour ouvrir le panneau **Détails**.

---

## Traiter une demande hébergement

### Étape 1 — Vérifier la disponibilité

Avant d'accepter, vérifier manuellement qu'aucun autre lead accepté n'occupe le même appartement aux mêmes dates. Le système ne bloque pas automatiquement les doublons.

### Étape 2 — Décider

**Accepter (✓)** :
- Cliquer le bouton vert ✓ Accepter directement dans la ligne du tableau
- Ou ouvrir le panneau Détails → DecisionPanel → ajouter une note optionnelle → Accepter
- → Un email de confirmation est automatiquement envoyé au client
- → Le statut passe à **Accepté** (terminal, non réversible dans l'UI)

**Refuser (✗)** :
- Cliquer le bouton rouge ✗ Refuser directement dans la ligne
- Ou ouvrir le panneau Détails → ajouter une note de refus → Refuser
- → Un email de refus est automatiquement envoyé au client
- → Le statut passe à **Refusé** (terminal, non réversible dans l'UI)

> **Note décision :** une note ajoutée depuis le panneau Détails est incluse dans l'email client. Ne pas inclure d'informations sensibles ou internes dans cette note.

### Étape 3 — Contacter si besoin (WhatsApp)

Le bouton WhatsApp dans le tableau ouvre une conversation directe avec le numéro du client, avec un message prérempli. Utiliser pour :
- Confirmer les détails du séjour après acceptation
- Préciser des informations complémentaires

---

## Statuts opérationnels

Le **statut opérationnel** (colonne Statut) et la **décision** (Accepté/Refusé) sont deux axes indépendants.

### Statuts opérationnels (suivi interne)

| Statut | Signification |
|--------|--------------|
| Nouveau | Demande reçue, pas encore traitée |
| Contacté | Le client a été contacté (appel ou WhatsApp) |
| Confirmé | Séjour confirmé verbalement ou par écrit |
| Annulé | Annulé par le client ou l'admin |

Changer le statut via le menu déroulant dans la colonne Statut.

### Décision finale

Une fois Accepté ou Refusé, le `StatusSelect` disparaît. La décision est finale dans l'interface. Pour corriger une erreur, contacter le prestataire (modification directe en base Supabase).

---

## Emails automatiques — fonctionnement réel

### Email de confirmation (Accepté)

Envoyé automatiquement dès le clic Accepter. Contient :
- Nom du client
- Service / appartement
- Dates de séjour (arrivée, nuitées, départ)
- Note de décision si renseignée
- Lien WhatsApp Palm d'Or (pour que le client vous contacte)

### Email de refus (Refusé)

Envoyé automatiquement dès le clic Refuser. Contient :
- Message de refus standard
- Note de décision si renseignée
- Lien WhatsApp Palm d'Or (pour que le client vous contacte)

### Fiabilité de l'envoi

L'envoi est dit "fire-and-forget" : **le statut en base est mis à jour même si l'email échoue**. Si l'envoi Resend échoue (panne réseau, quota...), le statut DB reste correct mais le client ne reçoit rien.

---

## Badges email — que signifient-ils

Dans la colonne Statut, un badge peut apparaître après l'envoi d'un email décision :

| Badge | Signification |
|-------|--------------|
| ✉ Non confirmé | Email envoyé mais pas encore de confirmation de livraison (< 30 min = normal) |
| ✓ Délivré | Email accepté par le serveur email du client (confirmation Resend) |
| ⚠ Bounce | Email rejeté par le serveur (adresse incorrecte ou serveur injoignable) |
| ⚠ Plainte | Client a signalé l'email comme spam |

> **Important :** "Délivré" confirme que le serveur du client a accepté l'email. Cela **ne garantit pas** que l'email est visible dans la boîte principale — il peut être en Spam, en Promotions (Gmail), ou dans un autre onglet.

---

## Si le client dit "je n'ai rien reçu"

Procédure :

1. Vérifier dans le dashboard : le badge est-il ✓ Délivré ou ✉ Non confirmé ?
2. Demander au client de vérifier :
   - Dossier **Spam** / **Indésirables**
   - Onglet **Promotions** (Gmail)
   - Onglet **Autres** (Outlook)
3. Si non trouvé : **contacter via WhatsApp** — le bouton WA est mis en évidence dans le dashboard si le statut est bounce/failed/complained
4. Confirmer les détails du séjour directement sur WhatsApp

**Règle opérateur :** le badge ≠ ✓ Délivré après 30 min OU le client dit ne rien avoir reçu → WhatsApp systématique. Ne pas attendre.

---

## Si le client n'a pas d'email

Certains leads (services restaurant, café, location) peuvent ne pas avoir d'email.

- La décision est quand même enregistrée normalement
- L'email client est simplement ignoré (log interne, pas d'erreur)
- Utiliser WhatsApp pour communiquer la décision

---

## Modifier appartement ou dates

Si le client veut changer d'appartement ou de dates après soumission :

1. Ouvrir le panneau Détails (cliquer la ligne)
2. Utiliser **ApartmentSelect** pour changer l'appartement
3. Utiliser **DateRangePicker** pour modifier arrivée/départ
4. Les nuitées sont recalculées automatiquement
5. Confirmer via WhatsApp avec le client

> Ces modifications ne déclenchent pas de nouvel email automatique au client.

---

## Notes internes vs note de décision

| Type | Visible par le client ? | Où |
|------|------------------------|-----|
| Notes internes (LeadNotes) | ❌ Non — usage admin uniquement | Panneau Détails, sauvegarde auto |
| Note de décision | ✅ Oui — incluse dans l'email | DecisionPanel (avant clic Accepter/Refuser) |

---

## Export CSV

Bouton **Exporter CSV** en haut du dashboard.

- Format : UTF-8 avec BOM (compatible Excel direct, double-clic pour ouvrir)
- 15 colonnes : Date · Nom · Téléphone · Email · Service · Message · Statut · Langue · Appartement · Arrivée · Départ · Nuitées · Notes · Décision · Date décision
- Toutes les demandes sont incluses (pas de filtre sur l'export)

---

## Filtres et recherche

- **Service** : Hébergement / Restaurant / Café / Location
- **Statut** : Nouveau / Contacté / Confirmé / Annulé / Accepté / Refusé
- **Recherche** : nom ou téléphone (debounce 350ms — résultats après arrêt de frappe)
- Les filtres s'appliquent via l'URL — partageables ou mémorisables dans le navigateur

---

## Limites connues du dashboard

- **Pas de protection double-booking** : deux demandes sur les mêmes dates/appartement peuvent coexister. L'admin gère le conflit manuellement.
- **Décision irréversible via l'UI** : une fois Accepté ou Refusé, impossible de revenir en arrière sans modification directe en base Supabase.
- **Pas de vue mobile optimisée** : la table est horizontale avec scroll sur petit écran. Recommandé : utiliser depuis desktop ou tablette.
- **Un seul compte admin** : pas de multi-utilisateur.
