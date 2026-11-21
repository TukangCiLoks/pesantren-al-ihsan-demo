import { useEffect, useState } from 'react';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import StatusMessage from '../../components/StatusMessage.jsx';
import { ItemAgenda } from '../../components/ItemInformasi.jsx';
import { ambilAgenda } from '../../lib/berita.js';
import '../../styles/Informasi.css';

function DaftarAgenda({ waktu }) {
  const [state, setState] = useState({ status: 'memuat', data: [], error: '' });

  useEffect(() => {
    let aktif = true;
    ambilAgenda({ waktu, batas: waktu === 'mendatang' ? 20 : 10 })
      .then((data) => aktif && setState({ status: 'selesai', data, error: '' }))
      .catch((e) => aktif && setState({ status: 'gagal', data: [], error: e.message }));
    return () => {
      aktif = false;
    };
  }, [waktu]);

  if (state.status === 'memuat') return <StatusMessage>Memuat agenda…</StatusMessage>;
  if (state.status === 'gagal') return <StatusMessage tone="error">{state.error}</StatusMessage>;
  if (!state.data.length) {
    return <StatusMessage>{waktu === 'mendatang' ? 'Belum ada agenda yang dijadwalkan.' : 'Belum ada agenda yang lewat.'}</StatusMessage>;
  }
  return (
    <ul className="daftar-info">
      {state.data.map((a, i) => (
        <Reveal as="li" key={a.id} delay={Math.min(i, 4) * 80}>
          <ItemAgenda item={a} lewat={waktu === 'lewat'} />
        </Reveal>
      ))}
    </ul>
  );
}

export default function Agenda() {
  return (
    <Halaman pengantar="Kegiatan pesantren yang terbuka untuk santri, wali, dan masyarakat (contoh fiktif).">
      <Bagian id="mendatang" judul="Akan datang">
        <DaftarAgenda waktu="mendatang" />
      </Bagian>
      <Bagian id="lewat" judul="Sudah berlangsung" tone="soft">
        <DaftarAgenda waktu="lewat" />
      </Bagian>
    </Halaman>
  );
}
