// Utility to check environment variables

export function checkSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const status = {
    supabaseUrl: !!supabaseUrl,
    supabaseAnonKey: !!supabaseAnonKey,
    baseUrl: !!baseUrl,
    allPresent: !!supabaseUrl && !!supabaseAnonKey && !!baseUrl
  };
  
  return {
    status,
    values: {
      supabaseUrl: supabaseUrl || 'Missing',
      supabaseAnonKey: supabaseAnonKey ? 'Present (hidden for security)' : 'Missing',
      baseUrl: baseUrl || 'Missing',
    }
  };
} 