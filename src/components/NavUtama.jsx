import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MENU } from '../data/menu.js';
import { aktifDi } from '../utils/menu.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import '../styles/Nav.css';

// Hover membuka submenu hanya di layar lebar dengan perangkat penunjuk (bukan sentuh).
const HOVER = '(min-width: 1100px) and (hover: hover)';
const JEDA_TUTUP = 180; // ms; memberi waktu kursor menyeberang ke submenu

/** Tautan/tombol langsung di satu level submenu (tanpa isi sub-submenunya). */
const itemLevel = (ul) => (ul ? [...ul.children].map((li) => li.firstElementChild).filter(Boolean) : []);

/** Panah atas/bawah, Home, End berpindah antar-item satu level. true bila tombol ditangani. */
function geserFokus(e, ul) {
  const items = itemLevel(ul);
  const i = items.indexOf(document.activeElement);
  const ke = { ArrowDown: (i + 1) % items.length, ArrowUp: (i - 1 + items.length) % items.length, Home: 0, End: items.length - 1 }[e.key];
  if (ke === undefined) return false;
  e.preventDefault();
  items[ke]?.focus();
  return true;
}

const Panah = () => (
  <svg className="nav__panah" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function NavItem({ item, depth, jalur, setJalur, hoverAktif }) {
  const { pathname } = useLocation();
  const subId = useId();
  const tombolRef = useRef(null);
  const subRef = useRef(null);
  const timer = useRef(null);
  const mintaFokus = useRef(false);
  const terbuka = Boolean(item.anak) && jalur[depth] === item.to;

  useEffect(() => () => clearTimeout(timer.current), []);

  // Dibuka lewat keyboard → fokus ke item pertama segera setelah submenu dirender
  // (layout effect berjalan sebelum peramban memproses tombol berikutnya).
  useLayoutEffect(() => {
    if (terbuka && mintaFokus.current) {
      mintaFokus.current = false;
      itemLevel(subRef.current)[0]?.focus();
    }
  }, [terbuka]);

  const kelasTautan = depth === 0 ? 'nav__link' : 'nav__sublink';

  if (!item.anak) {
    return (
      <li className="nav__item">
        <NavLink to={item.to} end className={kelasTautan}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  const buka = () => setJalur((j) => [...j.slice(0, depth), item.to]);
  // Hanya menutup bila level ini masih milik item ini (mencegah menutup menu tetangga yang baru dibuka).
  const tutup = () => setJalur((j) => (j[depth] === item.to ? j.slice(0, depth) : j));

  const onKeyTombol = (e) => {
    if (e.key === (depth === 0 ? 'ArrowDown' : 'ArrowRight')) {
      e.preventDefault();
      e.stopPropagation();
      if (terbuka) {
        itemLevel(subRef.current)[0]?.focus();
      } else {
        mintaFokus.current = true;
        buka();
      }
    } else if (e.key === 'Escape' && terbuka) {
      e.stopPropagation(); // jangan ikut menutup panel menu ponsel
      tutup();
    }
  };

  const onKeySub = (e) => {
    if (geserFokus(e, subRef.current)) {
      e.stopPropagation(); // submenu induk tidak ikut memproses
      return;
    }
    if (e.key === 'Escape' || (e.key === 'ArrowLeft' && depth > 0)) {
      e.preventDefault();
      e.stopPropagation();
      tutup();
      tombolRef.current?.focus();
    }
  };

  return (
    <li
      className={`nav__item nav__item--induk${terbuka ? ' is-open' : ''}`}
      onMouseEnter={() => {
        if (!hoverAktif) return;
        clearTimeout(timer.current);
        buka();
      }}
      onMouseLeave={() => {
        if (hoverAktif) timer.current = setTimeout(tutup, JEDA_TUTUP);
      }}
    >
      <button
        ref={tombolRef}
        type="button"
        className={`${kelasTautan} nav__tombol${aktifDi(pathname, item.to) ? ' is-aktif' : ''}`}
        aria-expanded={terbuka}
        aria-controls={subId}
        // Dengan hover, klik hanya membuka (supaya tidak menutup menu yang baru terbuka oleh hover).
        onClick={() => (terbuka && !hoverAktif ? tutup() : buka())}
        onKeyDown={onKeyTombol}
      >
        {item.label}
        <Panah />
      </button>
      <ul id={subId} ref={subRef} className={`nav__sub nav__sub--${depth + 1}`} onKeyDown={onKeySub}>
        <li className="nav__item">
          <NavLink to={item.to} end className="nav__sublink nav__ringkasan">
            Ringkasan {item.label}
          </NavLink>
        </li>
        {item.anak.map((a) => (
          <NavItem key={a.to} item={a} depth={depth + 1} jalur={jalur} setJalur={setJalur} hoverAktif={hoverAktif} />
        ))}
      </ul>
    </li>
  );
}

/**
 * Menu utama bertingkat (pola "disclosure navigation" WAI-ARIA, bukan role=menu):
 * - Desktop: submenu turun di bawah, sub-submenu ke samping; buka dengan hover, klik, atau panah.
 * - Ponsel: akordeon bertingkat di panel hamburger.
 * - Esc menutup level saat ini dan mengembalikan fokus; klik/fokus di luar menutup semuanya.
 * `jalur` = daftar item yang terbuka per level, mis. ['/profil', '/profil/struktur'].
 */
export default function NavUtama() {
  const [jalur, setJalur] = useState([]);
  const ref = useRef(null);
  const location = useLocation();
  const hoverAktif = useMediaQuery(HOVER);

  // Pindah halaman → tutup semua submenu.
  useEffect(() => setJalur([]), [location.key]);

  // Klik atau fokus di luar menu → tutup semua submenu.
  useEffect(() => {
    const diLuar = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setJalur([]);
    };
    document.addEventListener('pointerdown', diLuar);
    document.addEventListener('focusin', diLuar);
    return () => {
      document.removeEventListener('pointerdown', diLuar);
      document.removeEventListener('focusin', diLuar);
    };
  }, []);

  return (
    <ul ref={ref} className="nav__list">
      {MENU.map((item) => (
        <NavItem key={item.to} item={item} depth={0} jalur={jalur} setJalur={setJalur} hoverAktif={hoverAktif} />
      ))}
    </ul>
  );
}
