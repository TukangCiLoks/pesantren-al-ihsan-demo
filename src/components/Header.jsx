import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import NavUtama from './NavUtama.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import '../styles/Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Tutup panel menu setiap kali berpindah tujuan.
  useEffect(() => setOpen(false), [location.key]);

  // Esc menutup panel menu ponsel (submenu yang terbuka ditutup lebih dulu oleh NavUtama).
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
          <NavUtama />
          <Button to="/ppdb/formulir" variant="light" className="header__cta">
            Daftar Online
          </Button>
        </nav>

        {/* Setelah menu di DOM, jadi urutan Tab mengikuti urutan visual di semua lebar. */}
        <ThemeToggle />
      </div>
    </header>
  );
}
