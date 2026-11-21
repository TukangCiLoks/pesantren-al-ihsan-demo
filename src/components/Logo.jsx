import { Link } from 'react-router-dom';
import '../styles/Logo.css';

/** Wordmark. Satu-satunya tempat font Cinzel dipakai. */
export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Pesantren Al-Ihsan (Demo), ke beranda">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <rect x="11" y="11" width="18" height="18" />
          <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" />
        </g>
        <circle cx="20" cy="20" r="3.2" fill="currentColor" />
      </svg>
      <span className="logo__text" aria-hidden="true">
        <span className="logo__small">PESANTREN</span>
        <span className="logo__name">AL-IHSAN</span>
      </span>
      <span className="logo__demo" aria-hidden="true">
        (DEMO)
      </span>
    </Link>
  );
}
