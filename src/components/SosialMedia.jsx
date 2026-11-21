import IkonSosmed from './IkonSosmed.jsx';
import { NAMA, SOSMED } from '../data/konten.js';
import '../styles/SosialMedia.css';

/**
 * Tautan media sosial. Selalu dipakai di atas latar navy (bar atas, footer).
 * varian: 'ikon' (ikon saja) | 'label' (ikon + nama platform)
 * Label lengkap untuk pembaca layar menyebut bahwa tautan dibuka di tab baru.
 */
export default function SosialMedia({ varian = 'ikon', judul }) {
  return (
    <ul className={`sosmed sosmed--${varian}`} aria-label={judul ?? `Media sosial ${NAMA}`}>
      {SOSMED.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sosmed__tautan"
            aria-label={`${s.nama} ${NAMA} (akun demo, buka di tab baru)`}
            title={s.nama}
          >
            <IkonSosmed id={s.id} ukuran={varian === 'ikon' ? 18 : 20} />
            {varian === 'label' && <span aria-hidden="true">{s.nama}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
