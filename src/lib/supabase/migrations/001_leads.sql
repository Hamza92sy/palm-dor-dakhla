-- Migration: 001_leads
-- Table de stockage des demandes/réservations Palm d'Or Dakhla

CREATE TABLE IF NOT EXISTS leads (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL    DEFAULT now(),
  name        text        NOT NULL,
  phone       text        NOT NULL,
  service     text        NOT NULL,
  message     text,
  status      text        NOT NULL    DEFAULT 'new',
  source      text        NOT NULL    DEFAULT 'website',
  language    text        NOT NULL    DEFAULT 'fr',

  CONSTRAINT leads_service_check
    CHECK (service IN ('accommodation', 'restaurant', 'cafe', 'car_rental')),

  CONSTRAINT leads_status_check
    CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled')),

  CONSTRAINT leads_language_check
    CHECK (language IN ('fr', 'en'))
);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Le site web (rôle anon) peut insérer des leads
CREATE POLICY "website_can_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Aucun SELECT public — seul le service_role (admin) peut lire
-- (pas de policy SELECT → bloque automatiquement anon et authenticated)

-- Grants Postgres — requis même avec RLS (le SQL Editor ne les ajoute pas automatiquement)
-- service_role : accès complet pour les API routes serveur
GRANT ALL ON TABLE leads TO service_role;
-- anon : INSERT uniquement pour le site public (la RLS policy fait le vrai contrôle)
GRANT INSERT ON TABLE leads TO anon;

-- Index pour les requêtes dashboard
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON leads (status);
CREATE INDEX IF NOT EXISTS leads_service_idx    ON leads (service);
