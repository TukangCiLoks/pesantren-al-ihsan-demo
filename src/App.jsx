import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import Beranda from './pages/Beranda.jsx';
import NotFound from './pages/NotFound.jsx';
import HalamanIndeks from './pages/HalamanIndeks.jsx';
import HalamanSementara from './pages/HalamanSementara.jsx';
import { SEMUA_HALAMAN } from './utils/menu.js';

const HALAMAN_MENU = SEMUA_HALAMAN.filter((h) => h.to !== '/');

// Halaman konten (dimuat lazy per halaman). Path yang tidak ada di sini memakai
// HalamanIndeks (induk menu) atau HalamanSementara (konten belum dibuat).
const Sejarah = lazy(() => import('./pages/profil/Sejarah.jsx'));
const VisiMisi = lazy(() => import('./pages/profil/VisiMisi.jsx'));
const Asatidz = lazy(() => import('./pages/profil/Asatidz.jsx'));
const Fasilitas = lazy(() => import('./pages/profil/Fasilitas.jsx'));
const Jenjang = lazy(() => import('./pages/pendidikan/Jenjang.jsx'));
const Ekstrakurikuler = lazy(() => import('./pages/pendidikan/Ekstrakurikuler.jsx'));
const Kalender = lazy(() => import('./pages/pendidikan/Kalender.jsx'));
const Struktur = lazy(() => import('./pages/profil/Struktur.jsx'));
const DaftarInformasi = lazy(() => import('./pages/informasi/DaftarInformasi.jsx'));
const Agenda = lazy(() => import('./pages/informasi/Agenda.jsx'));
const DetailInformasi = lazy(() => import('./pages/informasi/Detail.jsx'));
const GaleriHalaman = lazy(() => import('./pages/informasi/GaleriHalaman.jsx'));
const Unduhan = lazy(() => import('./pages/informasi/Unduhan.jsx'));
const PpdbAlur = lazy(() => import('./pages/ppdb/Alur.jsx'));
const PpdbSyarat = lazy(() => import('./pages/ppdb/Syarat.jsx'));
const PpdbBiaya = lazy(() => import('./pages/ppdb/Biaya.jsx'));
const PpdbFormulir = lazy(() => import('./pages/ppdb/Formulir.jsx'));
const PpdbFaq = lazy(() => import('./pages/ppdb/Faq.jsx'));
const Kontak = lazy(() => import('./pages/Kontak.jsx'));

/** Alamat lama /berita/:id tetap berfungsi: dialihkan ke /informasi/berita/:id. */
function AlihkanBeritaLama() {
  const { id } = useParams();
  return <Navigate to={`/informasi/berita/${id}`} replace />;
}

const HALAMAN_KHUSUS = {
  '/profil/sejarah': <Sejarah />,
  '/profil/visi-misi': <VisiMisi />,
  '/profil/asatidz': <Asatidz />,
  '/profil/fasilitas/asrama': <Fasilitas jenis="asrama" />,
  '/profil/fasilitas/masjid': <Fasilitas jenis="masjid" />,
  '/profil/fasilitas/perpustakaan': <Fasilitas jenis="perpustakaan" />,
  '/profil/fasilitas/laboratorium': <Fasilitas jenis="laboratorium" />,
  '/pendidikan/smp': <Jenjang jenis="smp" />,
  '/pendidikan/sma': <Jenjang jenis="sma" />,
  '/pendidikan/tahfidz': <Jenjang jenis="tahfidz" />,
  '/pendidikan/ekstrakurikuler': <Ekstrakurikuler />,
  '/pendidikan/kalender': <Kalender />,
  '/profil/struktur/yayasan': <Struktur unit="yayasan" />,
  '/profil/struktur/pimpinan': <Struktur unit="pimpinan" />,
  '/profil/struktur/unit': <Struktur unit="unit" />,
  '/informasi/berita': <DaftarInformasi key="berita" jenis="berita" />,
  '/informasi/pengumuman': <DaftarInformasi key="pengumuman" jenis="pengumuman" />,
  '/informasi/agenda': <Agenda />,
  '/informasi/galeri': <GaleriHalaman />,
  '/informasi/unduhan': <Unduhan />,
  '/ppdb/alur': <PpdbAlur />,
  '/ppdb/syarat': <PpdbSyarat />,
  '/ppdb/biaya': <PpdbBiaya />,
  '/ppdb/formulir': <PpdbFormulir />,
  '/ppdb/faq': <PpdbFaq />,
  '/kontak': <Kontak />,
};

function elemenUntuk(h) {
  if (HALAMAN_KHUSUS[h.to]) return HALAMAN_KHUSUS[h.to];
  return h.anak ? <HalamanIndeks item={h} /> : <HalamanSementara item={h} />;
}

// Area admin dimuat terpisah (React.lazy): pengunjung biasa tidak pernah
// mengunduh kode panel admin.
const AdminLayout = lazy(() => import('./pages/AdminLayout.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Beranda />} />
        <Route path="berita/:id" element={<AlihkanBeritaLama />} />
        {['berita', 'pengumuman', 'agenda'].map((j) => (
          <Route key={j} path={`informasi/${j}/:id`} element={<DetailInformasi key={j} jenis={j} />} />
        ))}
        {/* Rute dibuat otomatis dari data/menu.js (lihat elemenUntuk). */}
        {HALAMAN_MENU.map((h) => (
          <Route key={h.to} path={h.to.slice(1)} element={elemenUntuk(h)} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="admin"
        element={
          <Suspense fallback={<StatusMessage>Memuat panel admin…</StatusMessage>}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route path="login" element={<AdminLogin />} />
        {/* ProtectedRoute merender dashboard hanya bila sesi admin valid. */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
