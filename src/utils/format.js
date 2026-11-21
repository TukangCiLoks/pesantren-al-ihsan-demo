// Semua tanggal & jam situs ini ditampilkan dalam WIB (Asia/Jakarta), apa pun zona waktu
// perangkat pengunjung — supaya "08.00 WIB" benar-benar 08.00 WIB bagi semua orang.
const ZONA = 'Asia/Jakarta';
const OFFSET_WIB = '+07:00'; // WIB tidak memakai musim panas, jadi selalu +07:00

const formatTanggalId = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: ZONA });

export const formatTanggal = (iso) => formatTanggalId.format(new Date(iso));

/** Tanggal tanpa jam (mis. tgl_lahir "2013-05-01"): diperlakukan sebagai tanggal WIB agar tidak bergeser hari. */
export const formatTanggalSaja = (yyyyMmDd) => formatTanggalId.format(new Date(`${yyyyMmDd}T12:00:00${OFFSET_WIB}`));

const formatJamId = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: ZONA });
const formatHariId = new Intl.DateTimeFormat('id-ID', { weekday: 'long', timeZone: ZONA });
const formatHariAngka = new Intl.DateTimeFormat('id-ID', { day: 'numeric', timeZone: ZONA });
const formatBulanPendekId = new Intl.DateTimeFormat('id-ID', { month: 'short', timeZone: ZONA });

/** Jam "08.00" dalam WIB. */
export const formatJam = (iso) => formatJamId.format(new Date(iso));

/** "Senin, 1 Desember 2026 · 08.00 WIB" — untuk agenda. */
export const formatTanggalJam = (iso) => `${formatHariId.format(new Date(iso))}, ${formatTanggal(iso)} · ${formatJam(iso)} WIB`;

/** Bagian tanggal (WIB) untuk blok kalender kecil: { hari: '1', bulan: 'Des' }. */
export const bagianTanggal = (iso) => {
  const d = new Date(iso);
  return { hari: formatHariAngka.format(d), bulan: formatBulanPendekId.format(d).replace('.', '') };
};

/** ISO → nilai <input type="datetime-local"> berupa jam dinding WIB (tanpa detik). */
export const keInputWaktu = (iso) => {
  if (!iso) return '';
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date(iso))
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
};

/** Nilai <input type="datetime-local"> (dianggap jam WIB) → ISO UTC untuk disimpan. */
export const dariInputWaktu = (nilai) => (nilai ? new Date(`${nilai}:00${OFFSET_WIB}`).toISOString() : null);

export const formatAngka = (n) => n.toLocaleString('id-ID');

/** Memecah teks polos menjadi paragraf pada baris kosong. Tidak pernah HTML. */
export const pecahParagraf = (teks = '') =>
  teks
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
