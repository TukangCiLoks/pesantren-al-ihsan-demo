// Konten halaman Profil — SEMUA FIKTIF untuk demo portofolio.
// Nama orang sengaja dikarang; kemiripan dengan nama sungguhan tidak disengaja.

export const SEJARAH = {
  pengantar:
    'Berawal dari majelis taklim kecil di serambi rumah, Pesantren Al-Ihsan (fiktif) tumbuh menjadi lembaga pendidikan berasrama dengan tiga jenjang.',
  linimasa: [
    {
      tahun: '1998',
      judul: 'Majelis taklim pertama',
      teks: 'Sekelompok warga Desa Fiktif memulai pengajian rutin untuk anak-anak sekitar di serambi rumah salah satu tokoh masyarakat.',
    },
    {
      tahun: '2003',
      judul: 'Yayasan resmi berdiri',
      teks: 'Pengajian berkembang dan membentuk yayasan. Asrama pertama dibangun dengan kapasitas 40 santri putra.',
    },
    {
      tahun: '2008',
      judul: 'SMP Islam dibuka',
      teks: 'Pendidikan formal dimulai dengan membuka SMP Islam yang memadukan kurikulum nasional dan diniyah.',
    },
    {
      tahun: '2013',
      judul: 'SMA Islam dan asrama putri',
      teks: 'Jenjang SMA dibuka bersamaan dengan pembangunan asrama putri dan perluasan masjid.',
    },
    {
      tahun: '2018',
      judul: 'Program Tahfidz terpadu',
      teks: 'Program tahfidz menjadi program unggulan dengan setoran harian dan murajaah terjadwal.',
    },
    {
      tahun: '2026',
      judul: 'Pendaftaran online',
      teks: 'Penerimaan santri baru beralih ke sistem online agar wali dari berbagai daerah lebih mudah mendaftar.',
    },
  ],
};

export const VISI =
  'Menjadi pesantren yang melahirkan generasi berilmu, beradab, mandiri, dan bermanfaat bagi masyarakat.';

export const MISI = [
  'Menyelenggarakan pendidikan yang memadukan ilmu agama dan ilmu umum secara seimbang.',
  'Membiasakan ibadah, adab, dan akhlak mulia dalam kehidupan sehari-hari di asrama.',
  'Membina hafalan dan pemahaman Al-Qur’an secara bertahap dan berkelanjutan.',
  'Menumbuhkan kemandirian, kepemimpinan, dan kepedulian sosial santri.',
  'Menjalin kerja sama yang baik dengan wali santri dan masyarakat sekitar.',
];

export const NILAI_INTI = [
  { judul: 'Ikhlas', teks: 'Belajar dan mengajar dengan niat yang lurus.' },
  { judul: 'Disiplin', teks: 'Tertib waktu, tertib aturan, tertib ibadah.' },
  { judul: 'Mandiri', teks: 'Terbiasa mengurus diri dan bertanggung jawab.' },
  { judul: 'Peduli', teks: 'Peka terhadap sesama dan lingkungan.' },
];

export const ASATIDZ = [
  { nama: 'KH. Abdul Rasyid Fiktif', peran: 'Pengasuh Pesantren', bidang: 'Tafsir & Akhlak' },
  { nama: 'Ustadzah Nur Aini Contoh', peran: 'Pengasuh Asrama Putri', bidang: 'Fikih Wanita' },
  { nama: 'Ustadz Hasan Demo', peran: 'Koordinator Tahfidz', bidang: 'Tahsin & Tahfidz' },
  { nama: 'Ustadz Faruq Sampel', peran: 'Kepala SMP Islam', bidang: 'Bahasa Arab' },
  { nama: 'Ustadzah Laila Rekaan', peran: 'Kepala SMA Islam', bidang: 'Biologi' },
  { nama: 'Ustadz Yusuf Ilustrasi', peran: 'Pembina Kesantrian', bidang: 'Hadits' },
  { nama: 'Ustadzah Salma Contoh', peran: 'Guru', bidang: 'Matematika' },
  { nama: 'Ustadz Imran Fiktif', peran: 'Guru', bidang: 'Sejarah Islam' },
];

export const FASILITAS = {
  asrama: {
    ilustrasi: 'asrama',
    pengantar: 'Asrama putra dan putri terpisah, masing-masing didampingi pembina yang tinggal di lingkungan asrama.',
    paragraf: [
      'Setiap kamar dihuni 8–10 santri dengan lemari pribadi dan ranjang susun. Kamar dibagi per jenjang agar santri belajar hidup bersama teman sebaya.',
      'Pembina asrama mendampingi kegiatan harian, mulai dari bangun pagi, ibadah berjamaah, hingga belajar malam.',
    ],
    poin: ['Kamar putra & putri terpisah', 'Pembina tinggal di asrama', 'Kamar mandi bersih per lantai', 'Ruang cuci & jemur', 'Klinik kesehatan santri'],
  },
  masjid: {
    ilustrasi: 'masjid',
    pengantar: 'Masjid menjadi pusat ibadah berjamaah, kajian kitab, dan setoran hafalan.',
    paragraf: [
      'Masjid berkapasitas sekitar 1.200 jamaah dan dipakai untuk salat lima waktu berjamaah, kajian ba’da Subuh, serta halaqah tahfidz.',
      'Serambi masjid dimanfaatkan sebagai ruang belajar terbuka pada pagi dan sore hari.',
    ],
    poin: ['Kapasitas ±1.200 jamaah', 'Area wudu putra & putri terpisah', 'Serambi untuk halaqah', 'Perpustakaan kecil kitab'],
  },
  perpustakaan: {
    ilustrasi: 'perpustakaan',
    pengantar: 'Perpustakaan menyediakan buku pelajaran, bacaan umum, dan koleksi kitab.',
    paragraf: [
      'Koleksi terdiri dari buku pelajaran, bacaan anak dan remaja, ensiklopedia, serta kitab-kitab yang dipelajari di pesantren.',
      'Santri dapat meminjam buku dengan kartu santri dan membaca di ruang baca yang tenang.',
    ],
    poin: ['±6.000 judul buku dan kitab', 'Ruang baca senyap', 'Pojok komputer untuk riset', 'Jam buka hingga sebelum Magrib'],
  },
  laboratorium: {
    ilustrasi: 'laboratorium',
    pengantar: 'Laboratorium sains dan komputer mendukung pembelajaran praktik.',
    paragraf: [
      'Laboratorium IPA dipakai untuk praktikum fisika, kimia, dan biologi jenjang SMP dan SMA.',
      'Laboratorium komputer dipakai untuk pelajaran informatika, asesmen berbasis komputer, dan pelatihan desain sederhana.',
    ],
    poin: ['Lab IPA terpadu', 'Lab komputer 36 unit', 'Ruang persiapan & penyimpanan bahan', 'Alat keselamatan kerja'],
  },
};
