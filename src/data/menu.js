// Pohon menu situs — satu sumber untuk menu header, breadcrumb, footer, dan rute.
// Menambah halaman cukup dengan menambah satu entri di sini.
// `anak` = submenu. Kedalaman maksimal 3 (menu › submenu › sub-submenu).
// `ringkas` dipakai di kartu halaman indeks.

export const MENU = [
  { label: 'Beranda', to: '/' },
  {
    label: 'Profil',
    to: '/profil',
    ringkas: 'Sejarah, visi, struktur, pengajar, dan fasilitas pesantren.',
    anak: [
      { label: 'Sejarah', to: '/profil/sejarah', ringkas: 'Perjalanan pesantren sejak berdiri.' },
      { label: 'Visi & Misi', to: '/profil/visi-misi', ringkas: 'Arah dan tujuan pendidikan.' },
      {
        label: 'Struktur Organisasi',
        to: '/profil/struktur',
        ringkas: 'Susunan pengurus yayasan, pimpinan, dan unit.',
        anak: [
          { label: 'Yayasan', to: '/profil/struktur/yayasan', ringkas: 'Pembina, pengawas, dan pengurus yayasan.' },
          { label: 'Pimpinan Pesantren', to: '/profil/struktur/pimpinan', ringkas: 'Pengasuh dan jajaran pimpinan.' },
          { label: 'Unit Pendidikan', to: '/profil/struktur/unit', ringkas: 'Kepala unit SMP, SMA, dan tahfidz.' },
        ],
      },
      { label: 'Pengasuh & Asatidz', to: '/profil/asatidz', ringkas: 'Para pengasuh dan pengajar.' },
      {
        label: 'Fasilitas',
        to: '/profil/fasilitas',
        ringkas: 'Sarana belajar, ibadah, dan asrama.',
        anak: [
          { label: 'Asrama', to: '/profil/fasilitas/asrama', ringkas: 'Asrama putra dan putri.' },
          { label: 'Masjid', to: '/profil/fasilitas/masjid', ringkas: 'Pusat ibadah dan kajian.' },
          { label: 'Perpustakaan', to: '/profil/fasilitas/perpustakaan', ringkas: 'Koleksi buku dan kitab.' },
          { label: 'Laboratorium', to: '/profil/fasilitas/laboratorium', ringkas: 'Laboratorium sains dan komputer.' },
        ],
      },
    ],
  },
  {
    label: 'Pendidikan',
    to: '/pendidikan',
    ringkas: 'Jenjang, program, kegiatan, dan kalender akademik.',
    anak: [
      { label: 'SMP Islam', to: '/pendidikan/smp', ringkas: 'Jenjang menengah pertama.' },
      { label: 'SMA Islam', to: '/pendidikan/sma', ringkas: 'Jenjang menengah atas, IPA dan IPS.' },
      { label: 'Program Tahfidz', to: '/pendidikan/tahfidz', ringkas: 'Hafalan Al-Qur’an bertahap.' },
      { label: 'Ekstrakurikuler', to: '/pendidikan/ekstrakurikuler', ringkas: 'Kegiatan minat dan bakat.' },
      { label: 'Kalender Akademik', to: '/pendidikan/kalender', ringkas: 'Jadwal penting tahun ajaran.' },
    ],
  },
  {
    label: 'Informasi',
    to: '/informasi',
    ringkas: 'Kabar, pengumuman, agenda, galeri, dan unduhan.',
    anak: [
      { label: 'Berita', to: '/informasi/berita', ringkas: 'Kabar kegiatan pesantren.' },
      { label: 'Pengumuman', to: '/informasi/pengumuman', ringkas: 'Informasi resmi untuk santri dan wali.' },
      { label: 'Agenda', to: '/informasi/agenda', ringkas: 'Kegiatan yang akan datang.' },
      { label: 'Galeri', to: '/informasi/galeri', ringkas: 'Dokumentasi kegiatan.' },
      { label: 'Unduhan', to: '/informasi/unduhan', ringkas: 'Brosur dan dokumen.' },
    ],
  },
  {
    label: 'PPDB',
    to: '/ppdb',
    ringkas: 'Penerimaan peserta didik baru.',
    anak: [
      { label: 'Alur Pendaftaran', to: '/ppdb/alur', ringkas: 'Langkah-langkah pendaftaran.' },
      { label: 'Syarat', to: '/ppdb/syarat', ringkas: 'Berkas dan ketentuan.' },
      { label: 'Biaya', to: '/ppdb/biaya', ringkas: 'Rincian biaya pendidikan.' },
      { label: 'Formulir Online', to: '/ppdb/formulir', ringkas: 'Daftar secara online.' },
      { label: 'FAQ', to: '/ppdb/faq', ringkas: 'Pertanyaan yang sering diajukan.' },
    ],
  },
  { label: 'Kontak', to: '/kontak' },
];
