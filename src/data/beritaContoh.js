// Berita contoh, HANYA dipakai bila Supabase belum dikonfigurasi (mis. saat
// membuka situs tanpa .env.local). Begitu terhubung, berita selalu dari tabel.
// Isinya mengikuti seed di sql/schema.sql dan sql/003_informasi.sql (yang dipublikasi).

export const BERITA_CONTOH = [
  {
    id: 'contoh-1',
    contoh: true,
    jenis: 'berita',
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
    jenis: 'berita',
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
    jenis: 'berita',
    judul: 'Santri Raih Juara Lomba Sains Tingkat Kabupaten',
    ringkasan: 'Tim sains SMA meraih juara pertama berkat proyek penjernih air sederhana untuk desa sekitar.',
    isi:
      'Tim sains SMA Pesantren Al-Ihsan (fiktif) meraih juara pertama lomba sains tingkat kabupaten. Proyek mereka berupa alat penjernih air sederhana dari bahan yang mudah didapat.\n\nAlat tersebut rencananya akan diuji coba bersama warga desa sekitar pesantren.',
    kategori: 'Prestasi',
    created_at: '2026-11-05T08:00:00+07:00',
  },
];

// Tanggal agenda dihitung relatif terhadap hari ini (tengah malam WIB) supaya selalu ada yang "akan datang".
const tanggalWib = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date()); // "2026-11-22"
const hariIni = new Date(`${tanggalWib}T00:00:00+07:00`);
const geser = (hari, jam = 0, menit = 0) => new Date(hariIni.getTime() + ((hari * 24 + jam) * 60 + menit) * 60000).toISOString();

BERITA_CONTOH.push(
  {
    id: 'contoh-4',
    contoh: true,
    jenis: 'pengumuman',
    judul: 'Jadwal Daftar Ulang Santri Lama',
    ringkasan: 'Daftar ulang santri lama dibuka selama dua pekan sebelum tahun ajaran baru.',
    isi: 'Daftar ulang santri lama dilakukan di kantor tata usaha pada jam layanan.\n\nWali dimohon membawa kartu santri dan bukti pembayaran. Ini adalah pengumuman contoh untuk situs demo.',
    kategori: 'Administrasi',
    created_at: geser(-3),
  },
  {
    id: 'contoh-5',
    contoh: true,
    jenis: 'pengumuman',
    judul: 'Libur Akhir Semester Ganjil',
    ringkasan: 'Santri pulang ke rumah masing-masing setelah pembagian rapor.',
    isi: 'Libur akhir semester ganjil dimulai setelah pembagian rapor. Santri dijemput wali sesuai jadwal kepulangan per kamar.\n\nPengumuman ini fiktif untuk keperluan demo.',
    kategori: 'Akademik',
    created_at: geser(-6),
  },
  {
    id: 'contoh-6',
    contoh: true,
    jenis: 'agenda',
    judul: 'Kajian Umum Bulanan untuk Wali Santri',
    ringkasan: 'Kajian terbuka bagi wali santri dan masyarakat sekitar.',
    isi: 'Kajian umum bulanan mengangkat tema pendidikan anak di era digital.\n\nAcara terbuka untuk umum. Agenda ini fiktif untuk keperluan demo.',
    kategori: 'Kajian',
    tanggal_acara: geser(9, 8),
    lokasi: 'Masjid Pesantren',
    created_at: geser(-2),
  },
  {
    id: 'contoh-7',
    contoh: true,
    jenis: 'agenda',
    judul: 'Lomba Pidato Tiga Bahasa',
    ringkasan: 'Lomba pidato bahasa Indonesia, Arab, dan Inggris antarkelas.',
    isi: 'Setiap kelas mengirimkan satu wakil untuk setiap bahasa. Penilaian meliputi isi, kefasihan, dan penampilan.\n\nAgenda ini fiktif untuk keperluan demo.',
    kategori: 'Lomba',
    tanggal_acara: geser(16, 13, 30),
    lokasi: 'Aula Pesantren',
    created_at: geser(-4),
  },
  {
    id: 'contoh-8',
    contoh: true,
    jenis: 'agenda',
    judul: 'Bakti Sosial di Desa Sekitar',
    ringkasan: 'Santri SMA membersihkan lingkungan dan membagikan paket sembako.',
    isi: 'Kegiatan bakti sosial melibatkan santri kelas 11 bersama warga.\n\nAgenda ini fiktif untuk keperluan demo.',
    kategori: 'Sosial',
    tanggal_acara: geser(-10, 7),
    lokasi: 'Desa Fiktif',
    created_at: geser(-20),
  },
);
