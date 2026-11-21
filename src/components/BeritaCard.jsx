import { Link } from 'react-router-dom';
import PolaGeometri from './PolaGeometri.jsx';
import { formatTanggal } from '../utils/format.js';
import { tautanInformasi } from '../lib/berita.js';
import '../styles/Card.css';
import '../styles/BeritaCard.css';

/** Kartu berita. Semua data dirender sebagai teks biasa lewat JSX. */
export default function BeritaCard({ id, jenis, judul, ringkasan, kategori, created_at, contoh }) {
  return (
    <article className="card card--interaktif berita-card">
      <div className="thumb">
        <PolaGeometri varian={id} className="thumb__img" />
        {contoh && <span className="lencana-contoh">Contoh</span>}
      </div>
      <div className="berita-card__body">
        <p className="berita-card__meta">
          {kategori && <span className="berita-card__kategori">{kategori}</span>}
          <time dateTime={created_at}>{formatTanggal(created_at)}</time>
        </p>
        <h3 className="berita-card__judul">
          {/* Tautan "melebar" menutupi seluruh kartu agar mudah diklik. */}
          <Link to={tautanInformasi({ id, jenis })} className="berita-card__link">
            {judul}
          </Link>
        </h3>
        {ringkasan && <p className="berita-card__ringkasan">{ringkasan}</p>}
        <span className="berita-card__lanjut" aria-hidden="true">
          Baca selengkapnya →
        </span>
      </div>
    </article>
  );
}
