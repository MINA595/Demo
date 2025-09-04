import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

// Read from Expo constants.extra which is set via app.json or runtime env
const supabaseUrl = (Constants.expoConfig?.extra as any)?.supabaseUrl || process.env.SUPABASE_URL || '<SUPABASE_URL>';
const supabaseAnonKey = (Constants.expoConfig?.extra as any)?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || '<SUPABASE_ANON_KEY>';

if (supabaseUrl.includes('<') || supabaseAnonKey.includes('<')) {
  // Intentionally not throwing — app can still run; developer should set values
  console.warn('Supabase URL / anon key not configured. Set them in app.json extra or environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: undefined as any, // let supabase-js choose default for RN
  },
});

export default supabase;
