import { ambilKlien, isSupabaseConfigured } from './supabase.js';
import { normalisasiHp } from '../utils/validasi.js';
import { PESAN_JARINGAN, pesanError } from './pesanError.js';

/** Error dengan pesan yang sudah ramah untuk ditampilkan ke pengguna. */
export class PendaftaranError extends Error {
  constructor(pesan) {
    super(pesan);
    this.name = 'PendaftaranError';
  }
}

/** Pesan RPC (rentang usia, kode 22023) sudah berbahasa Indonesia; sisanya pakai pesan bersama. */
const pesanDariError = (error) => (error.code === '22023' ? error.message : pesanError(error));

/**
 * Kirim pendaftaran lewat RPC daftar_santri. Mengembalikan nomor pendaftaran.
 * Melempar PendaftaranError dengan pesan siap tampil bila gagal.
 */
export async function kirimPendaftaran(nilai) {
  if (!isSupabaseConfigured) {
    throw new PendaftaranError('Pendaftaran belum dapat diproses: koneksi Supabase belum dikonfigurasi (lihat README).');
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new PendaftaranError(PESAN_JARINGAN);
  }

  let hasil;
  try {
    hasil = await (await ambilKlien()).rpc('daftar_santri', {
      p_nama: nilai.nama.trim(),
      p_tempat_lahir: nilai.tempat_lahir.trim(),
      p_tgl_lahir: nilai.tgl_lahir,
      p_jenjang: nilai.jenjang,
      p_nama_wali: nilai.nama_wali.trim(),
      p_hp_wali: normalisasiHp(nilai.hp_wali),
      p_alamat: nilai.alamat.trim(),
      p_asal_sekolah: nilai.asal_sekolah.trim(),
    });
  } catch {
    throw new PendaftaranError(PESAN_JARINGAN);
  }

  if (hasil.error) throw new PendaftaranError(pesanDariError(hasil.error));
  if (typeof hasil.data !== 'string' || !hasil.data) {
    throw new PendaftaranError('Server tidak mengembalikan nomor pendaftaran. Silakan coba lagi.');
  }
  return hasil.data;
}
