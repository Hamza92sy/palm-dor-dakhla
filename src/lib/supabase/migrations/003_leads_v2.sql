-- Migration: 003_leads_v2
-- Workflow d'approbation : email client + statuts accepted/rejected + decision tracking

-- Email client (nullable — compat anciens leads sans email)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email text;

-- Timestamp de décision admin (quand accepted/rejected)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS decision_at timestamptz;

-- Note optionnelle liée à la décision (optionnellement visible client)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS decision_note text;

-- Étendre la contrainte status (DROP obligatoire sur Postgres pour recréer)
-- Vérifier que le nom est bien "leads_status_check" avant d'appliquer
ALTER TABLE leads DROP CONSTRAINT leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN (
    'new', 'contacted', 'confirmed', 'cancelled',
    'accepted', 'rejected'
  ));

-- Index email pour recherche éventuelle
CREATE INDEX IF NOT EXISTS leads_email_idx
  ON leads (email) WHERE email IS NOT NULL;

-- Index decision_at pour reporting
CREATE INDEX IF NOT EXISTS leads_decision_at_idx
  ON leads (decision_at) WHERE decision_at IS NOT NULL;
