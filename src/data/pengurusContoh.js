// Susunan pengurus contoh — HANYA dipakai bila Supabase belum dikonfigurasi.
// Sama dengan seed di sql/002_pengurus.sql. Semua nama fiktif.

export const PENGURUS_CONTOH = [
  { id: 1, nama: 'H. Rahmat Fiktif', jabatan: 'Ketua Dewan Pembina', unit: 'yayasan', induk_id: null, urutan: 1 },
  { id: 2, nama: 'H. Darmawan Contoh', jabatan: 'Ketua Yayasan', unit: 'yayasan', induk_id: 1, urutan: 1 },
  { id: 3, nama: 'Bapak Hamid Sampel', jabatan: 'Ketua Dewan Pengawas', unit: 'yayasan', induk_id: 1, urutan: 2 },
  { id: 4, nama: 'Ibu Siti Rekaan', jabatan: 'Sekretaris Yayasan', unit: 'yayasan', induk_id: 2, urutan: 1 },
  { id: 5, nama: 'Bapak Anwar Demo', jabatan: 'Bendahara Yayasan', unit: 'yayasan', induk_id: 2, urutan: 2 },

  { id: 6, nama: 'KH. Abdul Rasyid Fiktif', jabatan: 'Pengasuh Pesantren', unit: 'pimpinan', induk_id: null, urutan: 1 },
  { id: 7, nama: 'Ustadz Fauzan Ilustrasi', jabatan: 'Mudir (Direktur) Pesantren', unit: 'pimpinan', induk_id: 6, urutan: 1 },
  { id: 8, nama: 'Ustadz Yusuf Ilustrasi', jabatan: 'Kepala Bagian Kesantrian', unit: 'pimpinan', induk_id: 7, urutan: 1 },
  { id: 9, nama: 'Ustadzah Rina Contoh', jabatan: 'Kepala Bagian Kurikulum', unit: 'pimpinan', induk_id: 7, urutan: 2 },
  { id: 10, nama: 'Bapak Teguh Demo', jabatan: 'Kepala Bagian Keuangan & Umum', unit: 'pimpinan', induk_id: 7, urutan: 3 },

  { id: 11, nama: 'Ustadz Faruq Sampel', jabatan: 'Kepala SMP Islam', unit: 'unit', induk_id: null, urutan: 1 },
  { id: 12, nama: 'Ustadzah Laila Rekaan', jabatan: 'Kepala SMA Islam', unit: 'unit', induk_id: null, urutan: 2 },
  { id: 13, nama: 'Ustadz Hasan Demo', jabatan: 'Koordinator Tahfidz', unit: 'unit', induk_id: null, urutan: 3 },
  { id: 14, nama: 'Ustadzah Dewi Fiktif', jabatan: 'Wakasek Kurikulum SMP', unit: 'unit', induk_id: 11, urutan: 1 },
  { id: 15, nama: 'Ustadz Rafi Contoh', jabatan: 'Wakasek Kesiswaan SMP', unit: 'unit', induk_id: 11, urutan: 2 },
  { id: 16, nama: 'Ustadz Bima Demo', jabatan: 'Wakasek Kurikulum SMA', unit: 'unit', induk_id: 12, urutan: 1 },
  { id: 17, nama: 'Ustadzah Hana Sampel', jabatan: 'Wakasek Kesiswaan SMA', unit: 'unit', induk_id: 12, urutan: 2 },
  { id: 18, nama: 'Ustadz Ilham Fiktif', jabatan: 'Musyrif Tahfidz Putra', unit: 'unit', induk_id: 13, urutan: 1 },
  { id: 19, nama: 'Ustadzah Zahra Contoh', jabatan: 'Musyrifah Tahfidz Putri', unit: 'unit', induk_id: 13, urutan: 2 },
].map((p) => ({ ...p, aktif: true, contoh: true }));
