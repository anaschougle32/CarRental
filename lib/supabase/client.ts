import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a Supabase client (remove singleton to avoid conflicts)
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Missing Supabase environment variables');
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'ziocarrentals-auth',
    },
    global: {
      fetch: fetch.bind(globalThis),
    },
  });
};
