import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import Beranda from './pages/Beranda.jsx';
import BeritaDetail from './pages/BeritaDetail.jsx';
import NotFound from './pages/NotFound.jsx';

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
        <Route path="berita/:id" element={<BeritaDetail />} />
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
