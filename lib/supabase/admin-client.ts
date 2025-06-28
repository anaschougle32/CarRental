import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create an admin client with service role key for admin operations
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  
  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }
  
  if (!supabaseServiceKey) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY, falling back to anon key');
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    
    if (!supabaseAnonKey) {
      throw new Error('Missing both SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storageKey: 'ziocarrentals-admin-fallback-auth',
      }
    });
  }
  
  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      storageKey: 'ziocarrentals-admin-auth',
    }
  });
}; 