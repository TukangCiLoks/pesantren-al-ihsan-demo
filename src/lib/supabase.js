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

let janjiKlien = null;

/**
 * Klien tunggal untuk seluruh aplikasi (Promise; null bila env belum diisi).
 * supabase-js (~45 KB gzip) dimuat lewat import() dinamis, jadi tidak ikut di bundel
 * utama: halaman statis tidak pernah mengunduhnya. Gagal memuat → janji direset agar
 * percobaan berikutnya bisa mengulang.
 */
export function ambilKlien() {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  janjiKlien ??= import('@supabase/supabase-js')
    .then(({ createClient }) => createClient(url, anonKey))
    .catch((err) => {
      janjiKlien = null;
      throw err;
    });
  return janjiKlien;
}
