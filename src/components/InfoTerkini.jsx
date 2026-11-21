import { useEffect, useState } from 'react';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Button from './Button.jsx';
import StatusMessage from './StatusMessage.jsx';
import { ItemAgenda, ItemPengumuman } from './ItemInformasi.jsx';
import { ambilAgenda, ambilBeritaTerbaru } from '../lib/berita.js';
import '../styles/Informasi.css';

function useMuat(fn) {
  const [s, setS] = useState({ status: 'memuat', data: [], error: '' });
  useEffect(() => {
    let aktif = true;
    fn()
      .then((data) => aktif && setS({ status: 'selesai', data, error: '' }))
      .catch((e) => aktif && setS({ status: 'gagal', data: [], error: e.message }));
    return () => {
      aktif = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- fn statis
  return s;
}

function Kolom({ judul, id, state, kosong, render, semua }) {
  return (
    <Reveal className="info-kolom">
      <h3 id={id} className="info-kolom__judul">
        {judul}
      </h3>
      {state.status === 'memuat' && <StatusMessage>Memuat…</StatusMessage>}
      {state.status === 'gagal' && <StatusMessage tone="error">{state.error}</StatusMessage>}
      {state.status === 'selesai' && !state.data.length && <StatusMessage>{kosong}</StatusMessage>}
      {state.data.length > 0 && (
        <ul className="daftar-info" aria-labelledby={id}>
          {state.data.map((item) => (
            <li key={item.id}>{render(item)}</li>
          ))}
        </ul>
      )}
      <div className="info-kolom__aksi">
        <Button to={semua.to} variant="ghost-dark" className="btn--kecil">
          {semua.label}
        </Button>
      </div>
    </Reveal>
  );
}

/** Beranda: pengumuman terbaru dan agenda terdekat, berdampingan di layar lebar. */
export default function InfoTerkini() {
  const pengumuman = useMuat(() => ambilBeritaTerbaru(3, 'pengumuman'));
  const agenda = useMuat(() => ambilAgenda({ waktu: 'mendatang', batas: 3 }));

  return (
    <Section id="info" eyebrow="Info terkini" title="Pengumuman & agenda">
      <div className="info-terkini">
        <Kolom
          id="judul-pengumuman"
          judul="Pengumuman terbaru"
          state={pengumuman}
          kosong="Belum ada pengumuman."
          render={(item) => <ItemPengumuman item={item} />}
          semua={{ to: '/informasi/pengumuman', label: 'Semua pengumuman' }}
        />
        <Kolom
          id="judul-agenda"
          judul="Agenda terdekat"
          state={agenda}
          kosong="Belum ada agenda yang dijadwalkan."
          render={(item) => <ItemAgenda item={item} />}
          semua={{ to: '/informasi/agenda', label: 'Semua agenda' }}
        />
      </div>
    </Section>
  );
}
