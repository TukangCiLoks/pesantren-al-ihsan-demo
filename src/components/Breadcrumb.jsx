import { Link, useLocation } from 'react-router-dom';
import { jejakUntuk } from '../utils/menu.js';

/**
 * Breadcrumb otomatis dari pohon menu. `judulAkhir` dipakai bila halaman ini
 * tidak ada di menu (mis. detail berita) — ditambahkan sebagai item terakhir.
 */
export default function Breadcrumb({ judulAkhir }) {
  const { pathname } = useLocation();
  const jejak = jejakUntuk(pathname);
  const items = judulAkhir ? [...jejak, { label: judulAkhir, to: pathname }] : jejak;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        {items.map((it, i) => {
          const terakhir = i === items.length - 1;
          return (
            <li key={`${it.to}-${i}`}>
              {terakhir ? (
                <span aria-current="page">{it.label}</span>
              ) : (
                <Link to={it.to}>{it.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
