import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key' &&
    supabaseAnonKey !== 'PASTE_YOUR_COPIED_ANON_KEY_HERE' &&
    !supabaseAnonKey.includes('PASTE_YOUR') &&
    supabaseUrl.startsWith('https://')
  );
};

// Initialize Supabase client if configured, otherwise provide a safe stub
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-smartpolice.supabase.co', 'placeholder-key', {
      auth: { persistSession: false }
    });
