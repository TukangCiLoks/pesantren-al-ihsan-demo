import { Suspense, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SkipLink from '../components/SkipLink.jsx';
import Logo from '../components/Logo.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import '../styles/Admin.css';

/** Kerangka area admin: header ringkas, tanpa menu publik. */
export default function AdminLayout() {
  // Halaman admin tidak perlu diindeks mesin pencari.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <>
      <SkipLink />
      <header className="admin-header on-dark">
        <div className="container admin-header__bar">
          <Logo />
          <span className="admin-header__label">Panel Admin</span>
          <Link to="/" className="admin-header__kembali">
            ← Kembali ke situs
          </Link>
        </div>
      </header>
      <main id="konten" tabIndex={-1} className="admin-main">
        <div className="container">
          <Suspense fallback={<StatusMessage>Memuat halaman…</StatusMessage>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
