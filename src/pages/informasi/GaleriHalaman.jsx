import { useState } from 'react';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import { GaleriGrid } from '../../components/Galeri.jsx';
import { GALERI } from '../../data/konten.js';
import '../../styles/Informasi.css';

const KATEGORI = ['', ...new Set(GALERI.map((g) => g.kategori))];

export default function GaleriHalaman() {
  const [kategori, setKategori] = useState('');
  const items = kategori ? GALERI.filter((g) => g.kategori === kategori) : GALERI;

  return (
    <Halaman pengantar="Dokumentasi kegiatan dan sudut pesantren. Gambar di halaman ini adalah ilustrasi placeholder, bukan foto.">
      <Bagian id="galeri-semua" judul="Galeri" judulTersembunyi>
        <ul className="filter-kategori" aria-label="Filter kategori galeri">
          {KATEGORI.map((k) => (
            <li key={k || 'semua'}>
              <button type="button" aria-pressed={kategori === k} onClick={() => setKategori(k)}>
                {k || 'Semua'}
              </button>
            </li>
          ))}
        </ul>
        <p className="hasil-info" aria-live="polite">
          {items.length} gambar{kategori ? ` dalam kategori ${kategori}` : ''}.
        </p>
        <GaleriGrid key={kategori} items={items} />
      </Bagian>
    </Halaman>
  );
}
