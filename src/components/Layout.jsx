import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SkipLink from './SkipLink.jsx';
import TopBar from './TopBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageHeader from './PageHeader.jsx';
import StatusMessage from './StatusMessage.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { cariHalaman } from '../utils/menu.js';

/**
 * Tampilan selama chunk halaman dimuat. Pita judul langsung tampil (judul diambil dari
 * menu) dan area isi diberi tinggi minimal satu layar, sehingga footer tidak sempat
 * muncul lalu terdorong ke bawah (sebelumnya menyebabkan CLS 0,42 di Lighthouse).
 */
function MemuatHalaman() {
  const { pathname } = useLocation();
  const item = pathname === '/' ? null : cariHalaman(pathname);
  return (
    <>
      {item && <PageHeader judul={item.label} pengantar={item.ringkas} />}
      <div className="container memuat-halaman">
        <StatusMessage>Memuat halaman…</StatusMessage>
      </div>
    </>
  );
}

/** Kerangka halaman publik: skip link, bar atas, header, konten, footer. */
export default function Layout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const pertama = useRef(true);

  // Pindah halaman (bukan lompatan #anchor): gulir ke atas dan pindahkan fokus ke konten,
  // supaya pengguna pembaca layar/keyboard mulai dari awal halaman baru, bukan dari menu.
  useEffect(() => {
    if (pertama.current) {
      pertama.current = false;
      return;
    }
    if (hash) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      <TopBar />
      <Header />
      <main id="konten" ref={mainRef} tabIndex={-1}>
        {/* Error di satu halaman tidak merobohkan header/footer; pindah halaman mereset error. */}
        <ErrorBoundary key={pathname}>
          {/* Halaman konten dimuat lazy; header & footer tetap tampil selama memuat. */}
          <Suspense fallback={<MemuatHalaman />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
