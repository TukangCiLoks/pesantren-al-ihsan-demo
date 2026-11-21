import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../Button.jsx';
import StatusMessage from '../StatusMessage.jsx';
import ConfirmDialog from '../ConfirmDialog.jsx';
import PengurusForm from './PengurusForm.jsx';
import { ambilSemuaPengurus, hapusPengurus } from '../../lib/admin.js';
import { UNIT } from '../../lib/pengurus.js';
import { bangunPohon } from '../../utils/pohon.js';

/** Pohon → baris tabel berurutan dengan kedalaman (untuk jorokan). */
const ratakan = (pohon, dalam = 0) => pohon.flatMap((s) => [{ ...s, dalam }, ...ratakan(s.anak, dalam + 1)]);

export default function TabStruktur() {
  const [unit, setUnit] = useState('yayasan');
  const [daftar, setDaftar] = useState({ status: 'memuat', data: [], error: '' });
  const [pesan, setPesan] = useState(null);
  const [form, setForm] = useState(null); // null | { awal }
  const [akanDihapus, setAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
  const judulRef = useRef(null);

  const muat = useCallback(async () => {
    setDaftar((d) => ({ ...d, status: 'memuat' }));
    try {
      setDaftar({ status: 'selesai', data: await ambilSemuaPengurus(), error: '' });
    } catch (e) {
      setDaftar({ status: 'gagal', data: [], error: e.message });
    }
  }, []);

  useEffect(() => {
    muat();
  }, [muat]);

  const baris = useMemo(() => ratakan(bangunPohon(daftar.data.filter((p) => p.unit === unit))), [daftar.data, unit]);

  function tutupForm() {
    setForm(null);
    requestAnimationFrame(() => judulRef.current?.focus());
  }

  function setelahSimpan(p, diubah) {
    setDaftar((d) => ({ ...d, data: diubah ? d.data.map((x) => (x.id === p.id ? p : x)) : [...d.data, p] }));
    setUnit(p.unit);
    setPesan({ tone: 'success', teks: `${p.jabatan} (${p.nama}) ${diubah ? 'diperbarui' : 'ditambahkan'}.` });
    tutupForm();
  }

  const jumlahBawahan = akanDihapus ? daftar.data.filter((p) => p.induk_id === akanDihapus.id).length : 0;

  async function konfirmasiHapus() {
    const p = akanDihapus;
    setMenghapus(true);
    try {
      await hapusPengurus(p.id);
      // Cerminkan perilaku server: bawahan langsung menjadi puncak (induk_id = null).
      setDaftar((d) => ({
        ...d,
        data: d.data.filter((x) => x.id !== p.id).map((x) => (x.induk_id === p.id ? { ...x, induk_id: null } : x)),
      }));
      setPesan({ tone: 'success', teks: `${p.jabatan} (${p.nama}) telah dihapus.` });
      requestAnimationFrame(() => judulRef.current?.focus());
    } catch (e) {
      setPesan({ tone: 'error', teks: e.message });
    } finally {
      setAkanDihapus(null);
      setMenghapus(false);
    }
  }

  return (
    <section aria-labelledby="judul-struktur">
      <div className="admin-panel__kepala">
        <h2 id="judul-struktur" ref={judulRef} tabIndex={-1}>
          Struktur organisasi
        </h2>
        <div className="admin-panel__alat">
          <label htmlFor="filter-unit" className="admin-filter__label">
            Unit
          </label>
          <select id="filter-unit" className="field__control admin-filter" value={unit} onChange={(e) => setUnit(e.target.value)}>
            {Object.entries(UNIT).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
          {!form && (
            <Button variant="dark" className="btn--kecil" onClick={() => setForm({ awal: null })}>
              + Tambah pengurus
            </Button>
          )}
        </div>
      </div>

      <div aria-live="polite">{pesan && <StatusMessage tone={pesan.tone}>{pesan.teks}</StatusMessage>}</div>

      {form && (
        <PengurusForm
          key={form.awal?.id ?? 'baru'}
          awal={form.awal}
          unitAwal={unit}
          semua={daftar.data}
          onSimpan={setelahSimpan}
          onBatal={tutupForm}
        />
      )}

      {daftar.status === 'memuat' && daftar.data.length === 0 && <StatusMessage>Memuat struktur…</StatusMessage>}
      {daftar.status === 'gagal' && <StatusMessage tone="error">{daftar.error}</StatusMessage>}
      {daftar.status === 'selesai' && baris.length === 0 && <StatusMessage>Belum ada pengurus di unit ini.</StatusMessage>}

      {baris.length > 0 && (
        <div className="tabel-wrap" role="region" aria-labelledby="judul-struktur" tabIndex={0}>
          <table className="tabel">
            <caption className="visually-hidden">Pengurus {UNIT[unit]}, diurutkan sesuai bagan</caption>
            <thead>
              <tr>
                <th scope="col">Jabatan & nama</th>
                <th scope="col">Urutan</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="visually-hidden">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {baris.map((p) => (
                <tr key={p.id}>
                  <td>
                    {/* Jorokan visual + teks tingkat untuk pembaca layar */}
                    <div className="struktur-baris" style={{ '--dalam': p.dalam }}>
                      {p.dalam > 0 && <span aria-hidden="true">└ </span>}
                      <span>
                        <strong>{p.jabatan}</strong>
                        <span className="tabel__sub">
                          {p.nama}
                          <span className="visually-hidden">, tingkat {p.dalam + 1}</span>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td>{p.urutan}</td>
                  <td>
                    <span className={`lencana lencana--${p.aktif ? 'terbit' : 'draf'}`}>{p.aktif ? 'Aktif' : 'Nonaktif'}</span>
                  </td>
                  <td>
                    <div className="tabel__aksi">
                      <Button variant="ghost-dark" className="btn--kecil" onClick={() => setForm({ awal: p })}>
                        Ubah<span className="visually-hidden"> {p.jabatan}</span>
                      </Button>
                      <Button variant="ghost-dark" className="btn--kecil" onClick={() => setAkanDihapus(p)}>
                        Hapus<span className="visually-hidden"> {p.jabatan}</span>
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
        judul="Hapus pengurus?"
        pesan={
          akanDihapus
            ? `${akanDihapus.jabatan} (${akanDihapus.nama}) akan dihapus permanen.${
                jumlahBawahan ? ` ${jumlahBawahan} bawahan langsungnya akan menjadi puncak bagan.` : ''
              }`
            : ''
        }
        labelKonfirmasi="Ya, hapus"
        sedangProses={menghapus}
        onKonfirmasi={konfirmasiHapus}
        onBatal={() => setAkanDihapus(null)}
      />
    </section>
  );
}
