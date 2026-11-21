import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { MENU } from '../data/konten.js';
import '../styles/Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Tutup menu setiap kali berpindah tujuan.
  useEffect(() => setOpen(false), [location.key]);

  // Esc menutup menu mobile.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header on-dark">
      <div className="container header__bar">
        <Logo />

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-utama"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Tutup menu' : 'Buka menu'}</span>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <nav id="menu-utama" className={`header__nav${open ? ' is-open' : ''}`} aria-label="Menu utama">
          <ul className="header__list">
            {MENU.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="header__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/#daftar" variant="light" className="header__cta">
            Pendaftaran Online
          </Button>
        </nav>
      </div>
    </header>
  );
}
