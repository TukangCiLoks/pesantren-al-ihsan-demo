const formatTanggalId = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatTanggal = (iso) => formatTanggalId.format(new Date(iso));

/** Tanggal tanpa jam (mis. tgl_lahir "2013-05-01"), dibaca sebagai waktu lokal agar tidak bergeser hari. */
export const formatTanggalSaja = (yyyyMmDd) => formatTanggalId.format(new Date(`${yyyyMmDd}T00:00:00`));

export const formatAngka = (n) => n.toLocaleString('id-ID');

/** Memecah teks polos menjadi paragraf pada baris kosong. Tidak pernah HTML. */
export const pecahParagraf = (teks = '') =>
  teks
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
