-- Migration 005 — Email delivery tracking
-- Adds Resend delivery status columns to leads table
-- Applied: 2026-05-10

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS email_status      text        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS email_provider_id text        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS email_status_at   timestamptz DEFAULT NULL;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_email_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_email_status_check
  CHECK (
    email_status IS NULL OR
    email_status IN ('sent', 'delivered', 'bounced', 'complained', 'failed')
  );
