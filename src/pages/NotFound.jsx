import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/BeritaDetail.css';

export default function NotFound() {
  useDocumentTitle('Halaman tidak ditemukan');
  return (
    <section className="berita-detail">
      <div className="container berita-detail__inner">
        <p className="eyebrow">Galat 404</p>
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat yang Anda buka tidak tersedia.</p>
        <p>
          <Link to="/">Kembali ke beranda</Link>
        </p>
      </div>
    </section>
  );
}
