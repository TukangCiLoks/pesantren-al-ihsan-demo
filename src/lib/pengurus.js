import { supabase, isSupabaseConfigured } from './supabase.js';
import { PENGURUS_CONTOH } from '../data/pengurusContoh.js';
import { pesanError } from './pesanError.js';

export const UNIT = {
  yayasan: 'Yayasan',
  pimpinan: 'Pimpinan Pesantren',
  unit: 'Unit Pendidikan',
};

/**
 * Pengurus aktif satu unit (publik). RLS juga menyaring `aktif` di server.
 * Tanpa Supabase → data contoh. Tabel belum dibuat (migrasi 002 belum dijalankan) →
 * error dengan pesan yang menjelaskan langkahnya.
 */
export async function ambilPengurus(unit) {
  if (!isSupabaseConfigured) return PENGURUS_CONTOH.filter((p) => p.unit === unit);
  const { data, error } = await supabase
    .from('pengurus')
    .select('id, nama, jabatan, unit, induk_id, urutan')
    .eq('unit', unit)
    .eq('aktif', true)
    .order('urutan');
  if (error) {
    // 42P01 (Postgres) / PGRST205 (PostgREST): tabel tidak ada.
    if (error.code === '42P01' || error.code === 'PGRST205') {
      throw new Error('Tabel struktur organisasi belum dibuat. Jalankan sql/002_pengurus.sql (lihat README).');
    }
    throw new Error(pesanError(error));
  }
  return data;
}
