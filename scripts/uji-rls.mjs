// Uji RLS dari sudut pandang pengunjung anonim (kunci anon, persis seperti browser).
// Jalankan: npm run uji:rls   (butuh .env.local yang sudah diisi)
//
// Efek samping: membuat 2 baris pendaftar uji bernama "Uji RLS Otomatis".
// Hapus lewat panel admin atau SQL Editor bila tidak diperlukan.

import { createClient } from '@supabase/supabase-js';

try {
  process.loadEnvFile('.env.local');
} catch {
  console.error('✗ .env.local tidak ditemukan. Salin .env.example menjadi .env.local lalu isi.');
  process.exit(1);
}

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('✗ VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY kosong di .env.local.');
  process.exit(1);
}

// Sesi tidak disimpan: skrip ini selalu berjalan sebagai anon.
const supabase = createClient(url, key, { auth: { persistSession: false } });

const DATA_UJI = {
  nama: 'Uji RLS Otomatis',
  tempat_lahir: 'Kota Contoh',
  tgl_lahir: `${new Date().getFullYear() - 13}-01-15`,
  jenjang: 'SMP',
  nama_wali: 'Wali Uji',
  hp_wali: '081234567890',
  alamat: 'Jl. Contoh No. 1, Kota Contoh',
  asal_sekolah: 'SD Contoh',
};

let gagal = 0;
function cek(lulus, judul, detail = '') {
  console.log(`${lulus ? '✓' : '✗'} ${judul}${detail ? ` — ${detail}` : ''}`);
  if (!lulus) gagal += 1;
}

// "Ditolak" = error izin, atau tidak ada baris yang terbaca/terubah.
const ditolak = ({ data, error }) => Boolean(error) || !data || data.length === 0;
const ket = ({ data, error }) => (error ? `${error.code ?? ''} ${error.message}` : `${data?.length ?? 0} baris`);

// 1. Anon boleh mendaftar lewat RPC dan menerima nomor pendaftaran.
{
  const r = await supabase.rpc('daftar_santri', {
    p_nama: DATA_UJI.nama,
    p_tempat_lahir: DATA_UJI.tempat_lahir,
    p_tgl_lahir: DATA_UJI.tgl_lahir,
    p_jenjang: DATA_UJI.jenjang,
    p_nama_wali: DATA_UJI.nama_wali,
    p_hp_wali: DATA_UJI.hp_wali,
    p_alamat: DATA_UJI.alamat,
    p_asal_sekolah: DATA_UJI.asal_sekolah,
  });
  cek(!r.error && /^PSN-\d{4}-\d{4,}$/.test(r.data), 'Anon mendaftar lewat RPC daftar_santri', r.error?.message ?? r.data);
}

// 2. Anon boleh INSERT langsung (tanpa membaca balik).
{
  const r = await supabase.from('pendaftar').insert({ ...DATA_UJI, no_pendaftaran: 'PALSU-1' });
  cek(!r.error, 'Anon INSERT langsung ke pendaftar', r.error?.message ?? 'berhasil (nomor dibuat server, bukan PALSU-1)');
}

// 3–5. Anon TIDAK boleh membaca, mengubah, atau menghapus pendaftar.
{
  const r = await supabase.from('pendaftar').select('*');
  cek(ditolak(r), 'Anon TIDAK bisa SELECT pendaftar', ket(r));
}
{
  const r = await supabase.from('pendaftar').update({ status: 'diterima' }).neq('status', 'x').select();
  cek(ditolak(r), 'Anon TIDAK bisa UPDATE pendaftar', ket(r));
}
{
  const r = await supabase.from('pendaftar').delete().neq('status', 'x').select();
  cek(ditolak(r), 'Anon TIDAK bisa DELETE pendaftar', ket(r));
}

// 6–7. Berita: hanya yang dipublikasi terlihat.
{
  const r = await supabase.from('berita').select('id, dipublikasi');
  const semuaTerbit = !r.error && r.data.length > 0 && r.data.every((b) => b.dipublikasi);
  cek(semuaTerbit, 'Anon hanya melihat berita yang dipublikasi', ket(r));
}
{
  const r = await supabase.from('berita').select('id').eq('dipublikasi', false);
  cek(ditolak(r), 'Anon TIDAK melihat berita draf', ket(r));
}
{
  const r = await supabase.from('berita').insert({ judul: 'Berita palsu', isi: 'Tidak boleh masuk.' }).select();
  cek(ditolak(r), 'Anon TIDAK bisa menambah berita', ket(r));
}

// 8. Daftar admin tidak terbaca.
{
  const r = await supabase.from('admin_emails').select('*');
  cek(ditolak(r), 'Anon TIDAK bisa membaca admin_emails', ket(r));
}

console.log(gagal === 0 ? '\nSemua uji lulus.' : `\n${gagal} uji GAGAL.`);
process.exit(gagal === 0 ? 0 : 1);
