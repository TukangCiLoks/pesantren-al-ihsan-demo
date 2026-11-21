import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { KONTAK, MENU } from '../data/konten.js';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer id="kontak" className="footer on-dark">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="footer__note">
            Situs demo portofolio. Pesantren Al-Ihsan adalah lembaga fiktif; seluruh nama, alamat, dan data di
            situs ini adalah contoh.
          </p>
        </div>

        <div>
          <h2 className="footer__title">Alamat</h2>
          <address className="footer__address">
            {KONTAK.alamat.map((baris) => (
              <span key={baris}>{baris}</span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="footer__title">Kontak</h2>
          <ul className="footer__list">
            <li>
              Telepon: <a href={`tel:${KONTAK.telepon.replace(/\D/g, '')}`}>{KONTAK.telepon}</a>
            </li>
            <li>
              Email: <a href={`mailto:${KONTAK.email}`}>{KONTAK.email}</a>
            </li>
          </ul>
        </div>

        <nav aria-label="Tautan footer">
          <h2 className="footer__title">Tautan</h2>
          <ul className="footer__list">
            {MENU.map((m) => (
              <li key={m.to}>
                <Link to={m.to}>{m.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/admin/login">Admin</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Pesantren Al-Ihsan (Demo). Proyek portofolio.</p>
      </div>
    </footer>
  );
}
