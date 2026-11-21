import Reveal from './Reveal.jsx';
import '../styles/Section.css';

/** Bagian halaman dengan judul dan latar (putih / selang-seling / navy). */
export default function Section({ id, eyebrow, title, intro, tone = 'white', children }) {
  const headingId = `${id}-judul`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`section section--${tone}${tone === 'navy' ? ' on-dark' : ''}`}
    >
      <div className="container">
        <Reveal as="header" className="section__header">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId}>{title}</h2>
          {intro && <p className="section__intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
