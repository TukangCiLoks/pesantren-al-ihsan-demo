import { useId } from 'react';

/**
 * Placeholder gambar buatan sendiri: pola geometri Islami sederhana.
 * `varian` (0–3) mengubah komposisi agar tiap kartu tidak identik.
 *
 * Warna lewat variabel CSS (atribut `style`, karena atribut SVG biasa tidak
 * menerima var()). Varian 2–3 berlatar terang di mode terang dan otomatis
 * menjadi navy di mode gelap (lihat --ilus-* di tokens.css).
 */
const LATAR = ['var(--navy)', 'var(--navy-2)', 'var(--ilus-terang-1)', 'var(--ilus-terang-2)'];

export default function PolaGeometri({ varian = 0, className = '' }) {
  // Terima angka atau id seperti "contoh-2"; ambil angkanya saja.
  const v = (Number(String(varian).replace(/\D/g, '')) || 0) % 4;
  const gelap = v < 2;
  const garis = gelap ? 'var(--white)' : 'var(--ilus-garis-terang)';
  // id unik per instans agar tidak ada id ganda di DOM.
  const id = `pola-${v}-${useId().replace(/:/g, '')}`;

  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={v % 2 ? 80 : 100} height={v % 2 ? 80 : 100} patternUnits="userSpaceOnUse">
          <g fill="none" style={{ stroke: garis }} strokeOpacity={gelap ? 0.22 : 0.35} strokeWidth="1.5">
            <rect x="25%" y="25%" width="50%" height="50%" />
            <rect x="25%" y="25%" width="50%" height="50%" transform={`rotate(45 ${v % 2 ? 40 : 50} ${v % 2 ? 40 : 50})`} />
            {v === 2 && <circle cx="50" cy="50" r="12" />}
            {v === 3 && <path d="M0 40h80M40 0v80" />}
          </g>
        </pattern>
      </defs>
      <rect width="400" height="260" style={{ fill: LATAR[v] }} />
      <rect width="400" height="260" fill={`url(#${id})`} />
      <path d="M170 190 v-50 q30 -46 60 0 v50z" style={{ fill: garis }} fillOpacity={gelap ? 0.14 : 0.18} />
    </svg>
  );
}
