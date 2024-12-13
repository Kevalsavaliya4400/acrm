-- Add location column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS location text;

-- Create index for location column
CREATE INDEX IF NOT EXISTS leads_location_idx ON leads(location);

-- Update RLS policies to include location column
CREATE POLICY "Enable read access for location column" ON leads
  FOR SELECT
  USING (true);

CREATE POLICY "Enable update access for location column" ON leads
  FOR UPDATE
  USING (true)
  WITH CHECK (true);