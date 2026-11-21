// Aturan validasi formulir pendaftaran — fungsi murni, tanpa React.
// Batas-batasnya sengaja sama dengan CHECK di sql/schema.sql supaya pesan
// ramah di klien dan penolakan di server tidak saling bertentangan.

export const JENJANG = [
  { value: 'SMP', label: 'SMP Islam' },
  { value: 'SMA', label: 'SMA Islam' },
  { value: 'Tahfidz', label: 'Program Tahfidz' },
];

export const USIA_MIN = 9;
export const USIA_MAX = 25;

export const NILAI_AWAL = {
  nama: '',
  tempat_lahir: '',
  tgl_lahir: '',
  jenjang: '',
  nama_wali: '',
  hp_wali: '',
  alamat: '',
  asal_sekolah: '',
};

/** Urutan field = urutan di formulir; dipakai untuk memfokus error pertama. */
export const URUTAN_FIELD = Object.keys(NILAI_AWAL);

/** Hapus spasi/strip/titik; ubah awalan +62 / 62 menjadi 0. */
export function normalisasiHp(hp) {
  const angka = hp.replace(/[\s.-]/g, '');
  if (angka.startsWith('+62')) return `0${angka.slice(3)}`;
  if (angka.startsWith('62')) return `0${angka.slice(2)}`;
  return angka;
}

const tanggalIso = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Batas tanggal lahir (string YYYY-MM-DD) untuk atribut min/max input date. */
export function batasTanggalLahir(hariIni = new Date()) {
  const geser = (tahun) => new Date(hariIni.getFullYear() - tahun, hariIni.getMonth(), hariIni.getDate());
  return { min: tanggalIso(geser(USIA_MAX)), max: tanggalIso(geser(USIA_MIN)) };
}

function panjang(nilai, min, max, label) {
  const n = nilai.trim().length;
  if (n === 0) return `${label} wajib diisi.`;
  if (n < min) return `${label} minimal ${min} karakter.`;
  if (n > max) return `${label} maksimal ${max} karakter.`;
  return null;
}

const ATURAN = {
  nama: (v) => panjang(v.nama, 3, 100, 'Nama lengkap'),
  tempat_lahir: (v) => panjang(v.tempat_lahir, 2, 60, 'Tempat lahir'),
  tgl_lahir: (v, hariIni) => {
    if (!v.tgl_lahir) return 'Tanggal lahir wajib diisi.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.tgl_lahir) || Number.isNaN(Date.parse(v.tgl_lahir))) {
      return 'Tanggal lahir tidak valid.';
    }
    const { min, max } = batasTanggalLahir(hariIni);
    // Perbandingan string aman karena formatnya sama-sama YYYY-MM-DD.
    if (v.tgl_lahir > max || v.tgl_lahir < min) {
      return `Usia calon santri harus antara ${USIA_MIN} dan ${USIA_MAX} tahun.`;
    }
    return null;
  },
  jenjang: (v) => (JENJANG.some((j) => j.value === v.jenjang) ? null : 'Pilih jenjang pendidikan.'),
  nama_wali: (v) => panjang(v.nama_wali, 3, 100, 'Nama wali'),
  hp_wali: (v) => {
    if (!v.hp_wali.trim()) return 'Nomor HP wali wajib diisi.';
    return /^08\d{8,11}$/.test(normalisasiHp(v.hp_wali))
      ? null
      : 'Nomor HP harus diawali 08 dan berisi 10–13 angka, contoh 081234567890.';
  },
  alamat: (v) => panjang(v.alamat, 10, 300, 'Alamat'),
  asal_sekolah: (v) => panjang(v.asal_sekolah, 3, 100, 'Asal sekolah'),
};

/** Validasi satu field. Mengembalikan pesan error atau null. */
export const validasiField = (nama, nilai, hariIni = new Date()) => ATURAN[nama](nilai, hariIni);

/** Validasi berita (panel admin). Batas sama dengan CHECK tabel berita. */
export const URUTAN_BERITA = ['kategori', 'tanggal_acara', 'lokasi', 'judul', 'ringkasan', 'isi'];
export function validasiBerita(v) {
  const errors = {};
  if (v.jenis === 'agenda') {
    if (!v.tanggal_acara || Number.isNaN(Date.parse(v.tanggal_acara))) errors.tanggal_acara = 'Tanggal dan jam acara wajib diisi untuk agenda.';
    if ((v.lokasi ?? '').trim().length > 120) errors.lokasi = 'Lokasi maksimal 120 karakter.';
  }
  const judul = panjang(v.judul, 5, 160, 'Judul');
  if (judul) errors.judul = judul;
  if (v.kategori.trim().length > 40) errors.kategori = 'Kategori maksimal 40 karakter.';
  if (v.ringkasan.trim().length > 300) errors.ringkasan = 'Ringkasan maksimal 300 karakter.';
  const isi = panjang(v.isi, 10, 20000, 'Isi berita');
  if (isi) errors.isi = isi;
  return errors;
}

/** Validasi pengurus (panel admin). Batas sama dengan CHECK tabel pengurus. */
export const URUTAN_PENGURUS = ['nama', 'jabatan', 'urutan'];
export function validasiPengurus(v) {
  const errors = {};
  const nama = panjang(v.nama, 3, 100, 'Nama');
  if (nama) errors.nama = nama;
  const jabatan = panjang(v.jabatan, 2, 100, 'Jabatan');
  if (jabatan) errors.jabatan = jabatan;
  const n = Number(v.urutan);
  if (v.urutan === '' || !Number.isInteger(n) || n < 0 || n > 999) errors.urutan = 'Urutan berupa angka bulat 0–999.';
  return errors;
}

/** Validasi semua field. Mengembalikan objek { field: pesan } (kosong bila valid). */
export function validasiPendaftar(nilai, hariIni = new Date()) {
  const errors = {};
  for (const field of URUTAN_FIELD) {
    const pesan = validasiField(field, nilai, hariIni);
    if (pesan) errors[field] = pesan;
  }
  return errors;
}
