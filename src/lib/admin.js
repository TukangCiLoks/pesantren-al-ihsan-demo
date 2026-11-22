// Akses data panel admin. Semua izin ditegakkan oleh RLS di server;
// fungsi-fungsi ini hanya menyusun query dan menerjemahkan error.
import { ambilKlien } from './supabase.js';
import { PESAN_JARINGAN, pesanError } from './pesanError.js';

export const STATUS_PENDAFTAR = ['baru', 'diverifikasi', 'diterima', 'ditolak'];

/** `susun(sb)` membangun query dari klien; klien dimuat lazy (lihat supabase.js). */
async function jalankan(susun) {
  let hasil;
  try {
    hasil = await susun(await ambilKlien());
  } catch {
    throw new Error(PESAN_JARINGAN);
  }
  if (hasil.error) throw new Error(pesanError(hasil.error));
  return hasil.data;
}

// RLS tidak melempar error saat baris tidak boleh diubah: ia hanya mengenai 0 baris.
// Karena itu setiap perubahan meminta baris hasilnya (.select()) dan dicek di sini.
function satuBaris(data) {
  if (!data || data.length === 0) {
    throw new Error('Data tidak ditemukan atau Anda tidak berhak mengubahnya.');
  }
  return data[0];
}

// ── Autentikasi ─────────────────────────────────────────────────────────
export const masuk = async (email, password) =>
  (await ambilKlien()).auth.signInWithPassword({ email, password });
/** Selalu mengembalikan { error }, juga bila modul klien gagal diunduh. */
export async function keluar() {
  try {
    return await (await ambilKlien()).auth.signOut();
  } catch (error) {
    return { error };
  }
}

// ── Pendaftar ───────────────────────────────────────────────────────────
export function ambilPendaftar(status) {
  return jalankan((sb) => {
    const q = sb.from('pendaftar').select('*').order('created_at', { ascending: false });
    return status ? q.eq('status', status) : q;
  });
}

export const ubahStatusPendaftar = async (id, status) =>
  satuBaris(await jalankan((sb) => sb.from('pendaftar').update({ status }).eq('id', id).select()));

export const hapusPendaftar = async (id) =>
  satuBaris(await jalankan((sb) => sb.from('pendaftar').delete().eq('id', id).select('id')));

// ── Berita ──────────────────────────────────────────────────────────────
export const ambilSemuaBerita = () =>
  jalankan((sb) => sb.from('berita').select('*').order('created_at', { ascending: false }));

/** Tambah (tanpa id) atau ubah (dengan id) berita. */
export async function simpanBerita({ id, ...data }) {
  return satuBaris(
    await jalankan((sb) =>
      id ? sb.from('berita').update(data).eq('id', id).select() : sb.from('berita').insert(data).select(),
    ),
  );
}

export const aturPublikasi = async (id, dipublikasi) =>
  satuBaris(await jalankan((sb) => sb.from('berita').update({ dipublikasi }).eq('id', id).select()));

export const hapusBerita = async (id) =>
  satuBaris(await jalankan((sb) => sb.from('berita').delete().eq('id', id).select('id')));

// ── Struktur organisasi ─────────────────────────────────────────────────
export const ambilSemuaPengurus = () =>
  jalankan((sb) => sb.from('pengurus').select('*').order('unit').order('urutan'));

/** Tambah (tanpa id) atau ubah (dengan id) pengurus. Bentuk pohon dijaga trigger di server. */
export async function simpanPengurus({ id, ...data }) {
  return satuBaris(
    await jalankan((sb) =>
      id ? sb.from('pengurus').update(data).eq('id', id).select() : sb.from('pengurus').insert(data).select(),
    ),
  );
}

/** Bawahan dari pengurus yang dihapus otomatis menjadi akar (on delete set null). */
export const hapusPengurus = async (id) =>
  satuBaris(await jalankan((sb) => sb.from('pengurus').delete().eq('id', id).select('id')));
