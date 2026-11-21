import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import BaganOrganisasi from '../../components/BaganOrganisasi.jsx';
import StatusMessage from '../../components/StatusMessage.jsx';
import { ambilPengurus, UNIT } from '../../lib/pengurus.js';
import { bangunPohon } from '../../utils/pohon.js';

/** Satu templat untuk Yayasan, Pimpinan Pesantren, dan Unit Pendidikan. Data dari tabel `pengurus`. */
export default function Struktur({ unit }) {
  const [state, setState] = useState({ status: 'memuat', data: [], error: '' });

  useEffect(() => {
    let aktif = true;
    setState({ status: 'memuat', data: [], error: '' });
    ambilPengurus(unit)
      .then((data) => aktif && setState({ status: 'selesai', data, error: '' }))
      .catch((e) => aktif && setState({ status: 'gagal', data: [], error: e.message }));
    return () => {
      aktif = false;
    };
  }, [unit]);

  const pohon = useMemo(() => bangunPohon(state.data), [state.data]);
  const lain = Object.entries(UNIT).filter(([k]) => k !== unit);
  const contoh = state.data.some((p) => p.contoh);

  return (
    <Halaman>
      <Bagian id="bagan" judul={`Bagan ${UNIT[unit]}`}>
        {state.status === 'memuat' && <StatusMessage>Memuat struktur…</StatusMessage>}
        {state.status === 'gagal' && <StatusMessage tone="error">{state.error}</StatusMessage>}
        {state.status === 'selesai' && pohon.length === 0 && <StatusMessage>Belum ada data pengurus.</StatusMessage>}
        {pohon.length > 0 && (
          <Reveal>
            <BaganOrganisasi pohon={pohon} label={`Bagan ${UNIT[unit]}, dapat digeser mendatar`} />
          </Reveal>
        )}
        <p className="struktur__catatan">
          {contoh ? 'Menampilkan susunan contoh karena Supabase belum terhubung. ' : ''}
          Seluruh nama di bagan ini fiktif.
        </p>
      </Bagian>

      <Bagian id="unit-lain" judul="Struktur lainnya" tone="soft">
        <ul className="grid-kartu">
          {lain.map(([k, label]) => (
            <li key={k}>
              <Link to={`/profil/struktur/${k}`} className="panel tautan-panel">
                <span className="tautan-panel__judul">{label}</span>
                <span className="tautan-panel__teks">Lihat bagan {label.toLowerCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Bagian>
    </Halaman>
  );
}
