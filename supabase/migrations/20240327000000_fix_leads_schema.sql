-- Add missing columns to leads table
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS optin_status boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS optin_viewed_at timestamp with time zone;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS leads_optin_status_idx ON leads(optin_status);
CREATE INDEX IF NOT EXISTS leads_optin_viewed_at_idx ON leads(optin_viewed_at);