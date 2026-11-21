import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import PolaGeometri from './PolaGeometri.jsx';
import { GALERI } from '../data/konten.js';
import '../styles/BeritaCard.css';
import '../styles/Galeri.css';

export default function Galeri() {
  return (
    <Section
      id="galeri"
      eyebrow="Galeri"
      title="Sudut-sudut pesantren"
      intro="Ilustrasi placeholder. Pada situs sungguhan, bagian ini berisi foto kegiatan."
    >
      <ul className="galeri__grid">
        {GALERI.map((g, i) => (
          <Reveal as="li" key={g.id} delay={(i % 3) * 100}>
            <figure className="galeri__item">
              <div className="thumb thumb--hover galeri__thumb">
                <PolaGeometri varian={g.pola} className="thumb__img" />
              </div>
              <figcaption>{g.judul}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
