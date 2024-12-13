-- Drop existing policies for lead_sources
DROP POLICY IF EXISTS "Users can view their own lead sources" ON lead_sources;
DROP POLICY IF EXISTS "Users can insert their own lead sources" ON lead_sources;
DROP POLICY IF EXISTS "Users can update their own lead sources" ON lead_sources;
DROP POLICY IF EXISTS "Users can delete their own lead sources" ON lead_sources;

-- Create new policies with proper user_id handling
CREATE POLICY "Users can view their own lead sources"
  ON lead_sources FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lead sources"
  ON lead_sources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lead sources"
  ON lead_sources FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lead sources"
  ON lead_sources FOR DELETE
  USING (auth.uid() = user_id);