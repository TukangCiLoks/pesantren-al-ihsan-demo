import { Link } from 'react-router-dom';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import DaftarCek from '../../components/DaftarCek.jsx';
import IlustrasiFasilitas from '../../components/IlustrasiFasilitas.jsx';
import { FASILITAS } from '../../data/profil.js';
import { MENU } from '../../data/menu.js';

// Daftar fasilitas lain diambil dari menu, supaya selalu sinkron dengan submenu Fasilitas.
const MENU_FASILITAS = MENU.find((m) => m.to === '/profil').anak.find((a) => a.to === '/profil/fasilitas').anak;

/** Satu templat untuk semua halaman fasilitas; isi diambil dari data/profil.js berdasarkan `jenis`. */
export default function Fasilitas({ jenis }) {
  const f = FASILITAS[jenis];
  const lainnya = MENU_FASILITAS.filter((m) => !m.to.endsWith(`/${jenis}`));

  return (
    <Halaman pengantar={f.pengantar}>
      <Bagian id="fasilitas" judul="Tentang fasilitas ini" judulTersembunyi>
        <div className="dua-kolom">
          <Reveal arah="kiri" className="prosa">
            {f.paragraf.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="panel panel--jarak">
              <p className="panel__judul">Yang tersedia</p>
              <DaftarCek items={f.poin} />
            </div>
          </Reveal>
          <Reveal arah="kanan">
            <IlustrasiFasilitas jenis={f.ilustrasi} />
          </Reveal>
        </div>
      </Bagian>

      <Bagian id="lainnya" judul="Fasilitas lainnya" tone="soft">
        <ul className="grid-kartu grid-kartu--3">
          {lainnya.map((m) => (
            <li key={m.to}>
              <Link to={m.to} className="panel tautan-panel">
                <span className="tautan-panel__judul">{m.label}</span>
                <span className="tautan-panel__teks">{m.ringkas}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
