import { MENU } from '../data/menu.js';

/**
 * Semua entri menu dalam satu daftar datar, masing-masing membawa `jejak`
 * (rantai induk dari level teratas sampai dirinya). Dihitung sekali saat modul dimuat.
 */
function ratakan(daftar, induk = []) {
  return daftar.flatMap((item) => {
    const jejak = [...induk, item];
    return [{ ...item, jejak }, ...(item.anak ? ratakan(item.anak, jejak) : [])];
  });
}

export const SEMUA_HALAMAN = ratakan(MENU);

const PETA = new Map(SEMUA_HALAMAN.map((h) => [h.to, h]));

/** Entri menu untuk sebuah path, atau undefined. Garis miring di akhir diabaikan. */
export const cariHalaman = (path) => PETA.get(path.replace(/\/+$/, '') || '/');

/**
 * Breadcrumb untuk path: [Beranda, …induk, halaman]. Untuk path yang tidak ada
 * di menu (mis. /berita/12), dipakai induk terdekat yang ada di menu.
 */
export function jejakUntuk(path) {
  const bersih = path.replace(/\/+$/, '');
  const potongan = bersih.split('/').filter(Boolean);
  for (let i = potongan.length; i > 0; i -= 1) {
    const h = cariHalaman(`/${potongan.slice(0, i).join('/')}`);
    if (h) return [MENU[0], ...h.jejak];
  }
  return [MENU[0]];
}

/** true bila `path` berada di bawah (atau sama dengan) `to`. Beranda hanya cocok dengan dirinya. */
export const aktifDi = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`));
