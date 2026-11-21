import { useEffect, useState } from 'react';

const KUNCI = 'tema';
export const PILIHAN_TEMA = ['sistem', 'terang', 'gelap'];

function bacaTersimpan() {
  try {
    const t = localStorage.getItem(KUNCI);
    return PILIHAN_TEMA.includes(t) ? t : 'sistem';
  } catch {
    return 'sistem'; // localStorage bisa diblokir (mode privat, pengaturan peramban)
  }
}

/** Pasang atribut data-theme di <html>. "sistem" = tanpa atribut → ikut prefers-color-scheme. */
function terapkan(tema) {
  const root = document.documentElement;
  if (tema === 'terang') root.dataset.theme = 'light';
  else if (tema === 'gelap') root.dataset.theme = 'dark';
  else delete root.dataset.theme;
}

/**
 * Pilihan tema pengguna: 'sistem' | 'terang' | 'gelap'.
 * Disimpan di localStorage; skrip kecil di index.html memasangnya sebelum
 * React jalan, jadi halaman tidak berkedip putih saat dibuka dalam mode gelap.
 */
export function useTema() {
  const [tema, setTema] = useState(bacaTersimpan);

  useEffect(() => {
    terapkan(tema);
    try {
      if (tema === 'sistem') localStorage.removeItem(KUNCI);
      else localStorage.setItem(KUNCI, tema);
    } catch {
      /* abaikan: tema tetap berlaku untuk kunjungan ini */
    }
  }, [tema]);

  // Ikuti perubahan dari tab lain.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KUNCI) setTema(PILIHAN_TEMA.includes(e.newValue) ? e.newValue : 'sistem');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return [tema, setTema];
}
