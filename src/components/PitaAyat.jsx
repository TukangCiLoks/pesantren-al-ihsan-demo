import Reveal from './Reveal.jsx';
import PolaLatar from './PolaLatar.jsx';
import { AYAT } from '../data/konten.js';
import '../styles/PitaAyat.css';

/** Pita navy berisi kutipan ayat — jeda visual di tengah halaman yang terang. */
export default function PitaAyat() {
  return (
    <section className="pita-ayat on-dark" aria-labelledby="pita-ayat-judul">
      <PolaLatar className="pita-ayat__pola" ukuran={110} opasitas={0.08} />
      <div className="container">
        <h2 id="pita-ayat-judul" className="visually-hidden">
          Kutipan ayat
        </h2>
        <Reveal as="figure" className="pita-ayat__isi">
          <svg className="pita-ayat__ornamen" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="11" y="11" width="18" height="18" />
              <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" />
            </g>
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
          <blockquote>
            <p className="teks-arab pita-ayat__arab" lang="ar" dir="rtl">
              {AYAT.arab}
            </p>
            <p className="pita-ayat__terjemahan">“{AYAT.terjemahan}”</p>
          </blockquote>
          <figcaption className="pita-ayat__sumber">{AYAT.sumber}</figcaption>
        </Reveal>
      </div>
    </section>
  );
}
