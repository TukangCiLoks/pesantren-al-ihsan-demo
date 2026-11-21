import Halaman, { Bagian } from '../../components/Halaman.jsx';
import AjakanDaftar from '../../components/AjakanDaftar.jsx';
import { FAQ } from '../../data/ppdb.js';
import '../../styles/PPDB.css';

/**
 * FAQ memakai <details>/<summary> bawaan peramban: bisa dibuka dengan Enter/Spasi,
 * status buka/tutup dibacakan pembaca layar, dan isinya ikut ditemukan Ctrl+F — tanpa JavaScript.
 */
export default function Faq() {
  return (
    <Halaman pengantar="Jawaban untuk pertanyaan yang paling sering diajukan calon wali santri.">
      <Bagian id="faq" judul="Pertanyaan yang sering diajukan" judulTersembunyi>
        <div className="faq">
          {FAQ.map((f, i) => (
            <details key={f.t} className="faq__item" open={i === 0}>
              <summary className="faq__tanya">
                {f.t}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="faq__jawab">{f.j}</p>
            </details>
          ))}
        </div>
        <AjakanDaftar sekunder={{ to: '/kontak', label: 'Hubungi kami' }} />
      </Bagian>
    </Halaman>
  );
}
