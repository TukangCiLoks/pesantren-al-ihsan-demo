import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/Section.css';
import '../styles/Card.css';
import '../styles/HalamanIndeks.css';

/** Halaman induk menu (mis. /profil): kartu menuju setiap sub-halaman. Dibuat otomatis dari menu. */
export default function HalamanIndeks({ item }) {
  useDocumentTitle(item.label);
  return (
    <>
      <PageHeader judul={item.label} pengantar={item.ringkas} />
      <section className="section section--white" aria-label={`Bagian ${item.label}`}>
        <div className="container">
          <ul className="indeks__grid">
            {item.anak.map((a, i) => (
              <Reveal as="li" key={a.to} delay={(i % 3) * 120}>
                <article className="card card--interaktif indeks__kartu">
                  <h2 className="indeks__judul">
                    <Link to={a.to} className="indeks__tautan">
                      {a.label}
                    </Link>
                  </h2>
                  {a.ringkas && <p>{a.ringkas}</p>}
                  {a.anak && (
                    <p className="indeks__sub">
                      {a.anak.length} sub-halaman: {a.anak.map((x) => x.label).join(', ')}
                    </p>
                  )}
                  <span className="indeks__lanjut" aria-hidden="true">
                    Buka halaman →
                  </span>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
