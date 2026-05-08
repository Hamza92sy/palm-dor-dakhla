-- Migration: 002_leads_v1.5
-- Adds internal notes, check-in/check-out dates, and apartment type to leads

ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS check_in date;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS check_out date;
ALTER TABLE leads ADD CONSTRAINT leads_date_range_check
  CHECK (check_in IS NULL OR check_out IS NULL OR check_out >= check_in);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS apartment_type text
  CHECK (apartment_type IS NULL OR apartment_type IN ('standard', '2-chambres', 'grande-capacite'));
CREATE INDEX IF NOT EXISTS leads_check_in_idx ON leads (check_in) WHERE check_in IS NOT NULL;
CREATE INDEX IF NOT EXISTS leads_check_out_idx ON leads (check_out) WHERE check_out IS NOT NULL;
