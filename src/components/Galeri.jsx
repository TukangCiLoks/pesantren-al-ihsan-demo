import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Button from './Button.jsx';
import PolaGeometri from './PolaGeometri.jsx';
import { GALERI } from '../data/konten.js';
import '../styles/BeritaCard.css';
import '../styles/Galeri.css';

/** Grid galeri (dipakai di beranda dan halaman Galeri). */
export function GaleriGrid({ items }) {
  return (
    <ul className="galeri__grid">
      {items.map((g, i) => (
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
  );
}

/** Bagian galeri di beranda: 6 item pertama + tautan ke halaman Galeri. */
export default function Galeri() {
  return (
    <Section
      id="galeri"
      eyebrow="Galeri"
      title="Sudut-sudut pesantren"
      intro="Ilustrasi placeholder. Pada situs sungguhan, bagian ini berisi foto kegiatan."
    >
      <GaleriGrid items={GALERI.slice(0, 6)} />
      <div className="galeri__lainnya">
        <Button to="/informasi/galeri" variant="ghost-dark">
          Lihat semua galeri
        </Button>
      </div>
    </Section>
  );
}
