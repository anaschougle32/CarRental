import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a singleton Supabase client to prevent connection issues
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

// Create a Supabase client
export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Missing Supabase environment variables');
  }
  
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      fetch: fetch.bind(globalThis),
    },
  });
  
  return supabaseInstance;
};
