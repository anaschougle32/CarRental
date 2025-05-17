import { NextResponse } from 'next/server';
import { checkSupabaseEnv } from '@/lib/checkEnv';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const envStatus = checkSupabaseEnv();
  
  // Check if Supabase connection is working
  let supabaseStatus = {
    connected: false,
    message: 'Not tested'
  };
  
  if (envStatus.status.allPresent) {
    try {
      const { data, error } = await supabase.from('cars').select('count');
      if (error) {
        supabaseStatus = {
          connected: false,
          message: `Error connecting to Supabase: ${error.message}`
        };
      } else {
        supabaseStatus = {
          connected: true,
          message: 'Successfully connected to Supabase'
        };
      }
    } catch (error) {
      supabaseStatus = {
        connected: false,
        message: `Error testing Supabase connection: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    envStatus,
    supabaseStatus
  });
} 