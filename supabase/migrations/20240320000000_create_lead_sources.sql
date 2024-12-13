-- Create lead_sources table
CREATE TABLE IF NOT EXISTS lead_sources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add default sources
INSERT INTO lead_sources (name, icon, color, is_active) VALUES
  ('Website', 'globe', '#3B82F6', true),
  ('Referral', 'users', '#10B981', true),
  ('Zillow', 'home', '#8B5CF6', true),
  ('Realtor.com', 'building', '#F59E0B', true),
  ('Cold Call', 'phone', '#EF4444', true),
  ('Social Media', 'share', '#6366F1', true);

-- Enable RLS
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for lead sources" ON lead_sources
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for lead sources" ON lead_sources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for lead sources" ON lead_sources
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for lead sources" ON lead_sources
  FOR DELETE USING (true);