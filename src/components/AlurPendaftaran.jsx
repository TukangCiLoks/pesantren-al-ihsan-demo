import Reveal from './Reveal.jsx';
import { ALUR } from '../data/konten.js';
import '../styles/AlurPendaftaran.css';

const IKON = {
  formulir: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  berkas: <path d="M4 12l5 5L20 6" />,
  tes: <path d="M12 3l9 4-9 4-9-4zM6 9v5c3 2.5 9 2.5 12 0V9" />,
  pengumuman: <path d="M4 10v4h3l6 4V6L7 10zM17 9a4 4 0 0 1 0 6" />,
};

/** Empat langkah pendaftaran, dihubungkan garis; muncul bertahap saat di-scroll. */
export default function AlurPendaftaran() {
  return (
    <ol className="alur" aria-label="Alur pendaftaran">
      {ALUR.map((l, i) => (
        <Reveal as="li" key={l.judul} delay={i * 150} className="alur__langkah">
          <span className="alur__ikon">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {IKON[l.ikon]}
            </svg>
          </span>
          <div>
            <p className="alur__nomor">Langkah {i + 1}</p>
            <h3 className="alur__judul">{l.judul}</h3>
            <p className="alur__teks">{l.teks}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
