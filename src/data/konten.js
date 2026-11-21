// Semua konten di sini fiktif — untuk keperluan demo portofolio.

export const NAMA = 'Pesantren Al-Ihsan';

// Menu situs ada di data/menu.js.

export const STATISTIK = [
  { label: 'Santri aktif', nilai: 1250 },
  { label: 'Ustadz & ustadzah', nilai: 86 },
  { label: 'Alumni', nilai: 4300 },
  { label: 'Tahun berdiri', nilai: 1998, tahun: true },
];

export const PROGRAM = [
  {
    id: 'smp',
    nama: 'SMP Islam',
    ringkas: 'Kurikulum nasional dipadukan dengan dasar-dasar bahasa Arab, fikih, dan akhlak.',
    ikon: 'buku',
  },
  {
    id: 'sma',
    nama: 'SMA Islam',
    ringkas: 'Jurusan IPA dan IPS dengan pembinaan kepemimpinan serta kajian kitab.',
    ikon: 'toga',
  },
  {
    id: 'tahfidz',
    nama: 'Program Tahfidz',
    ringkas: 'Hafalan Al-Qur’an bertahap dengan setoran harian dan murajaah terjadwal.',
    ikon: 'mushaf',
  },
];

export const NILAI = [
  'Kurikulum nasional terpadu dengan pendidikan diniyah',
  'Asrama yang tertib dengan pembina 24 jam',
  'Pembiasaan ibadah, adab, dan kemandirian sehari-hari',
];

export const AYAT = {
  arab: 'يَرْفَعِ ٱللَّهُ ٱلَّذِينَ ءَامَنُوا۟ مِنكُمْ وَٱلَّذِينَ أُوتُوا۟ ٱلْعِلْمَ دَرَجَٰتٍ',
  terjemahan:
    '…niscaya Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat.',
  sumber: 'QS. Al-Mujadilah: 11',
};

export const ALUR = [
  { judul: 'Isi formulir', teks: 'Lengkapi data calon santri dan wali secara online, lalu simpan nomor pendaftaran.', ikon: 'formulir' },
  { judul: 'Verifikasi berkas', teks: 'Panitia memeriksa data dan menghubungi wali melalui nomor HP yang didaftarkan.', ikon: 'berkas' },
  { judul: 'Tes & wawancara', teks: 'Calon santri mengikuti tes dasar dan wawancara bersama wali sesuai jadwal.', ikon: 'tes' },
  { judul: 'Pengumuman', teks: 'Hasil seleksi diumumkan kepada wali beserta informasi daftar ulang.', ikon: 'pengumuman' },
];

// Galeri: placeholder ilustrasi (bukan foto). Beranda menampilkan 6 pertama, halaman Galeri semuanya.
export const GALERI = [
  { id: 1, judul: 'Halaqah pagi di serambi masjid', pola: 0, kategori: 'Ibadah' },
  { id: 2, judul: 'Perpustakaan santri', pola: 1, kategori: 'Fasilitas' },
  { id: 3, judul: 'Laboratorium sains', pola: 2, kategori: 'Fasilitas' },
  { id: 4, judul: 'Lapangan olahraga', pola: 3, kategori: 'Kegiatan' },
  { id: 5, judul: 'Wisuda tahfidz', pola: 1, kategori: 'Kegiatan' },
  { id: 6, judul: 'Asrama putra', pola: 0, kategori: 'Fasilitas' },
  { id: 7, judul: 'Kajian kitab ba’da Subuh', pola: 2, kategori: 'Ibadah' },
  { id: 8, judul: 'Latihan pramuka', pola: 3, kategori: 'Kegiatan' },
  { id: 9, judul: 'Ruang kelas SMA', pola: 0, kategori: 'Fasilitas' },
  { id: 10, judul: 'Lomba kaligrafi', pola: 1, kategori: 'Kegiatan' },
  { id: 11, judul: 'Salat berjamaah', pola: 2, kategori: 'Ibadah' },
  { id: 12, judul: 'Bakti sosial santri', pola: 3, kategori: 'Kegiatan' },
];

export const KONTAK = {
  alamat: ['Jl. Contoh Raya No. 1', 'Desa Fiktif, Kecamatan Demo', 'Kota Contoh 00000'],
  telepon: '0800-0000-0000',
  email: 'info@al-ihsan.example',
  jamLayanan: 'Senin–Sabtu, 08.00–15.00 WIB',
};

// Media sosial. Pesantren ini fiktif, jadi tidak ada akun sungguhan: tautan sengaja
// mengarah ke beranda platform (bukan ke nama akun karangan yang mungkin milik orang lain).
// Ganti `url` dan `akun` di sini bila sudah ada akun resmi.
export const SOSMED = [
  { id: 'facebook', nama: 'Facebook', url: 'https://www.facebook.com/', akun: '@akun-demo' },
  { id: 'instagram', nama: 'Instagram', url: 'https://www.instagram.com/', akun: '@akun-demo' },
  { id: 'tiktok', nama: 'TikTok', url: 'https://www.tiktok.com/', akun: '@akun-demo' },
  { id: 'youtube', nama: 'YouTube', url: 'https://www.youtube.com/', akun: '@akun-demo' },
];
