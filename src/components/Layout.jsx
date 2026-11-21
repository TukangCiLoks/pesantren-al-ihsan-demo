import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SkipLink from './SkipLink.jsx';
import TopBar from './TopBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import StatusMessage from './StatusMessage.jsx';

function MemuatHalaman() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-8)', minHeight: '60vh' }}>
      <StatusMessage>Memuat halaman…</StatusMessage>
    </div>
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
        {/* Halaman konten dimuat lazy; header & footer tetap tampil selama memuat. */}
        <Suspense fallback={<MemuatHalaman />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
