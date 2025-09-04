import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

// Development mode configuration
const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

// Local Supabase configuration (will be updated when supabase start completes)
const localSupabaseUrl = 'http://localhost:54321';
const localSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ5Nzc2MDAwfQ.P7I_3Y7Y5C-9gLXd1Q4eN2Z6Xr8_4C1Y1Q4eN2Z6Xr8';

// Remote Supabase configuration from app.json
const remoteSupabaseUrl = (Constants.expoConfig?.extra as any)?.supabaseUrl || process.env.SUPABASE_URL || '<SUPABASE_URL>';
const remoteSupabaseAnonKey = (Constants.expoConfig?.extra as any)?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || '<SUPABASE_ANON_KEY>';

// Choose configuration based on environment
// Set USE_LOCAL_SUPABASE=true in your environment to use local Supabase
const useLocalSupabase = process.env.USE_LOCAL_SUPABASE === 'true' || false;

const supabaseUrl = useLocalSupabase ? localSupabaseUrl : remoteSupabaseUrl;
const supabaseAnonKey = useLocalSupabase ? localSupabaseAnonKey : remoteSupabaseAnonKey;

if (supabaseUrl.includes('<') || supabaseAnonKey.includes('<')) {
  console.warn('Supabase URL / anon key not configured. Set them in app.json extra or environment variables.');
}

console.log(`Using ${useLocalSupabase ? 'LOCAL' : 'REMOTE'} Supabase: ${supabaseUrl}`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: undefined as any, // let supabase-js choose default for RN
  },
});

export default supabase;
