import { createClient } from '@supabase/supabase-js';

// Hanya URL dan kunci anon (publik) yang boleh ada di front-end.
// Keduanya dibaca dari .env.local, tidak pernah ditulis di kode.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi. ' +
      'Salin .env.example menjadi .env.local lalu isi nilainya.',
  );
}

/** Klien tunggal untuk seluruh aplikasi; null bila env belum diisi. */
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
