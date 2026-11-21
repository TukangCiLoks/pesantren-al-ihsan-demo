import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button.jsx';
import StatusMessage from '../StatusMessage.jsx';
import ConfirmDialog from '../ConfirmDialog.jsx';
import BeritaForm from './BeritaForm.jsx';
import { ambilSemuaBerita, aturPublikasi, hapusBerita } from '../../lib/admin.js';
import { formatTanggal } from '../../utils/format.js';

export default function TabBerita() {
  const [daftar, setDaftar] = useState({ status: 'memuat', data: [], error: '' });
  const [pesan, setPesan] = useState(null);
  // null = formulir tertutup; { awal: null } = tambah; { awal: berita } = ubah
  const [form, setForm] = useState(null);
  const [prosesId, setProsesId] = useState(null);
  const [akanDihapus, setAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
  const judulRef = useRef(null);

  const muat = useCallback(async () => {
    setDaftar((d) => ({ ...d, status: 'memuat' }));
    try {
      setDaftar({ status: 'selesai', data: await ambilSemuaBerita(), error: '' });
    } catch (e) {
      setDaftar({ status: 'gagal', data: [], error: e.message });
    }
  }, []);

  useEffect(() => {
    muat();
  }, [muat]);

  function tutupForm() {
    setForm(null);
    requestAnimationFrame(() => judulRef.current?.focus());
  }

  function setelahSimpan(berita, diubah) {
    setDaftar((d) => ({
      ...d,
      data: diubah ? d.data.map((x) => (x.id === berita.id ? berita : x)) : [berita, ...d.data],
    }));
    setPesan({ tone: 'success', teks: `Berita "${berita.judul}" ${diubah ? 'diperbarui' : 'ditambahkan'}.` });
    tutupForm();
  }

  async function togglePublikasi(b) {
    setProsesId(b.id);
    setPesan(null);
    try {
      const baru = await aturPublikasi(b.id, !b.dipublikasi);
      setDaftar((d) => ({ ...d, data: d.data.map((x) => (x.id === b.id ? baru : x)) }));
      setPesan({
        tone: 'success',
        teks: `"${b.judul}" ${baru.dipublikasi ? 'diterbitkan' : 'ditarik menjadi draf'}.`,
      });
    } catch (e) {
      setPesan({ tone: 'error', teks: e.message });
    } finally {
      setProsesId(null);
    }
  }

  async function konfirmasiHapus() {
    const b = akanDihapus;
    setMenghapus(true);
    try {
      await hapusBerita(b.id);
      setDaftar((d) => ({ ...d, data: d.data.filter((x) => x.id !== b.id) }));
      setPesan({ tone: 'success', teks: `Berita "${b.judul}" telah dihapus.` });
      setAkanDihapus(null);
      requestAnimationFrame(() => judulRef.current?.focus());
    } catch (e) {
      setPesan({ tone: 'error', teks: e.message });
      setAkanDihapus(null);
    } finally {
      setMenghapus(false);
    }
  }

  return (
    <section aria-labelledby="judul-berita">
      <div className="admin-panel__kepala">
        <h2 id="judul-berita" ref={judulRef} tabIndex={-1}>
          Berita
        </h2>
        {!form && (
          <div className="admin-panel__alat">
            <Button variant="dark" className="btn--kecil" onClick={() => setForm({ awal: null })}>
              + Tambah berita
            </Button>
          </div>
        )}
      </div>

      <div aria-live="polite">{pesan && <StatusMessage tone={pesan.tone}>{pesan.teks}</StatusMessage>}</div>

      {form && <BeritaForm key={form.awal?.id ?? 'baru'} awal={form.awal} onSimpan={setelahSimpan} onBatal={tutupForm} />}

      {daftar.status === 'memuat' && daftar.data.length === 0 && <StatusMessage>Memuat berita…</StatusMessage>}
      {daftar.status === 'gagal' && <StatusMessage tone="error">{daftar.error}</StatusMessage>}
      {daftar.status === 'selesai' && daftar.data.length === 0 && <StatusMessage>Belum ada berita.</StatusMessage>}

      {daftar.data.length > 0 && (
        <div className="tabel-wrap" role="region" aria-labelledby="judul-berita" tabIndex={0}>
          <table className="tabel">
            <thead>
              <tr>
                <th scope="col">Judul</th>
                <th scope="col">Kategori</th>
                <th scope="col">Status</th>
                <th scope="col">Dibuat</th>
                <th scope="col">
                  <span className="visually-hidden">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {daftar.data.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong>{b.judul}</strong>
                    {b.dipublikasi && (
                      <span className="tabel__sub">
                        <Link to={`/berita/${b.id}`} target="_blank" rel="noopener">
                          Lihat di situs<span className="visually-hidden"> (tab baru)</span>
                        </Link>
                      </span>
                    )}
                  </td>
                  <td>{b.kategori || '—'}</td>
                  <td>
                    <span className={`lencana lencana--${b.dipublikasi ? 'terbit' : 'draf'}`}>
                      {b.dipublikasi ? 'Terbit' : 'Draf'}
                    </span>
                  </td>
                  <td className="tabel__nowrap">{formatTanggal(b.created_at)}</td>
                  <td>
                    <div className="tabel__aksi">
                      <Button variant="ghost-dark" className="btn--kecil" onClick={() => setForm({ awal: b })}>
                        Ubah<span className="visually-hidden"> {b.judul}</span>
                      </Button>
                      <Button
                        variant="ghost-dark"
                        className="btn--kecil"
                        disabled={prosesId === b.id}
                        onClick={() => togglePublikasi(b)}
                      >
                        {b.dipublikasi ? 'Tarik' : 'Terbitkan'}
                        <span className="visually-hidden"> {b.judul}</span>
                      </Button>
                      <Button variant="ghost-dark" className="btn--kecil" onClick={() => setAkanDihapus(b)}>
                        Hapus<span className="visually-hidden"> {b.judul}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(akanDihapus)}
        judul="Hapus berita?"
        pesan={akanDihapus ? `Berita "${akanDihapus.judul}" akan dihapus permanen dan tidak bisa dikembalikan.` : ''}
        labelKonfirmasi="Ya, hapus"
        sedangProses={menghapus}
        onKonfirmasi={konfirmasiHapus}
        onBatal={() => setAkanDihapus(null)}
      />
    </section>
  );
}
