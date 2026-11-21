import { useLocation } from 'react-router-dom';
import PageHeader from './PageHeader.jsx';
import { cariHalaman } from '../utils/menu.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/Section.css';
import '../styles/Halaman.css';

/**
 * Kerangka halaman dalam: judul diambil dari menu (data/menu.js) berdasarkan URL,
 * sehingga judul, breadcrumb, dan <title> selalu konsisten dengan menu.
 * `pengantar` menimpa ringkasan menu bila diberikan.
 */
export default function Halaman({ pengantar, children }) {
  const { pathname } = useLocation();
  const item = cariHalaman(pathname);
  const judul = item?.label ?? 'Halaman';
  useDocumentTitle(judul);

  return (
    <>
      <PageHeader judul={judul} pengantar={pengantar ?? item?.ringkas} />
      {children}
    </>
  );
}

/** Satu bagian isi halaman dengan judul h2 (opsional disembunyikan secara visual). */
export function Bagian({ id, judul, judulTersembunyi = false, tone = 'white', children }) {
  return (
    <section className={`section section--${tone} bagian`} aria-labelledby={`${id}-judul`}>
      <div className="container">
        <h2 id={`${id}-judul`} className={judulTersembunyi ? 'visually-hidden' : 'bagian__judul'}>
          {judul}
        </h2>
        {children}
      </div>
    </section>
  );
}
