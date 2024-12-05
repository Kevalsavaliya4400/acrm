import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exzhiziihaajpcijivfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4emhpemlpaGFhanBjaWppdmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjU4MzIsImV4cCI6MjA0ODgwMTgzMn0.96WoLoW4iAa9Hb_z6wR8ADN8e9VKWwTcLBULDAL4eFA';

export const supabase = createClient(supabaseUrl, supabaseKey);