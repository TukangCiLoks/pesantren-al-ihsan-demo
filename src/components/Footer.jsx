import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import SosialMedia from './SosialMedia.jsx';
import { KONTAK, NAMA } from '../data/konten.js';
import { MENU } from '../data/menu.js';
import '../styles/Footer.css';

// Kolom peta situs = menu level atas yang punya submenu (Profil, Pendidikan, Informasi, PPDB).
const KOLOM = MENU.filter((m) => m.anak);

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div className="footer__merek">
          <Logo />
          <p className="footer__note">
            Situs demo portofolio. {NAMA} adalah lembaga fiktif; seluruh nama, alamat, dan data di situs ini
            adalah contoh.
          </p>
          <address className="footer__alamat">
            {KONTAK.alamat.map((baris) => (
              <span key={baris}>{baris}</span>
            ))}
            <a href={`tel:${KONTAK.telepon.replace(/\D/g, '')}`}>{KONTAK.telepon}</a>
            <a href={`mailto:${KONTAK.email}`}>{KONTAK.email}</a>
          </address>
        </div>

        <nav className="footer__peta" aria-label="Peta situs">
          {KOLOM.map((kolom) => (
            <div key={kolom.to}>
              <h2 className="footer__title">
                <Link to={kolom.to}>{kolom.label}</Link>
              </h2>
              <ul className="footer__list">
                {kolom.anak.map((a) => (
                  <li key={a.to}>
                    <Link to={a.to}>{a.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__ikuti">
          <h2 className="footer__title">Ikuti Kami</h2>
          <SosialMedia varian="label" judul={`Ikuti ${NAMA} di media sosial`} />
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {NAMA} (Demo). Proyek portofolio.</p>
        <ul className="footer__bawah-tautan">
          <li>
            <Link to="/kontak">Kontak</Link>
          </li>
          <li>
            <Link to="/admin/login">Admin</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
