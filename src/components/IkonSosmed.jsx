/**
 * Ikon media sosial satu warna (currentColor), digambar sendiri dan disederhanakan.
 * Tanpa warna merek, supaya tetap di dalam palet navy/putih.
 */
const IKON = {
  facebook: (
    <path
      d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V2.5h-2.5A4.5 4.5 0 0 0 10 7v1.5H7.5v3.2H10V21.5h4v-9.8h2.6l.5-3.2z"
      fill="currentColor"
    />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </g>
  ),
  tiktok: (
    <path
      d="M13.5 2.5h3.2c.3 2.3 1.8 3.9 4 4.2v3.2a7.2 7.2 0 0 1-4-1.3v6.6a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.3a3 3 0 1 0 2.1 2.8z"
      fill="currentColor"
    />
  ),
  youtube: (
    <g>
      <rect x="2" y="5" width="20" height="14" rx="4.5" fill="currentColor" />
      <path d="M10 9.2v5.6l4.8-2.8z" style={{ fill: 'var(--ikon-sosmed-isi, var(--navy))' }} />
    </g>
  ),
};

export default function IkonSosmed({ id, ukuran = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={ukuran} height={ukuran} aria-hidden="true" focusable="false">
      {IKON[id]}
    </svg>
  );
}
