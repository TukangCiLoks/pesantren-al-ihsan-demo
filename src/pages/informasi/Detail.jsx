import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import PolaGeometri from '../../components/PolaGeometri.jsx';
import StatusMessage from '../../components/StatusMessage.jsx';
import TombolBagikan from '../../components/TombolBagikan.jsx';
import { IkonLokasi } from '../../components/ItemInformasi.jsx';
import { ambilBerita, JENIS } from '../../lib/berita.js';
import { formatTanggal, formatTanggalJam, pecahParagraf } from '../../utils/format.js';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import '../../styles/Section.css';
import '../../styles/Halaman.css';
import '../../styles/Informasi.css';

/** Detail berita / pengumuman / agenda. Isi selalu dirender sebagai teks per paragraf — tidak pernah HTML. */
export default function Detail({ jenis }) {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'memuat', item: null, error: '' });

  useEffect(() => {
    let aktif = true;
    setState({ status: 'memuat', item: null, error: '' });
    ambilBerita(id)
      .then((item) => aktif && setState({ status: 'selesai', item, error: '' }))
      .catch((e) => aktif && setState({ status: 'gagal', item: null, error: e.message }));
    return () => {
      aktif = false;
    };
  }, [id]);

  const { status, item, error } = state;
  useDocumentTitle(item?.judul ?? (status === 'selesai' ? `${JENIS[jenis]} tidak ditemukan` : JENIS[jenis]));

  // Item ada tetapi jenisnya lain (mis. /informasi/berita/12 padahal agenda) → alihkan ke alamat yang benar.
  if (item && item.jenis && item.jenis !== jenis) {
    return <Navigate to={`/informasi/${item.jenis}/${item.id}`} replace />;
  }

  const kembali = { to: `/informasi/${jenis}`, label: `Semua ${JENIS[jenis].toLowerCase()}` };

  return (
    <>
      <PageHeader
        judul={item?.judul ?? (status === 'selesai' ? `${JENIS[jenis]} tidak ditemukan` : JENIS[jenis])}
        pengantar={item?.ringkasan}
        judulBreadcrumb={item?.judul ?? 'Detail'}
      />
      <article className="section section--white bagian">
        <div className="container prosa">
          {status === 'memuat' && <StatusMessage>Memuat…</StatusMessage>}
          {status === 'gagal' && <StatusMessage tone="error">{error}</StatusMessage>}
          {status === 'selesai' && !item && <p>Konten ini mungkin sudah dihapus atau belum dipublikasikan.</p>}

          {item && (
            <>
              <p className="detail__meta">
                <span>{JENIS[item.jenis ?? 'berita']}</span>
                {item.kategori && <span className="label-garis">{item.kategori}</span>}
                <span>
                  Diterbitkan <time dateTime={item.created_at}>{formatTanggal(item.created_at)}</time>
                </span>
                {item.contoh && <span className="label-garis">Contoh</span>}
              </p>

              {item.jenis === 'agenda' && item.tanggal_acara && (
                <div className="panel detail__acara">
                  <p>
                    <time dateTime={item.tanggal_acara}>{formatTanggalJam(item.tanggal_acara)}</time>
                  </p>
                  {item.lokasi && (
                    <p>
                      <IkonLokasi />
                      <span className="visually-hidden">Lokasi: </span>
                      {item.lokasi}
                    </p>
                  )}
                </div>
              )}

              {item.jenis !== 'pengumuman' && (
                <div className="detail__gambar">
                  <PolaGeometri varian={item.id} />
                </div>
              )}

              <div className="detail__isi">
                {pecahParagraf(item.isi).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="detail__kaki">
                <TombolBagikan judul={item.judul} />
              </div>
            </>
          )}

          <p className="detail__kembali">
            <Link to={kembali.to}>← {kembali.label}</Link>
          </p>
        </div>
      </article>
    </>
  );
}
