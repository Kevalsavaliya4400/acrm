import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with retry logic
const createSupabaseClient = () => {
  const supabaseUrl = 'https://exzhiziihaajpcijivfk.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4emhpemlpaGFhanBjaWppdmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjU4MzIsImV4cCI6MjA0ODgwMTgzMn0.96WoLoW4iAa9Hb_z6wR8ADN8e9VKWwTcLBULDAL4eFA';

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    // Add retry configuration
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  });
};

export const supabase = createSupabaseClient();

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.message === 'Failed to fetch') {
    return new Error('Unable to connect to the database. Please check your internet connection.');
  }
  
  if (error.code === 'PGRST301') {
    return new Error('Database row level security policy violation.');
  }
  
  if (error.code === '23505') {
    return new Error('This record already exists.');
  }
  
  if (error.code === '23503') {
    return new Error('This operation would violate referential integrity.');
  }
  
  if (error.status === 401 || error.code === '401') {
    return new Error('Authentication required. Please log in again.');
  }
  
  if (error.status === 403 || error.code === '403') {
    return new Error('You do not have permission to perform this action.');
  }
  
  if (error.status === 404 || error.code === '404') {
    return new Error('The requested resource was not found.');
  }
  
  if (error.status === 409 || error.code === '409') {
    return new Error('This operation conflicts with another change.');
  }
  
  if (error.status >= 500) {
    return new Error('A server error occurred. Please try again later.');
  }
  
  return error;
};

// Helper function to check connection status
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('leads').select('id').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};

// Helper function to handle offline scenarios
export const withConnectionCheck = async <T>(operation: () => Promise<T>): Promise<T> => {
  const isConnected = await checkConnection();
  if (!isConnected) {
    throw new Error('No connection to the database. Please check your internet connection.');
  }
  return operation();
};