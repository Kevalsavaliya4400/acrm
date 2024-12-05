-- Add deleted_at column to leads table
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Create index for deleted_at column
CREATE INDEX IF NOT EXISTS leads_deleted_at_idx ON leads(deleted_at);

-- Add 'deleted' to status enum
ALTER TABLE leads 
  DROP CONSTRAINT IF EXISTS leads_status_check,
  ADD CONSTRAINT leads_status_check 
    CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed', 'deleted'));

-- Update RLS policies
CREATE POLICY "Enable read access for deleted_at column" ON leads
  FOR SELECT
  USING (true);

CREATE POLICY "Enable update access for deleted_at column" ON leads
  FOR UPDATE
  USING (true)
  WITH CHECK (true);