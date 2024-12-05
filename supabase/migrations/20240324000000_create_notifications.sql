-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('lead_due', 'lead_overdue', 'analytics', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_read boolean DEFAULT false,
  data jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS notifications_timestamp_idx ON notifications(timestamp);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON notifications(is_read);
CREATE INDEX IF NOT EXISTS notifications_type_idx ON notifications(type);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for notifications" ON notifications
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for notifications" ON notifications
  FOR UPDATE USING (true);