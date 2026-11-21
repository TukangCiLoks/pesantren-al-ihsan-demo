import '../styles/Card.css';
import '../styles/KartuOrang.css';

import { inisial } from '../utils/pohon.js';

/**
 * Kartu orang dengan avatar inisial (SVG buatan sendiri, bukan foto).
 * Dipakai di Pengasuh & Asatidz, dan nanti di Struktur Organisasi.
 */
export default function KartuOrang({ nama, peran, bidang }) {
  return (
    <article className="card kartu-orang">
      <svg className="kartu-orang__avatar" viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
        <circle cx="40" cy="40" r="40" style={{ fill: 'var(--primary)' }} />
        <circle cx="40" cy="40" r="34" fill="none" style={{ stroke: 'var(--on-primary)' }} strokeOpacity="0.25" strokeWidth="1.5" />
        <text
          x="40"
          y="41"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: 'var(--on-primary)', fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: '26px', letterSpacing: '1px' }}
        >
          {inisial(nama)}
        </text>
      </svg>
      <div>
        <h3 className="kartu-orang__nama">{nama}</h3>
        <p className="kartu-orang__peran">{peran}</p>
        {bidang && <p className="kartu-orang__bidang">{bidang}</p>}
      </div>
    </article>
  );
}
