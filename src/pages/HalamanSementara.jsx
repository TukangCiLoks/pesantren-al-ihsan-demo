import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/Section.css';

/**
 * Kerangka sementara untuk halaman yang kontennya dibuat di tahap berikutnya.
 * Rute dan breadcrumb sudah final; isinya diganti halaman sungguhan per tahap.
 */
export default function HalamanSementara({ item }) {
  useDocumentTitle(item.label);
  const induk = item.jejak.at(-2);
  return (
    <>
      <PageHeader judul={item.label} pengantar={item.ringkas} />
      <section className="section section--white" aria-label={`Isi ${item.label}`}>
        <div className="container">
          <StatusMessage>Konten halaman ini sedang disiapkan.</StatusMessage>
          {induk && (
            <p style={{ marginTop: 'var(--space-5)' }}>
              <Link to={induk.to}>← Kembali ke {induk.label}</Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
