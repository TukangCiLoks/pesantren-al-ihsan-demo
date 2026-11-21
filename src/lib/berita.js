import { supabase, isSupabaseConfigured } from './supabase.js';
import { BERITA_CONTOH } from '../data/beritaContoh.js';

// Tanpa Supabase (belum ada .env.local), tampilkan berita contoh berlabel "Contoh"
// supaya halaman tidak terlihat kosong. Begitu terhubung, data selalu dari tabel.

/** Berita publik terbaru (filter dipublikasi juga dijaga RLS di server). */
export async function ambilBeritaTerbaru(jumlah = 3) {
  if (!isSupabaseConfigured) return BERITA_CONTOH.slice(0, jumlah);
  const { data, error } = await supabase
    .from('berita')
    .select('id, judul, ringkasan, kategori, created_at')
    .eq('dipublikasi', true)
    .order('created_at', { ascending: false })
    .limit(jumlah);
  if (error) throw error;
  return data;
}

/** Satu berita publik berdasarkan id; null bila tidak ada / belum dipublikasi. */
export async function ambilBerita(id) {
  if (!isSupabaseConfigured) return BERITA_CONTOH.find((b) => b.id === id) ?? null;
  // id contoh ("contoh-1") bukan angka; jangan kirim ke database.
  if (!/^\d+$/.test(id)) return null;
  const { data, error } = await supabase
    .from('berita')
    .select('id, judul, ringkasan, isi, kategori, created_at')
    .eq('id', id)
    .eq('dipublikasi', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
