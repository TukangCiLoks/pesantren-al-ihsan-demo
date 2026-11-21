import SosialMedia from './SosialMedia.jsx';
import { KONTAK } from '../data/konten.js';
import '../styles/TopBar.css';

/** Bar tipis di atas header: kontak, jam layanan, media sosial. Tidak ikut menempel saat scroll. */
export default function TopBar() {
  return (
    <div className="topbar on-dark">
      <div className="container topbar__isi">
        <ul className="topbar__info" aria-label="Kontak cepat">
          <li>
            <a href={`tel:${KONTAK.telepon.replace(/\D/g, '')}`}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
              </svg>
              {KONTAK.telepon}
            </a>
          </li>
          <li className="topbar__opsional">
            <a href={`mailto:${KONTAK.email}`}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {KONTAK.email}
            </a>
          </li>
          <li className="topbar__opsional topbar__opsional--lebar">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {KONTAK.jamLayanan}
          </li>
        </ul>
        <SosialMedia varian="ikon" />
      </div>
    </div>
  );
}
