import { supabase, isSupabaseConfigured } from './supabase.js';
import { BERITA_CONTOH } from '../data/beritaContoh.js';
import { pesanError } from './pesanError.js';

// Berita, pengumuman, dan agenda ada di satu tabel `berita`, dibedakan kolom `jenis`
// (sql/003_informasi.sql). Tanpa Supabase (belum ada .env.local) dipakai data contoh
// berlabel "Contoh"; begitu terhubung, data selalu dari tabel. RLS di server menjamin
// hanya yang `dipublikasi` yang terbaca publik; filter di sini hanya untuk kejelasan.

export const JENIS = { berita: 'Berita', pengumuman: 'Pengumuman', agenda: 'Agenda' };
export const PER_HALAMAN = 6;

const KOLOM_RINGKAS = 'id, judul, ringkasan, kategori, jenis, tanggal_acara, lokasi, created_at';
const KOLOM_LENGKAP = `${KOLOM_RINGKAS}, isi`;

/** Terjemahkan error, termasuk kasus migrasi 003 belum dijalankan (kolom `jenis` belum ada). */
function lempar(error) {
  if (error.code === '42703') {
    throw new Error('Kolom informasi belum dibuat. Jalankan sql/003_informasi.sql (lihat README).');
  }
  throw new Error(pesanError(error));
}

/**
 * Kata kunci pencarian dibersihkan sebelum masuk filter PostgREST `or=(…)`:
 * hanya huruf, angka, spasi, tanda hubung, dan apostrof. Tanda baca seperti , ( ) . *
 * punya arti khusus di sintaks filter, jadi dibuang agar input tidak bisa mengubah query.
 */
export const bersihkanCari = (q = '') =>
  q
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

const terbaru = (a, b) => b.created_at.localeCompare(a.created_at);

/**
 * Daftar per jenis dengan filter kategori, pencarian judul/ringkasan, dan paginasi.
 * Mengembalikan { data, total }.
 */
export async function ambilDaftar({ jenis, kategori = '', cari = '', halaman = 1 }) {
  const kata = bersihkanCari(cari);
  const dari = (halaman - 1) * PER_HALAMAN;

  if (!isSupabaseConfigured) {
    const k = kata.toLowerCase();
    const semua = BERITA_CONTOH.filter(
      (b) =>
        b.jenis === jenis &&
        (!kategori || b.kategori === kategori) &&
        (!k || `${b.judul} ${b.ringkasan}`.toLowerCase().includes(k)),
    ).sort(terbaru);
    return { data: semua.slice(dari, dari + PER_HALAMAN), total: semua.length };
  }

  let q = supabase
    .from('berita')
    .select(KOLOM_RINGKAS, { count: 'exact' })
    .eq('dipublikasi', true)
    .eq('jenis', jenis)
    .order('created_at', { ascending: false })
    .range(dari, dari + PER_HALAMAN - 1);
  if (kategori) q = q.eq('kategori', kategori);
  if (kata) q = q.or(`judul.ilike."*${kata}*",ringkasan.ilike."*${kata}*"`);

  const { data, count, error } = await q;
  if (error) lempar(error);
  return { data, total: count ?? 0 };
}

/** Kategori yang dipakai pada satu jenis (untuk tombol filter). */
export async function ambilKategori(jenis) {
  let daftar;
  if (!isSupabaseConfigured) {
    daftar = BERITA_CONTOH.filter((b) => b.jenis === jenis).map((b) => b.kategori);
  } else {
    const { data, error } = await supabase
      .from('berita')
      .select('kategori')
      .eq('dipublikasi', true)
      .eq('jenis', jenis)
      .not('kategori', 'is', null);
    if (error) lempar(error);
    daftar = data.map((d) => d.kategori);
  }
  return [...new Set(daftar.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'id'));
}

/** Agenda mendatang (urut terdekat) atau yang sudah lewat (urut terbaru). */
export async function ambilAgenda({ waktu = 'mendatang', batas = 20 } = {}) {
  const sekarang = new Date().toISOString();
  const mendatang = waktu === 'mendatang';

  if (!isSupabaseConfigured) {
    return BERITA_CONTOH.filter((b) => b.jenis === 'agenda' && (mendatang ? b.tanggal_acara >= sekarang : b.tanggal_acara < sekarang))
      .sort((a, b) => (mendatang ? 1 : -1) * a.tanggal_acara.localeCompare(b.tanggal_acara))
      .slice(0, batas);
  }

  let q = supabase.from('berita').select(KOLOM_RINGKAS).eq('dipublikasi', true).eq('jenis', 'agenda').limit(batas);
  q = mendatang
    ? q.gte('tanggal_acara', sekarang).order('tanggal_acara', { ascending: true })
    : q.lt('tanggal_acara', sekarang).order('tanggal_acara', { ascending: false });
  const { data, error } = await q;
  if (error) lempar(error);
  return data;
}

/** Item terbaru satu jenis (beranda). */
export async function ambilBeritaTerbaru(jumlah = 3, jenis = 'berita') {
  const { data } = await ambilDaftar({ jenis, halaman: 1 });
  return data.slice(0, jumlah);
}

/** Satu item publik berdasarkan id; null bila tidak ada / belum dipublikasi. */
export async function ambilBerita(id) {
  if (!isSupabaseConfigured) return BERITA_CONTOH.find((b) => b.id === id) ?? null;
  // id contoh ("contoh-1") atau teks lain bukan angka: jangan kirim ke database.
  if (!/^\d+$/.test(id)) return null;
  const { data, error } = await supabase
    .from('berita')
    .select(KOLOM_LENGKAP)
    .eq('id', id)
    .eq('dipublikasi', true)
    .maybeSingle();
  if (error) lempar(error);
  return data;
}

/** Tautan detail sesuai jenisnya. */
export const tautanInformasi = (b) => `/informasi/${b.jenis ?? 'berita'}/${b.id}`;
