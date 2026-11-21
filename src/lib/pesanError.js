// Pesan error bersama, dipakai formulir publik dan panel admin.

export const PESAN_JARINGAN =
  'Tidak dapat terhubung ke server. Periksa koneksi internet Anda, lalu coba lagi. Data yang sudah diisi tidak hilang.';

/**
 * Menerjemahkan error PostgREST/Postgres menjadi pesan berbahasa Indonesia.
 * Error dari server selalu punya `code`; tanpa `code` berarti gagal jaringan.
 */
export function pesanError(error) {
  if (!error?.code) return PESAN_JARINGAN;
  switch (error.code) {
    case '42501':
      return 'Anda tidak memiliki izin untuk tindakan ini.';
    case '23514':
      return 'Sebagian data tidak sesuai aturan. Periksa kembali isian Anda.';
    case 'PGRST301':
    case 'PGRST303':
      return 'Sesi Anda sudah berakhir. Silakan masuk kembali.';
    default:
      return 'Terjadi kesalahan di server. Silakan coba beberapa saat lagi.';
  }
}
