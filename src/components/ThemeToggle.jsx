import { PILIHAN_TEMA, useTema } from '../hooks/useTema.js';
import '../styles/ThemeToggle.css';

const INFO = {
  sistem: {
    label: 'Ikuti sistem',
    ikon: <path d="M3 5h18v11H3zM8 20h8M12 16v4" />,
  },
  terang: {
    label: 'Terang',
    ikon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  gelap: {
    label: 'Gelap',
    ikon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  },
};

/**
 * Tombol tema di header (selalu di atas latar navy).
 * Sekali klik berganti berurutan: Ikuti sistem → Terang → Gelap → …
 * Pergantian terjadi seketika, tanpa animasi tambahan.
 */
export default function ThemeToggle() {
  const [tema, setTema] = useTema();
  const berikut = PILIHAN_TEMA[(PILIHAN_TEMA.indexOf(tema) + 1) % PILIHAN_TEMA.length];
  const keterangan = `Tema: ${INFO[tema].label}. Ganti ke ${INFO[berikut].label}`;

  return (
    <button type="button" className="tema-toggle" onClick={() => setTema(berikut)} aria-label={keterangan} title={keterangan}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {INFO[tema].ikon}
      </svg>
      <span className="tema-toggle__teks" aria-hidden="true">
        {INFO[tema].label}
      </span>
    </button>
  );
}
