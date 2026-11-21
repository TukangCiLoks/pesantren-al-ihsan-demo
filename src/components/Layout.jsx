import { Outlet } from 'react-router-dom';
import SkipLink from './SkipLink.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

/** Kerangka halaman publik: skip link, header, konten, footer. */
export default function Layout() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="konten" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
