---
playbook: deployment-checklist
version: 1.0
project: palm-dor-dakhla
---

# Playbook — Deployment Checklist

Utiliser ce playbook avant tout push vers la production Vercel. Ne pas déployer sans avoir complété cette checklist.

---

## Pré-déploiement (local)

### Build

```bash
npm run build
```

- [ ] Build réussi (0 erreur TypeScript, 0 erreur ESLint bloquante)
- [ ] Aucun warning critique dans la sortie build

### Test local

```bash
npm run dev
```

- [ ] Page d'accueil charge correctement
- [ ] Pages appartements accessibles
- [ ] Formulaire de réservation accessible à `/reserver`
- [ ] Dashboard `/admin` accessible (si protégé : auth fonctionne)

### Flux réservation (golden path)

- [ ] Sélectionner un appartement
- [ ] Remplir le formulaire (dates, nom, email, téléphone)
- [ ] Soumettre → confirmation affichée
- [ ] Réservation visible dans le dashboard admin
- [ ] Email de confirmation envoyé (ou vérifié via logs si test)

---

## Variables d'environnement

Vérifier sur Vercel Dashboard > Settings > Environment Variables :

- [ ] `SUPABASE_URL` — présent en Production
- [ ] `SUPABASE_SERVICE_KEY` — présent en Production
- [ ] `NEXT_PUBLIC_SUPABASE_URL` — présent en Production
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — présent en Production
- [ ] `RESEND_API_KEY` — présent en Production
- [ ] `NEXT_PUBLIC_SITE_URL` — présent et pointe vers le bon domaine

---

## Déploiement Vercel

```bash
git add [fichiers concernés]
git commit -m "feat/fix: description"
git push origin main
```

- [ ] Push effectué
- [ ] Build Vercel démarré (vérifier Vercel Dashboard)
- [ ] Build Vercel réussi

---

## Post-déploiement (production)

### Test production

- [ ] Ouvrir le site en production (URL Vercel ou domaine custom)
- [ ] Page d'accueil se charge
- [ ] Navigation fonctionne
- [ ] Images chargent correctement

### Vérifier emails

- [ ] Envoyer une réservation de test en production (ou vérifier les logs Resend)
- [ ] Email propriétaire reçu
- [ ] Email client reçu

### Vérifier dashboard

- [ ] `/admin` accessible
- [ ] Réservation de test visible
- [ ] Actions (accepter / refuser) fonctionnelles

---

## En cas de problème post-déploiement

**Rollback rapide (< 2 min) :**
Vercel Dashboard > Deployments > Deployment précédent > "Promote to Production"

**Rollback Git :**
```bash
git revert HEAD
git push origin main
```

Ne pas paniquer. Le rollback Vercel est instantané.
