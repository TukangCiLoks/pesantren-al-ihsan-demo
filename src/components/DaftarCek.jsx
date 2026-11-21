/** Daftar poin dengan ikon centang bulat (warna mengikuti tema). */
export default function DaftarCek({ items }) {
  return (
    <ul className="daftar-cek">
      {items.map((teks) => (
        <li key={teks}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="12" cy="12" r="11" style={{ fill: 'var(--heading)' }} />
            <path d="M7 12.5l3.2 3.2L17 9" fill="none" style={{ stroke: 'var(--bg)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {teks}
        </li>
      ))}
    </ul>
  );
}
