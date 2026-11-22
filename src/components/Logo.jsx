import { Link } from 'react-router-dom';
import '../styles/Logo.css';

/**
 * Wordmark. Satu-satunya tempat font Cinzel dipakai.
 * Nama tautan = teks yang terlihat ("Pesantren Al-Ihsan (Demo)") + keterangan tersembunyi
 * "ke beranda", sehingga pengguna kontrol suara bisa menyebut apa yang mereka lihat
 * (WCAG 2.5.3 Label in Name). Teks ditulis kapital via CSS, bukan di sumber, agar
 * pembaca layar tidak mengejanya huruf per huruf.
 */
export default function Logo() {
  return (
    <Link to="/" className="logo">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <rect x="11" y="11" width="18" height="18" />
          <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" />
        </g>
        <circle cx="20" cy="20" r="3.2" fill="currentColor" />
      </svg>
      <span className="logo__text">
        <span className="logo__small">Pesantren </span>
        <span className="logo__name">Al-Ihsan</span>
      </span>
      <span className="logo__demo"> (Demo)</span>
      <span className="visually-hidden">, ke beranda</span>
    </Link>
  );
}
