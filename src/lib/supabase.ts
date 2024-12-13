import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage // Explicitly set storage
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any): Error => {
  console.error('Supabase error:', error);
  
  if (!error) {
    return new Error('An unknown error occurred');
  }

  if (error?.message?.includes('JWT')) {
    return new Error('Your session has expired. Please sign in again.');
  }
  
  if (error?.message?.includes('network')) {
    return new Error('Unable to connect to the database. Please check your internet connection.');
  }

  if (error?.code === '401' || error?.code === 'PGRST301') {
    return new Error('Please sign in to continue.');
  }

  return new Error(error?.message || 'An unexpected error occurred');
};

// Helper function to check if user is authenticated
export const checkAuth = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!session;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

// Helper function to handle offline scenarios and auth
export const withErrorHandling = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      throw new Error('Please sign in to continue.');
    }
    return await operation();
  } catch (error) {
    throw handleSupabaseError(error);
  }
};