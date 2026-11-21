import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { isSupabaseConfigured } from '../lib/supabase.js';
import { keluar } from '../lib/admin.js';
import StatusMessage from './StatusMessage.jsx';
import Button from './Button.jsx';

/**
 * Penjaga rute admin. Konten anak (dan chunk lazy-nya) baru dirender setelah
 * sesi terbukti milik admin — tanpa sesi, tidak ada data yang diminta.
 * Ini hanya untuk UX; perlindungan data sesungguhnya adalah RLS di server.
 */
export default function ProtectedRoute() {
  const { session, isAdmin, loading, error } = useAuth();
  const location = useLocation();

  if (!isSupabaseConfigured) {
    return <StatusMessage tone="error">Supabase belum dikonfigurasi (lihat README).</StatusMessage>;
  }
  if (loading) return <StatusMessage>Memeriksa sesi…</StatusMessage>;

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ dari: location.pathname + location.search }} />;
  }

  if (error) {
    return (
      <StatusMessage tone="error">
        Gagal memeriksa hak akses. Periksa koneksi internet Anda lalu muat ulang halaman.
      </StatusMessage>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-kartu">
        <h1>Akses ditolak</h1>
        <p>
          Akun <strong>{session.user.email}</strong> tidak terdaftar sebagai admin.
        </p>
        <Button variant="dark" onClick={() => keluar()}>
          Keluar
        </Button>
      </div>
    );
  }

  return <Outlet context={{ session }} />;
}
