// Konten PPDB — SEMUA FIKTIF untuk demo portofolio (termasuk angka biaya).

export const SYARAT = {
  umum: [
    'Beragama Islam dan bersedia tinggal di asrama',
    'Sehat jasmani dan rohani',
    'Usia 12–15 tahun untuk SMP, 15–18 tahun untuk SMA',
    'Mampu membaca Al-Qur’an (tingkat dasar)',
    'Bersedia mematuhi tata tertib pesantren',
  ],
  berkas: [
    { nama: 'Fotokopi akta kelahiran', jumlah: '1 lembar' },
    { nama: 'Fotokopi kartu keluarga', jumlah: '1 lembar' },
    { nama: 'Fotokopi rapor semester terakhir', jumlah: '1 lembar' },
    { nama: 'Surat keterangan sehat dari dokter', jumlah: '1 lembar' },
    { nama: 'Pas foto 3×4 berlatar biru', jumlah: '4 lembar' },
    { nama: 'Fotokopi KTP wali', jumlah: '1 lembar' },
  ],
  catatan:
    'Berkas dibawa saat tes dan wawancara. Tidak perlu diunggah ketika mengisi formulir online.',
};

// Angka contoh, bukan biaya sungguhan.
export const BIAYA = {
  masuk: [
    { komponen: 'Formulir & tes masuk', smp: 250000, sma: 250000 },
    { komponen: 'Uang pangkal (sekali bayar)', smp: 5000000, sma: 6000000 },
    { komponen: 'Seragam & perlengkapan asrama', smp: 1750000, sma: 1900000 },
    { komponen: 'Kitab & buku paket tahun pertama', smp: 800000, sma: 950000 },
  ],
  bulanan: [
    { komponen: 'SPP & asrama', smp: 1250000, sma: 1400000 },
    { komponen: 'Makan 3× sehari', smp: 750000, sma: 750000 },
  ],
  catatan: [
    'Program Tahfidz tidak dipungut biaya tambahan; santri tetap terdaftar di SMP atau SMA.',
    'Tersedia potongan untuk santri yatim/piatu dan bersaudara kandung (syarat berlaku).',
    'Pembayaran melalui rekening resmi yayasan yang tercantum di kuitansi. Panitia tidak pernah meminta transfer ke rekening pribadi.',
  ],
};

export const FAQ = [
  {
    t: 'Kapan pendaftaran santri baru dibuka dan ditutup?',
    j: 'Pendaftaran tahun ajaran 2026/2027 dibuka sejak November 2026 hingga kuota terpenuhi atau paling lambat akhir Juni 2027.',
  },
  {
    t: 'Apakah calon santri harus sudah hafal Al-Qur’an?',
    j: 'Tidak. Calon santri cukup mampu membaca Al-Qur’an tingkat dasar. Hafalan dibina bertahap setelah masuk, dan program tahfidz bersifat pilihan.',
  },
  {
    t: 'Setelah mengisi formulir online, apa langkah berikutnya?',
    j: 'Simpan nomor pendaftaran yang muncul. Panitia akan menghubungi wali melalui nomor HP yang didaftarkan untuk menjadwalkan tes dan wawancara.',
  },
  {
    t: 'Apa saja materi tes masuk?',
    j: 'Tes dasar membaca Al-Qur’an, tes potensi akademik sederhana (matematika dan bahasa Indonesia), serta wawancara calon santri bersama wali.',
  },
  {
    t: 'Kapan santri boleh dijenguk atau pulang?',
    j: 'Wali dapat menjenguk pada hari kunjungan setiap pekan kedua dan keempat. Santri pulang pada libur semester sesuai kalender akademik.',
  },
  {
    t: 'Bolehkah santri membawa telepon genggam?',
    j: 'Tidak. Komunikasi dengan wali dilakukan melalui telepon asrama pada jadwal yang ditentukan, atau melalui pembina dalam keadaan mendesak.',
  },
  {
    t: 'Apakah data yang saya isi di formulir ini aman?',
    j: 'Ini situs demo: gunakan data fiktif. Secara teknis, data pendaftar hanya bisa dibaca oleh admin; pengunjung lain tidak bisa melihatnya.',
  },
];
