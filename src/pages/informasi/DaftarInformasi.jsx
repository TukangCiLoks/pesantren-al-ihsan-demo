import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import BeritaCard from '../../components/BeritaCard.jsx';
import Button from '../../components/Button.jsx';
import Paginasi from '../../components/Paginasi.jsx';
import StatusMessage from '../../components/StatusMessage.jsx';
import { ItemPengumuman } from '../../components/ItemInformasi.jsx';
import { ambilDaftar, ambilKategori, bersihkanCari, JENIS, PER_HALAMAN } from '../../lib/berita.js';
import '../../styles/FormField.css';
import '../../styles/BeritaTerbaru.css';
import '../../styles/Informasi.css';

/**
 * Daftar berita atau pengumuman dengan pencarian, filter kategori, dan paginasi.
 * Semua pilihan disimpan di URL (?q=…&kategori=…&hal=…), sehingga hasil bisa dibagikan,
 * dimuat ulang, dan tombol Kembali peramban bekerja seperti yang diharapkan.
 */
export default function DaftarInformasi({ jenis }) {
  const [params, setParams] = useSearchParams();
  const cari = bersihkanCari(params.get('q') ?? '');
  const kategori = params.get('kategori') ?? '';
  const halaman = Math.max(1, Number.parseInt(params.get('hal') ?? '1', 10) || 1);

  const [isian, setIsian] = useState(cari);
  const [kategoriList, setKategoriList] = useState([]);
  const [hasil, setHasil] = useState({ status: 'memuat', data: [], total: 0, error: '' });
  const permintaan = useRef(0);
  const judulHasilRef = useRef(null);

  // Isian ikut berubah bila URL berubah (mis. tombol Kembali).
  useEffect(() => setIsian(cari), [cari]);

  useEffect(() => {
    ambilKategori(jenis)
      .then(setKategoriList)
      .catch(() => setKategoriList([]));
  }, [jenis]);

  useEffect(() => {
    const nomor = ++permintaan.current; // abaikan respons lama bila filter diganti cepat
    setHasil((h) => ({ ...h, status: 'memuat' }));
    ambilDaftar({ jenis, kategori, cari, halaman })
      .then((r) => nomor === permintaan.current && setHasil({ status: 'selesai', ...r, error: '' }))
      .catch((e) => nomor === permintaan.current && setHasil({ status: 'gagal', data: [], total: 0, error: e.message }));
  }, [jenis, kategori, cari, halaman]);

  /** Perbarui parameter URL; nilai kosong dihapus agar URL tetap bersih. */
  function atur(perubahan, fokusHasil = false) {
    const baru = Object.fromEntries(
      Object.entries({ q: cari, kategori, hal: '', ...perubahan }).filter(([, v]) => v !== '' && v != null),
    );
    setParams(baru);
    if (fokusHasil) requestAnimationFrame(() => judulHasilRef.current?.focus({ preventScroll: false }));
  }

  const totalHalaman = Math.ceil(hasil.total / PER_HALAMAN);
  const dari = hasil.total ? (halaman - 1) * PER_HALAMAN + 1 : 0;
  const sampai = Math.min(halaman * PER_HALAMAN, hasil.total);
  const label = JENIS[jenis].toLowerCase();
  const contoh = hasil.data.some((b) => b.contoh);

  return (
    <Halaman>
      <Bagian id="daftar" judul={`Semua ${label}`} judulTersembunyi>
        <form
          className="cari"
          role="search"
          aria-label={`Cari ${label}`}
          onSubmit={(e) => {
            e.preventDefault();
            atur({ q: bersihkanCari(isian) }, true);
          }}
        >
          <label htmlFor="cari-informasi" className="visually-hidden">
            Kata kunci
          </label>
          <input
            id="cari-informasi"
            type="search"
            className="field__control cari__isian"
            placeholder={`Cari judul ${label}…`}
            value={isian}
            maxLength={60}
            onChange={(e) => setIsian(e.target.value)}
          />
          <Button type="submit" variant="dark">
            Cari
          </Button>
        </form>

        {kategoriList.length > 0 && (
          <ul className="filter-kategori" aria-label="Filter kategori">
            {['', ...kategoriList].map((k) => (
              <li key={k || 'semua'}>
                <button type="button" aria-pressed={kategori === k} onClick={() => atur({ kategori: k })}>
                  {k || 'Semua'}
                </button>
              </li>
            ))}
          </ul>
        )}

        <h2 ref={judulHasilRef} tabIndex={-1} className="visually-hidden">
          Hasil
        </h2>
        <p className="hasil-info" aria-live="polite">
          {hasil.status === 'memuat' && 'Memuat…'}
          {hasil.status === 'selesai' &&
            (hasil.total
              ? `Menampilkan ${dari}–${sampai} dari ${hasil.total} ${label}${cari ? ` untuk “${cari}”` : ''}${kategori ? ` dalam kategori ${kategori}` : ''}.`
              : `Tidak ada ${label}${cari ? ` yang cocok dengan “${cari}”` : ''}${kategori ? ` dalam kategori ${kategori}` : ''}.`)}
          {contoh && ' (Data contoh — Supabase belum terhubung.)'}
        </p>

        {hasil.status === 'gagal' && <StatusMessage tone="error">{hasil.error}</StatusMessage>}

        {hasil.data.length > 0 &&
          (jenis === 'berita' ? (
            <ul className="berita__grid">
              {hasil.data.map((b, i) => (
                <Reveal as="li" key={b.id} delay={(i % 3) * 100}>
                  <BeritaCard {...b} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <ul className="daftar-info">
              {hasil.data.map((b) => (
                <li key={b.id}>
                  <ItemPengumuman item={b} />
                </li>
              ))}
            </ul>
          ))}

        <Paginasi halaman={halaman} totalHalaman={totalHalaman} onPilih={(n) => atur({ hal: n > 1 ? String(n) : '' }, true)} />
      </Bagian>
    </Halaman>
  );
}
