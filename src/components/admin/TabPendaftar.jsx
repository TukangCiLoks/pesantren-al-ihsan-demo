import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../Button.jsx';
import StatusMessage from '../StatusMessage.jsx';
import ConfirmDialog from '../ConfirmDialog.jsx';
import { STATUS_PENDAFTAR, ambilPendaftar, hapusPendaftar, ubahStatusPendaftar } from '../../lib/admin.js';
import { formatTanggal, formatTanggalSaja } from '../../utils/format.js';

const LABEL_STATUS = { baru: 'Baru', diverifikasi: 'Diverifikasi', diterima: 'Diterima', ditolak: 'Ditolak' };

export default function TabPendaftar() {
  const [filter, setFilter] = useState('');
  const [daftar, setDaftar] = useState({ status: 'memuat', data: [], error: '' });
  const [pesan, setPesan] = useState(null); // { tone, teks } untuk pengumuman hasil aksi
  const [menyimpanId, setMenyimpanId] = useState(null);
  const [akanDihapus, setAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
  const judulRef = useRef(null);
  const permintaan = useRef(0); // abaikan respons lama bila filter diganti cepat

  const muat = useCallback(async () => {
    const nomor = ++permintaan.current;
    setDaftar((d) => ({ ...d, status: 'memuat' }));
    try {
      const data = await ambilPendaftar(filter || undefined);
      if (nomor === permintaan.current) setDaftar({ status: 'selesai', data, error: '' });
    } catch (e) {
      if (nomor === permintaan.current) setDaftar({ status: 'gagal', data: [], error: e.message });
    }
  }, [filter]);

  useEffect(() => {
    muat();
  }, [muat]);

  async function ubahStatus(p, status) {
    setMenyimpanId(p.id);
    setPesan(null);
    try {
      const baru = await ubahStatusPendaftar(p.id, status);
      setDaftar((d) => ({ ...d, data: d.data.map((x) => (x.id === p.id ? baru : x)) }));
      setPesan({ tone: 'success', teks: `Status ${p.no_pendaftaran} diubah menjadi "${LABEL_STATUS[status]}".` });
    } catch (e) {
      setPesan({ tone: 'error', teks: e.message });
    } finally {
      setMenyimpanId(null);
    }
  }

  async function konfirmasiHapus() {
    const p = akanDihapus;
    setMenghapus(true);
    try {
      await hapusPendaftar(p.id);
      setDaftar((d) => ({ ...d, data: d.data.filter((x) => x.id !== p.id) }));
      setPesan({ tone: 'success', teks: `Pendaftar ${p.no_pendaftaran} (${p.nama}) telah dihapus.` });
      setAkanDihapus(null);
      // Tombol pemicu sudah hilang bersama barisnya; pindahkan fokus ke judul tab.
      requestAnimationFrame(() => judulRef.current?.focus());
    } catch (e) {
      setPesan({ tone: 'error', teks: e.message });
      setAkanDihapus(null);
    } finally {
      setMenghapus(false);
    }
  }

  return (
    <section aria-labelledby="judul-pendaftar">
      <div className="admin-panel__kepala">
        <h2 id="judul-pendaftar" ref={judulRef} tabIndex={-1}>
          Pendaftar
        </h2>
        <div className="admin-panel__alat">
          <label htmlFor="filter-status" className="admin-filter__label">
            Filter status
          </label>
          <select
            id="filter-status"
            className="field__control admin-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Semua status</option>
            {STATUS_PENDAFTAR.map((s) => (
              <option key={s} value={s}>
                {LABEL_STATUS[s]}
              </option>
            ))}
          </select>
          <Button variant="ghost-dark" className="btn--kecil" onClick={muat}>
            Muat ulang
          </Button>
        </div>
      </div>

      <div aria-live="polite">{pesan && <StatusMessage tone={pesan.tone}>{pesan.teks}</StatusMessage>}</div>

      {daftar.status === 'memuat' && daftar.data.length === 0 && <StatusMessage>Memuat pendaftar…</StatusMessage>}
      {daftar.status === 'gagal' && <StatusMessage tone="error">{daftar.error}</StatusMessage>}
      {daftar.status === 'selesai' && daftar.data.length === 0 && (
        <StatusMessage>{filter ? `Tidak ada pendaftar berstatus "${LABEL_STATUS[filter]}".` : 'Belum ada pendaftar.'}</StatusMessage>
      )}

      {daftar.data.length > 0 && (
        <>
          <p className="admin-jumlah">{daftar.data.length} pendaftar</p>
          {/* Tabel lebar boleh digeser di dalam wadahnya, bukan seluruh halaman. */}
          <div className="tabel-wrap" role="region" aria-labelledby="judul-pendaftar" tabIndex={0}>
            <table className="tabel">
              <thead>
                <tr>
                  <th scope="col">No. pendaftaran</th>
                  <th scope="col">Calon santri</th>
                  <th scope="col">Jenjang</th>
                  <th scope="col">Wali</th>
                  <th scope="col">Didaftarkan</th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <span className="visually-hidden">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftar.data.map((p) => (
                  <tr key={p.id}>
                    <td className="tabel__nowrap">{p.no_pendaftaran}</td>
                    <td>
                      <strong>{p.nama}</strong>
                      <span className="tabel__sub">
                        {p.tempat_lahir}, {formatTanggalSaja(p.tgl_lahir)}
                      </span>
                      <span className="tabel__sub">Asal: {p.asal_sekolah}</span>
                    </td>
                    <td>{p.jenjang}</td>
                    <td>
                      {p.nama_wali}
                      <span className="tabel__sub">
                        <a href={`tel:${p.hp_wali}`}>{p.hp_wali}</a>
                      </span>
                      <span className="tabel__sub">{p.alamat}</span>
                    </td>
                    <td className="tabel__nowrap">{formatTanggal(p.created_at)}</td>
                    <td>
                      <label className="visually-hidden" htmlFor={`status-${p.id}`}>
                        Status {p.no_pendaftaran}
                      </label>
                      <select
                        id={`status-${p.id}`}
                        className={`field__control tabel__status tabel__status--${p.status}`}
                        value={p.status}
                        disabled={menyimpanId === p.id}
                        onChange={(e) => ubahStatus(p, e.target.value)}
                      >
                        {STATUS_PENDAFTAR.map((s) => (
                          <option key={s} value={s}>
                            {LABEL_STATUS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <Button variant="ghost-dark" className="btn--kecil" onClick={() => setAkanDihapus(p)}>
                        Hapus<span className="visually-hidden"> {p.nama}</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(akanDihapus)}
        judul="Hapus pendaftar?"
        pesan={
          akanDihapus
            ? `Data ${akanDihapus.nama} (${akanDihapus.no_pendaftaran}) akan dihapus permanen dan tidak bisa dikembalikan.`
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
