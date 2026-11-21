import { useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import TabPendaftar from '../components/admin/TabPendaftar.jsx';
import TabBerita from '../components/admin/TabBerita.jsx';
import { keluar } from '../lib/admin.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const TABS = [
  { id: 'pendaftar', label: 'Pendaftar' },
  { id: 'berita', label: 'Berita' },
];

export default function AdminDashboard() {
  useDocumentTitle('Dashboard Admin');
  const { session } = useOutletContext();
  // Tab aktif disimpan di URL (?tab=berita) agar bisa di-refresh/dibagikan.
  const [params, setParams] = useSearchParams();
  const aktif = TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'pendaftar';
  const tabRefs = useRef({});
  const [gagalKeluar, setGagalKeluar] = useState('');

  function pilih(id, fokus = false) {
    setParams(id === 'pendaftar' ? {} : { tab: id }, { replace: true });
    if (fokus) tabRefs.current[id]?.focus();
  }

  // Pola tab WAI-ARIA: panah kiri/kanan, Home, End berpindah tab.
  function tombolTab(e) {
    const i = TABS.findIndex((t) => t.id === aktif);
    const ke = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key];
    if (ke === undefined) return;
    e.preventDefault();
    pilih(TABS[(ke + TABS.length) % TABS.length].id, true);
  }

  async function prosesKeluar() {
    setGagalKeluar('');
    const { error } = await keluar();
    // Bila sukses, ProtectedRoute menerima SIGNED_OUT dan mengalihkan ke /admin/login.
    if (error) setGagalKeluar('Gagal keluar. Periksa koneksi internet Anda lalu coba lagi.');
  }

  return (
    <div className="dashboard">
      <div className="dashboard__kepala">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard__akun">
            Masuk sebagai <strong>{session.user.email}</strong>
          </p>
        </div>
        <Button variant="ghost-dark" onClick={prosesKeluar}>
          Keluar
        </Button>
      </div>
      {gagalKeluar && <StatusMessage tone="error">{gagalKeluar}</StatusMessage>}

      <div className="tabs" role="tablist" aria-label="Kelola data" onKeyDown={tombolTab}>
        {TABS.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={aktif === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={aktif === t.id ? 0 : -1}
            className="tabs__tab"
            onClick={() => pilih(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tabs__panel" role="tabpanel" id={`panel-${aktif}`} aria-labelledby={`tab-${aktif}`}>
        {aktif === 'pendaftar' ? <TabPendaftar /> : <TabBerita />}
      </div>
    </div>
  );
}
