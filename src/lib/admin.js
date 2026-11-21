// Akses data panel admin. Semua izin ditegakkan oleh RLS di server;
// fungsi-fungsi ini hanya menyusun query dan menerjemahkan error.
import { supabase } from './supabase.js';
import { PESAN_JARINGAN, pesanError } from './pesanError.js';

export const STATUS_PENDAFTAR = ['baru', 'diverifikasi', 'diterima', 'ditolak'];

async function jalankan(query) {
  let hasil;
  try {
    hasil = await query;
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
export const masuk = (email, password) => supabase.auth.signInWithPassword({ email, password });
export const keluar = () => supabase.auth.signOut();

// ── Pendaftar ───────────────────────────────────────────────────────────
export function ambilPendaftar(status) {
  let q = supabase.from('pendaftar').select('*').order('created_at', { ascending: false });
  if (status) q = q.eq('status', status);
  return jalankan(q);
}

export const ubahStatusPendaftar = async (id, status) =>
  satuBaris(await jalankan(supabase.from('pendaftar').update({ status }).eq('id', id).select()));

export const hapusPendaftar = async (id) =>
  satuBaris(await jalankan(supabase.from('pendaftar').delete().eq('id', id).select('id')));

// ── Berita ──────────────────────────────────────────────────────────────
export const ambilSemuaBerita = () =>
  jalankan(supabase.from('berita').select('*').order('created_at', { ascending: false }));

/** Tambah (tanpa id) atau ubah (dengan id) berita. */
export async function simpanBerita({ id, ...data }) {
  const q = id
    ? supabase.from('berita').update(data).eq('id', id).select()
    : supabase.from('berita').insert(data).select();
  return satuBaris(await jalankan(q));
}

export const aturPublikasi = async (id, dipublikasi) =>
  satuBaris(await jalankan(supabase.from('berita').update({ dipublikasi }).eq('id', id).select()));

export const hapusBerita = async (id) =>
  satuBaris(await jalankan(supabase.from('berita').delete().eq('id', id).select('id')));
