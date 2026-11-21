import { useEffect, useState } from 'react';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import BeritaCard from './BeritaCard.jsx';
import StatusMessage from './StatusMessage.jsx';
import Button from './Button.jsx';
import '../styles/Galeri.css';
import { ambilBeritaTerbaru } from '../lib/berita.js';
import '../styles/BeritaTerbaru.css';

export default function BeritaTerbaru() {
  // Satu objek state agar status, data, dan error selalu konsisten.
  const [state, setState] = useState({ status: 'memuat', data: [] });

  useEffect(() => {
    let aktif = true; // cegah setState setelah komponen dilepas
    ambilBeritaTerbaru(3)
      .then((data) => aktif && setState({ status: 'selesai', data }))
      .catch(() => aktif && setState({ status: 'gagal', data: [] }));
    return () => {
      aktif = false;
    };
  }, []);

  const contoh = state.data.some((b) => b.contoh);

  return (
    <Section
      id="berita"
      tone="soft"
      eyebrow="Kabar pesantren"
      title="Berita terbaru"
      intro="Kegiatan dan pengumuman terbaru dari lingkungan pesantren (dummy)."
    >
      {state.status === 'memuat' && <StatusMessage>Memuat berita…</StatusMessage>}

      {state.status === 'gagal' && (
        <StatusMessage tone="error">
          Berita gagal dimuat. Periksa koneksi internet Anda lalu muat ulang halaman.
        </StatusMessage>
      )}

      {state.status === 'selesai' && state.data.length === 0 && (
        <StatusMessage>Belum ada berita yang dipublikasikan.</StatusMessage>
      )}

      {contoh && (
        <p className="berita__catatan">
          Menampilkan berita contoh karena Supabase belum terhubung (lihat README).
        </p>
      )}

      {state.data.length > 0 && (
        <ul className="berita__grid">
          {state.data.map((b, i) => (
            <Reveal as="li" key={b.id} delay={i * 140}>
              <BeritaCard {...b} />
            </Reveal>
          ))}
        </ul>
      )}
      <div className="galeri__lainnya">
        <Button to="/informasi/berita" variant="ghost-dark">
          Lihat semua berita
        </Button>
      </div>
    </Section>
  );
}
