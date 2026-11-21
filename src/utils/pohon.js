// Utilitas pohon struktur organisasi (data datar → pohon bersarang).

const urut = (a, b) => a.urutan - b.urutan || a.nama.localeCompare(b.nama, 'id');

/**
 * Ubah baris datar {id, induk_id, …} menjadi pohon [{…baris, anak: [...]}].
 * Baris yang atasannya tidak ada dalam daftar (mis. atasan nonaktif) ikut menjadi akar,
 * supaya tidak ada orang yang "hilang" dari bagan.
 */
export function bangunPohon(baris) {
  const peta = new Map(baris.map((b) => [b.id, { ...b, anak: [] }]));
  const akar = [];
  for (const simpul of peta.values()) {
    const induk = simpul.induk_id != null ? peta.get(simpul.induk_id) : null;
    if (induk) induk.anak.push(simpul);
    else akar.push(simpul);
  }
  const susun = (daftar) => {
    daftar.sort(urut);
    daftar.forEach((s) => susun(s.anak));
    return daftar;
  };
  return susun(akar);
}

/** Semua id keturunan `id` (anak, cucu, …). Dipakai agar admin tidak memilih bawahan sebagai atasan. */
export function keturunan(baris, id) {
  const hasil = new Set();
  const antre = [id];
  while (antre.length) {
    const cur = antre.shift();
    for (const b of baris) {
      if (b.induk_id === cur && !hasil.has(b.id)) {
        hasil.add(b.id);
        antre.push(b.id);
      }
    }
  }
  return hasil;
}

/** Inisial nama tanpa gelar, mis. "Ustadz Hasan Demo" → "HD", "KH. Abdul Rasyid" → "AR". */
export function inisial(nama) {
  const kata = nama
    .replace(/^((KH|H|Hj|Dr|Ir)\.\s+)+/i, '')
    .replace(/^(Ustadzah|Ustadz|Bapak|Ibu)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean);
  return ((kata[0]?.[0] ?? '') + (kata[1]?.[0] ?? '')).toUpperCase();
}
