import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local'
  );
}

/**
 * Public client for client-side and server-side read operations.
 * Operations using this client are bound by Supabase Row-Level Security (RLS).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only Admin Client that uses the Service Role Key to bypass Row-Level Security (RLS).
 * MUST ONLY be imported and called inside Next.js Server Actions or Route Handlers.
 */
export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
