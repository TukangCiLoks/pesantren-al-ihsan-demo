import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import { MISI, NILAI_INTI, VISI } from '../../data/profil.js';
import '../../styles/Card.css';
import '../../styles/VisiMisi.css';

export default function VisiMisi() {
  return (
    <Halaman>
      <Bagian id="visi" judul="Visi">
        <Reveal as="blockquote" className="visi">
          <p>{VISI}</p>
        </Reveal>
      </Bagian>

      <Bagian id="misi" judul="Misi" tone="soft">
        <ol className="misi">
          {MISI.map((m, i) => (
            <Reveal as="li" key={m} delay={i * 90} className="misi__item">
              <span className="misi__nomor" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{m}</p>
            </Reveal>
          ))}
        </ol>
      </Bagian>

      <Bagian id="nilai" judul="Nilai inti">
        <ul className="grid-kartu grid-kartu--4">
          {NILAI_INTI.map((n, i) => (
            <Reveal as="li" key={n.judul} delay={i * 110}>
              <article className="card nilai-kartu">
                <h3>{n.judul}</h3>
                <p>{n.teks}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
