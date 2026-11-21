import { inisial } from '../utils/pohon.js';
import '../styles/BaganOrganisasi.css';

function Simpul({ s }) {
  return (
    <li>
      <div className="bagan__simpul">
        <svg className="bagan__avatar" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <circle cx="20" cy="20" r="20" style={{ fill: 'var(--primary)' }} />
          <text
            x="20"
            y="21"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: 'var(--on-primary)', fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: '14px' }}
          >
            {inisial(s.nama)}
          </text>
        </svg>
        <span className="bagan__teks">
          <span className="bagan__jabatan">{s.jabatan}</span>
          <span className="bagan__nama">{s.nama}</span>
        </span>
      </div>
      {s.anak.length > 0 && (
        <ul>
          {s.anak.map((a) => (
            <Simpul key={a.id} s={a} />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Bagan organisasi dari pohon (lihat utils/pohon.js → bangunPohon).
 * Di balik tampilannya tetap daftar bersarang (<ul>), jadi pembaca layar membacakan
 * hierarki apa adanya: "daftar, 2 item … daftar bersarang …".
 * Ponsel: daftar menjorok dengan garis. ≥ 900px: bagan bergaris penghubung, bisa digeser
 * mendatar di dalam wadahnya bila lebih lebar dari layar.
 */
export default function BaganOrganisasi({ pohon, label }) {
  return (
    <div className="bagan-wadah" role="region" aria-label={label} tabIndex={0}>
      <ul className="bagan">
        {pohon.map((s) => (
          <Simpul key={s.id} s={s} />
        ))}
      </ul>
    </div>
  );
}
