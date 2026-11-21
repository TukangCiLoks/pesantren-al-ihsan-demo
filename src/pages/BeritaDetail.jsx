import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import PolaGeometri from '../components/PolaGeometri.jsx';
import { ambilBerita } from '../lib/berita.js';
import { formatTanggal, pecahParagraf } from '../utils/format.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/BeritaDetail.css';

export default function BeritaDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'memuat', berita: null, error: null });

  useEffect(() => {
    let aktif = true;
    window.scrollTo(0, 0);
    setState({ status: 'memuat', berita: null, error: null });
    // id dari URL hanya dipakai sebagai nilai filter (diparameterisasi oleh supabase-js).
    ambilBerita(id)
      .then((berita) => aktif && setState({ status: 'selesai', berita, error: null }))
      .catch((error) => aktif && setState({ status: 'gagal', berita: null, error }));
    return () => {
      aktif = false;
    };
  }, [id]);

  const { status, berita, error } = state;
  useDocumentTitle(berita?.judul ?? (status === 'selesai' ? 'Berita tidak ditemukan' : 'Berita'));

  return (
    <article className="berita-detail">
      <div className="container berita-detail__inner">
        <p className="berita-detail__kembali">
          <Link to="/#berita">← Kembali ke berita</Link>
        </p>

        {status === 'memuat' && <StatusMessage>Memuat berita…</StatusMessage>}

        {status === 'gagal' && (
          <StatusMessage tone="error">Berita gagal dimuat. Periksa koneksi internet Anda lalu coba lagi.</StatusMessage>
        )}

        {status === 'selesai' && !berita && (
          <>
            <h1>Berita tidak ditemukan</h1>
            <p>Berita ini mungkin sudah dihapus atau belum dipublikasikan.</p>
          </>
        )}

        {berita && (
          <>
            <header>
              <p className="eyebrow">
                {berita.contoh && <span>Berita contoh · </span>}
                {berita.kategori && <span>{berita.kategori} · </span>}
                <time dateTime={berita.created_at}>{formatTanggal(berita.created_at)}</time>
              </p>
              <h1>{berita.judul}</h1>
              {berita.ringkasan && <p className="berita-detail__lead">{berita.ringkasan}</p>}
            </header>
            <div className="berita-detail__gambar">
              <PolaGeometri varian={berita.id} />
            </div>
            {/* Isi dirender sebagai teks per paragraf — tidak pernah sebagai HTML. */}
            <div className="berita-detail__isi">
              {pecahParagraf(berita.isi).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
