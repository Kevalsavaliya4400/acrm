-- Update lead_sources table with new sources
TRUNCATE TABLE lead_sources;

-- Insert new sources
INSERT INTO lead_sources (name, icon, color, is_active) VALUES
  -- Social Media
  ('Facebook', 'Facebook', '#1877F2', true),
  ('Instagram', 'Instagram', '#E4405F', true),
  ('LinkedIn', 'Linkedin', '#0A66C2', true),
  ('Twitter', 'Twitter', '#1DA1F2', true),
  ('YouTube', 'Youtube', '#FF0000', true),
  ('Pinterest', 'Image', '#E60023', true),
  ('TikTok', 'Video', '#000000', true),
  
  -- Real Estate Platforms
  ('Zillow', 'Home', '#006AFF', true),
  ('Realtor.com', 'Building', '#D92228', true),
  ('Trulia', 'House', '#62DE4A', true),
  ('Redfin', 'Building2', '#A02021', true),
  
  -- Marketing Channels
  ('Website', 'Globe', '#0EA5E9', true),
  ('Email', 'Mail', '#8B5CF6', true),
  ('Cold Call', 'Phone', '#EF4444', true),
  ('Referral', 'Users', '#10B981', true),
  ('Open House', 'Door', '#F59E0B', true),
  
  -- Advertising
  ('Google Ads', 'Search', '#4285F4', true),
  ('Bing Ads', 'Search', '#00897B', true),
  ('Display Ads', 'Image', '#F43F5E', true),
  
  -- Other
  ('Direct Mail', 'Mail', '#6366F1', true),
  ('Event', 'Calendar', '#8B5CF6', true),
  ('Partner', 'Handshake', '#059669', true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS lead_sources_name_idx ON lead_sources(name);