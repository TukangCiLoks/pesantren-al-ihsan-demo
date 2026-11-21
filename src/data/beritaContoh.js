// Berita contoh, HANYA dipakai bila Supabase belum dikonfigurasi (mis. saat
// membuka situs tanpa .env.local). Begitu terhubung, berita selalu dari tabel.
// Isinya sama dengan seed di sql/schema.sql yang dipublikasi.

export const BERITA_CONTOH = [
  {
    id: 'contoh-1',
    contoh: true,
    judul: 'Penerimaan Santri Baru 2026/2027 Resmi Dibuka',
    ringkasan: 'Pendaftaran jenjang SMP, SMA, dan Program Tahfidz dibuka secara online hingga akhir Juni.',
    isi:
      'Pesantren Al-Ihsan (fiktif) membuka penerimaan santri baru untuk tahun ajaran 2026/2027. Pendaftaran dilakukan secara online melalui formulir di situs ini.\n\nSetelah mengisi formulir, calon santri akan menerima nomor pendaftaran. Panitia akan menghubungi wali melalui nomor HP yang didaftarkan untuk jadwal tes dan wawancara.\n\nCatatan: ini adalah situs demo. Gunakan data fiktif saat mencoba formulir.',
    kategori: 'Pengumuman',
    created_at: '2026-11-19T08:00:00+07:00',
  },
  {
    id: 'contoh-2',
    contoh: true,
    judul: 'Wisuda Tahfidz Angkatan Ke-12',
    ringkasan: 'Sebanyak 48 santri menuntaskan hafalan dan mengikuti prosesi wisuda tahfidz di masjid pesantren.',
    isi:
      'Prosesi wisuda tahfidz angkatan ke-12 berlangsung khidmat di masjid pesantren. Para wisudawan sebelumnya telah melalui ujian hafalan di hadapan dewan penguji.\n\nAcara ditutup dengan doa bersama dan ramah tamah bersama para wali santri.',
    kategori: 'Kegiatan',
    created_at: '2026-11-12T08:00:00+07:00',
  },
  {
    id: 'contoh-3',
    contoh: true,
    judul: 'Santri Raih Juara Lomba Sains Tingkat Kabupaten',
    ringkasan: 'Tim sains SMA meraih juara pertama berkat proyek penjernih air sederhana untuk desa sekitar.',
    isi:
      'Tim sains SMA Pesantren Al-Ihsan (fiktif) meraih juara pertama lomba sains tingkat kabupaten. Proyek mereka berupa alat penjernih air sederhana dari bahan yang mudah didapat.\n\nAlat tersebut rencananya akan diuji coba bersama warga desa sekitar pesantren.',
    kategori: 'Prestasi',
    created_at: '2026-11-05T08:00:00+07:00',
  },
];
