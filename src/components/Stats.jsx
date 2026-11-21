import { useReveal } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { STATISTIK } from '../data/konten.js';
import { formatAngka } from '../utils/format.js';
import '../styles/Stats.css';

function StatItem({ label, nilai, tahun }) {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  // Animasi 6 — counter mulai saat terlihat.
  const tampil = useCountUp(nilai, { start: visible });
  const teks = (n) => (tahun ? String(n) : formatAngka(n));

  return (
    <li ref={ref} className="stat">
      {/* Angka yang berubah disembunyikan dari pembaca layar; angka akhir dibacakan sekali. */}
      <span className="stat__nilai" aria-hidden="true">
        {teks(tampil)}
      </span>
      <span className="visually-hidden">{teks(nilai)}</span>
      <span className="stat__label">{label}</span>
    </li>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Pesantren dalam angka">
      <div className="container">
        <ul className="stats__list">
          {STATISTIK.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </ul>
      </div>
    </section>
  );
}
