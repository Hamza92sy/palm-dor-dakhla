-- Migration: 004_leads_apartment_ids
-- Étend la contrainte apartment_type pour accepter les nouveaux IDs apt-1..apt-6
-- (les valeurs legacy standard/2-chambres/grande-capacite restent valides pour les anciens leads)
-- Applied: 2026-05-xx (appliqué initialement via MCP Supabase sans fichier local)

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_apartment_type_check;
ALTER TABLE leads ADD CONSTRAINT leads_apartment_type_check
  CHECK (apartment_type IS NULL OR apartment_type IN (
    'apt-1', 'apt-2', 'apt-3', 'apt-4', 'apt-5', 'apt-6',
    'standard', '2-chambres', 'grande-capacite'
  ));
