import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import ProfilSingkat from '../components/ProfilSingkat.jsx';
import PitaAyat from '../components/PitaAyat.jsx';
import BeritaTerbaru from '../components/BeritaTerbaru.jsx';
import Galeri from '../components/Galeri.jsx';
import Pendaftaran from '../components/Pendaftaran.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Beranda() {
  useDocumentTitle();
  const { hash, key } = useLocation();

  // React Router tidak menggulir ke #anchor; lakukan sendiri setiap navigasi
  // (key berubah juga saat menu yang sama diklik ulang).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      el.scrollIntoView();
      // Pindahkan fokus ke bagian tujuan untuk pengguna keyboard/pembaca layar.
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  }, [hash, key]);

  return (
    <>
      <Hero />
      <Stats />
      <ProfilSingkat />
      <PitaAyat />
      <BeritaTerbaru />
      <Galeri />
      <Pendaftaran />
    </>
  );
}
