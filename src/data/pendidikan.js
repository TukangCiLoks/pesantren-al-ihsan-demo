// Konten halaman Pendidikan — SEMUA FIKTIF untuk demo portofolio.

const JADWAL_HARIAN = [
  { waktu: '04.00', kegiatan: 'Bangun, salat Subuh berjamaah, dan kajian singkat' },
  { waktu: '05.30', kegiatan: 'Setoran hafalan / murajaah' },
  { waktu: '06.30', kegiatan: 'Sarapan dan persiapan sekolah' },
  { waktu: '07.00', kegiatan: 'Kegiatan belajar mengajar' },
  { waktu: '12.00', kegiatan: 'Salat Zuhur berjamaah dan makan siang' },
  { waktu: '13.00', kegiatan: 'Kegiatan belajar mengajar (lanjutan)' },
  { waktu: '15.30', kegiatan: 'Salat Asar dan ekstrakurikuler' },
  { waktu: '18.00', kegiatan: 'Salat Magrib, tadarus, dan Isya berjamaah' },
  { waktu: '19.30', kegiatan: 'Makan malam dan belajar malam terbimbing' },
  { waktu: '21.30', kegiatan: 'Istirahat' },
];

export const JENJANG = {
  smp: {
    pengantar: 'Jenjang menengah pertama (kelas 7–9) yang memadukan kurikulum nasional dengan dasar-dasar ilmu agama.',
    paragraf: [
      'Santri SMP dibimbing membangun kebiasaan belajar, ibadah, dan kemandirian sejak awal masa asrama.',
      'Selain mata pelajaran nasional, santri mempelajari bahasa Arab, fikih dasar, akhlak, dan tahsin Al-Qur’an.',
    ],
    sorotan: [
      { label: 'Kelas', nilai: '7–9' },
      { label: 'Rombel per angkatan', nilai: '6' },
      { label: 'Target hafalan', nilai: '3 juz' },
    ],
    kurikulum: [
      { kelompok: 'Kurikulum nasional', mapel: ['Matematika', 'IPA', 'IPS', 'Bahasa Indonesia', 'Bahasa Inggris', 'Informatika'] },
      { kelompok: 'Diniyah', mapel: ['Bahasa Arab', 'Fikih', 'Akidah Akhlak', 'Sirah Nabawiyah'] },
      { kelompok: 'Al-Qur’an', mapel: ['Tahsin', 'Tahfidz juz 30, 29, 28'] },
    ],
    jadwal: JADWAL_HARIAN,
  },
  sma: {
    pengantar: 'Jenjang menengah atas (kelas 10–12) dengan peminatan IPA dan IPS serta pembinaan kepemimpinan.',
    paragraf: [
      'Santri SMA disiapkan untuk melanjutkan ke perguruan tinggi sambil memperdalam kajian kitab dan bahasa Arab.',
      'Santri kelas 11 dan 12 dilibatkan sebagai pengurus organisasi santri untuk melatih kepemimpinan dan tanggung jawab.',
    ],
    sorotan: [
      { label: 'Kelas', nilai: '10–12' },
      { label: 'Peminatan', nilai: 'IPA & IPS' },
      { label: 'Target hafalan', nilai: '5 juz' },
    ],
    kurikulum: [
      { kelompok: 'Kurikulum nasional', mapel: ['Matematika', 'Fisika / Ekonomi', 'Kimia / Sosiologi', 'Biologi / Geografi', 'Bahasa Indonesia', 'Bahasa Inggris'] },
      { kelompok: 'Diniyah', mapel: ['Nahwu & Sharaf', 'Fikih', 'Ushul Fikih dasar', 'Hadits', 'Tafsir'] },
      { kelompok: 'Pengembangan diri', mapel: ['Organisasi santri', 'Bimbingan kuliah', 'Public speaking'] },
    ],
    jadwal: JADWAL_HARIAN,
  },
  tahfidz: {
    pengantar: 'Program hafalan Al-Qur’an bertahap yang bisa diikuti santri SMP maupun SMA.',
    paragraf: [
      'Santri tahfidz menyetor hafalan baru setiap pagi dan mengulang (murajaah) hafalan lama setiap sore kepada musyrif.',
      'Setiap akhir semester diadakan ujian hafalan. Santri yang menuntaskan target mengikuti wisuda tahfidz.',
    ],
    sorotan: [
      { label: 'Setoran', nilai: 'Harian' },
      { label: 'Rasio musyrif', nilai: '1 : 12' },
      { label: 'Target program', nilai: '10–30 juz' },
    ],
    kurikulum: [
      { kelompok: 'Tahap 1 — Tahsin', mapel: ['Makharijul huruf', 'Tajwid praktis', 'Kelancaran tilawah'] },
      { kelompok: 'Tahap 2 — Hafalan', mapel: ['Setoran ziyadah harian', 'Murajaah sore', 'Tasmi’ pekanan'] },
      { kelompok: 'Tahap 3 — Penguatan', mapel: ['Ujian per 5 juz', 'Sanad bacaan', 'Wisuda tahfidz'] },
    ],
    jadwal: JADWAL_HARIAN,
  },
};

export const EKSKUL = [
  { nama: 'Pramuka', kategori: 'Wajib', jadwal: 'Sabtu sore', ikon: 'tenda' },
  { nama: 'Panahan', kategori: 'Olahraga', jadwal: 'Selasa & Kamis', ikon: 'panah' },
  { nama: 'Futsal', kategori: 'Olahraga', jadwal: 'Rabu sore', ikon: 'bola' },
  { nama: 'Kaligrafi', kategori: 'Seni', jadwal: 'Senin sore', ikon: 'pena' },
  { nama: 'Hadroh', kategori: 'Seni', jadwal: 'Kamis malam', ikon: 'musik' },
  { nama: 'Klub Sains', kategori: 'Akademik', jadwal: 'Rabu sore', ikon: 'labu' },
  { nama: 'Muhadharah (pidato)', kategori: 'Bahasa', jadwal: 'Jumat malam', ikon: 'mikrofon' },
  { nama: 'Jurnalistik', kategori: 'Akademik', jadwal: 'Selasa sore', ikon: 'koran' },
];

// Kalender akademik 2026/2027 (fiktif).
export const KALENDER = [
  {
    semester: 'Semester Ganjil',
    kegiatan: [
      { tanggal: '13–15 Juli 2026', nama: 'Masa orientasi santri baru', jenis: 'Kegiatan' },
      { tanggal: '16 Juli 2026', nama: 'Awal kegiatan belajar', jenis: 'Akademik' },
      { tanggal: '17 Agustus 2026', nama: 'Upacara HUT RI', jenis: 'Kegiatan' },
      { tanggal: '21–26 September 2026', nama: 'Penilaian tengah semester', jenis: 'Ujian' },
      { tanggal: '30 November – 5 Desember 2026', nama: 'Penilaian akhir semester', jenis: 'Ujian' },
      { tanggal: '19 Desember 2026', nama: 'Pembagian rapor', jenis: 'Akademik' },
      { tanggal: '21 Desember 2026 – 2 Januari 2027', nama: 'Libur semester', jenis: 'Libur' },
    ],
  },
  {
    semester: 'Semester Genap',
    kegiatan: [
      { tanggal: '4 Januari 2027', nama: 'Awal semester genap', jenis: 'Akademik' },
      { tanggal: '1–6 Maret 2027', nama: 'Penilaian tengah semester', jenis: 'Ujian' },
      { tanggal: 'Pertengahan Ramadan 2027', nama: 'Pesantren kilat & libur Idulfitri', jenis: 'Libur' },
      { tanggal: '7–12 Juni 2027', nama: 'Penilaian akhir tahun', jenis: 'Ujian' },
      { tanggal: '19 Juni 2027', nama: 'Wisuda tahfidz & kelulusan', jenis: 'Kegiatan' },
      { tanggal: '21 Juni – 10 Juli 2027', nama: 'Libur akhir tahun', jenis: 'Libur' },
    ],
  },
];
