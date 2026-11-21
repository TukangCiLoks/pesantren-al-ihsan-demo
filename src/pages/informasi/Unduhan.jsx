import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import { UNDUHAN } from '../../data/unduhan.js';
import '../../styles/Informasi.css';

const IkonDokumen = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 3h7l5 5v13H7zM14 3v5h5" />
    <path d="M10 13h6M10 17h4" />
  </svg>
);
const IkonUnduh = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export default function Unduhan() {
  return (
    <Halaman pengantar="Dokumen resmi pesantren dalam format PDF. Semua dokumen di halaman ini adalah contoh fiktif.">
      <Bagian id="dokumen" judul="Daftar dokumen" judulTersembunyi>
        <ul className="daftar-info">
          {UNDUHAN.map((d, i) => (
            <Reveal as="li" key={d.file} delay={i * 90}>
              <article className="item-info unduhan">
                <span className="unduhan__ikon">
                  <IkonDokumen />
                </span>
                <div className="unduhan__teks">
                  <h3 className="item-info__judul">{d.judul}</h3>
                  <p className="item-info__ringkasan">{d.keterangan}</p>
                  <p className="item-info__meta">
                    <span className="label-garis">{d.kategori}</span>
                    <span>PDF · {d.ukuran}</span>
                  </p>
                </div>
                <a className="bagikan__tombol unduhan__tombol" href={d.file} download>
                  <IkonUnduh /> Unduh<span className="visually-hidden"> {d.judul} (PDF, {d.ukuran})</span>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
