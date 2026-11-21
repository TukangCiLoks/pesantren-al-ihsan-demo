import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import KartuOrang from '../../components/KartuOrang.jsx';
import { ASATIDZ } from '../../data/profil.js';

export default function Asatidz() {
  return (
    <Halaman pengantar="Para pengasuh dan pengajar yang membimbing santri setiap hari. Seluruh nama di halaman ini fiktif.">
      <Bagian id="asatidz" judul="Pengasuh & asatidz" judulTersembunyi>
        <ul className="grid-kartu grid-kartu--4">
          {ASATIDZ.map((o, i) => (
            <Reveal as="li" key={o.nama} delay={(i % 4) * 100}>
              <KartuOrang {...o} />
            </Reveal>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
