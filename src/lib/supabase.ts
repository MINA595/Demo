import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

// Get configuration from app.json
const config = Constants.expoConfig?.extra as any;

// Supabase configuration - change these in app.json to switch environments
const supabaseUrl = config?.supabaseUrl || process.env.SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = config?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Detect environment based on URL
const isLocal = supabaseUrl.includes('localhost') || supabaseUrl.includes('127.0.0.1');
const environment = isLocal ? 'LOCAL' : 'REMOTE';

console.log(`🔗 Using ${environment} Supabase: ${supabaseUrl}`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: undefined as any, // let supabase-js choose default for RN
  },
});

export default supabase;
