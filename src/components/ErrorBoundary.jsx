import { Component } from 'react';
import '../styles/ErrorBoundary.css';

/** Chunk JS gagal dimuat — biasanya karena situs baru di-deploy dan file lama sudah tidak ada. */
const gagalMemuatChunk = (error) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    String(error?.message ?? error),
  );

/**
 * Penangkap error render. Bila satu halaman/komponen gagal, hanya area ini yang
 * diganti pesan ramah; header, menu, dan footer tetap tampil (sebelumnya seluruh
 * layar menjadi kosong). Harus komponen kelas: React belum menyediakan hook untuk ini.
 *
 * Dipasang di sekitar <Outlet/> dengan key = pathname, sehingga pindah halaman
 * otomatis "mereset" error.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Tidak ada layanan pelaporan error di proyek demo ini; cukup console.
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const chunk = gagalMemuatChunk(error);
    return (
      <div className="container galat" role="alert">
        <h1 className="galat__judul">{chunk ? 'Versi baru situs tersedia' : 'Terjadi kesalahan'}</h1>
        <p>
          {chunk
            ? 'Bagian halaman ini gagal dimuat, kemungkinan karena situs baru saja diperbarui. Muat ulang halaman untuk melanjutkan.'
            : 'Bagian halaman ini tidak dapat ditampilkan. Coba muat ulang halaman, atau kembali ke beranda.'}
        </p>
        <div className="galat__aksi">
          <button type="button" className="btn btn--dark" onClick={() => window.location.reload()}>
            Muat ulang
          </button>
          {/* <a> biasa (bukan <Link>) agar aplikasi dimuat ulang bersih dari awal. */}
          <a className="btn btn--ghost-dark" href="/">
            Ke beranda
          </a>
        </div>
      </div>
    );
  }
}
