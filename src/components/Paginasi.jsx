import '../styles/Paginasi.css';

/** Nomor halaman yang ditampilkan: pertama, terakhir, dan tetangga halaman aktif, dengan "…" di celah. */
function nomorTampil(aktif, total) {
  const set = new Set([1, total, aktif - 1, aktif, aktif + 1].filter((n) => n >= 1 && n <= total));
  const urut = [...set].sort((a, b) => a - b);
  const hasil = [];
  urut.forEach((n, i) => {
    if (i && n - urut[i - 1] > 1) hasil.push('…');
    hasil.push(n);
  });
  return hasil;
}

/**
 * Navigasi halaman. Tombol (bukan tautan) karena perpindahan ditangani lewat
 * parameter URL oleh induknya (onPilih). Halaman aktif ditandai aria-current.
 */
export default function Paginasi({ halaman, totalHalaman, onPilih }) {
  if (totalHalaman <= 1) return null;
  return (
    <nav className="paginasi" aria-label="Halaman">
      <button type="button" className="paginasi__tombol" disabled={halaman <= 1} onClick={() => onPilih(halaman - 1)}>
        ← <span className="paginasi__teks">Sebelumnya</span>
      </button>
      <ul className="paginasi__daftar">
        {nomorTampil(halaman, totalHalaman).map((n, i) =>
          n === '…' ? (
            <li key={`celah-${i}`} aria-hidden="true" className="paginasi__celah">
              …
            </li>
          ) : (
            <li key={n}>
              <button
                type="button"
                className="paginasi__tombol paginasi__nomor"
                aria-current={n === halaman ? 'page' : undefined}
                aria-label={`Halaman ${n}`}
                onClick={() => onPilih(n)}
              >
                {n}
              </button>
            </li>
          ),
        )}
      </ul>
      <button type="button" className="paginasi__tombol" disabled={halaman >= totalHalaman} onClick={() => onPilih(halaman + 1)}>
        <span className="paginasi__teks">Berikutnya</span> →
      </button>
    </nav>
  );
}
