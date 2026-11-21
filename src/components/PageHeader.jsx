import Breadcrumb from './Breadcrumb.jsx';
import PolaLatar from './PolaLatar.jsx';
import '../styles/PageHeader.css';

/** Pita judul di atas setiap halaman dalam: breadcrumb, judul (h1), dan pengantar. Selalu navy. */
export default function PageHeader({ judul, pengantar, judulBreadcrumb }) {
  return (
    <div className="page-header on-dark">
      <PolaLatar className="page-header__pola" ukuran={120} opasitas={0.06} />
      <div className="container">
        <Breadcrumb judulAkhir={judulBreadcrumb} />
        <h1>{judul}</h1>
        {pengantar && <p className="page-header__pengantar">{pengantar}</p>}
      </div>
    </div>
  );
}
