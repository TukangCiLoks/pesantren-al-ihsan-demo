import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import { EKSKUL } from '../../data/pendidikan.js';
import '../../styles/Card.css';
import '../../styles/Ekskul.css';

// Ikon garis sederhana buatan sendiri (warna mengikuti tema lewat currentColor).
const IKON = {
  tenda: <path d="M3 20h18M12 4L4 20M12 4l8 16M12 4v16M9 20l3-5 3 5" />,
  panah: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12l8-8M17 4h3v3" />
    </>
  ),
  bola: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l4 3-1.5 5h-5L8 10zM12 3v4M21 11l-5-1M17 20l-2.5-5M7 20l2.5-5M3 11l5-1" />
    </>
  ),
  pena: <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3M4 20h7" />,
  musik: (
    <>
      <ellipse cx="12" cy="7" rx="8" ry="3" />
      <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
    </>
  ),
  labu: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9" />,
  mikrofon: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </>
  ),
  koran: <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7M7 16h4" />,
};

export default function Ekstrakurikuler() {
  return (
    <Halaman pengantar="Kegiatan sore dan akhir pekan untuk menyalurkan minat, bakat, dan melatih kerja sama. Pramuka wajib, lainnya pilihan.">
      <Bagian id="ekskul" judul="Daftar ekstrakurikuler" judulTersembunyi>
        <ul className="grid-kartu grid-kartu--4">
          {EKSKUL.map((e, i) => (
            <Reveal as="li" key={e.nama} delay={(i % 4) * 100}>
              <article className="card ekskul-kartu">
                <span className="ekskul-kartu__ikon">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {IKON[e.ikon]}
                  </svg>
                </span>
                <h3>{e.nama}</h3>
                <p className="ekskul-kartu__meta">
                  <span className="label-garis">{e.kategori}</span>
                  <span>{e.jadwal}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
