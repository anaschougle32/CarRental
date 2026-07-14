import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a Supabase client (remove singleton to avoid conflicts)
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) as string;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables (URL or Anon/Publishable Key)');
    throw new Error('Missing Supabase environment variables (URL or Anon/Publishable Key)');
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
