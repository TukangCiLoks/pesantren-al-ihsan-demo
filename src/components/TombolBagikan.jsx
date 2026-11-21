import { useEffect, useState } from 'react';
import IkonSosmed from './IkonSosmed.jsx';

const IkonWa = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    <path d="M9 9.5c.3 2 1.6 3.6 3.5 4.5l1.2-1 2 .8-.3 1.5c-3.6.2-7-3.3-6.8-6.8L10 8.2l.8 2z" />
  </svg>
);
const IkonTautan = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L12 6.3M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7L12 17.7" />
  </svg>
);
const IkonBagikan = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="M8.2 10.8l7.6-4.5M8.2 13.2l7.6 4.5" />
  </svg>
);

/**
 * Tombol bagikan: Facebook, WhatsApp, salin tautan, dan (bila peramban mendukung)
 * menu bagikan bawaan perangkat. Instagram & TikTok tidak menyediakan tautan "bagikan"
 * untuk web, jadi keduanya tidak ada di sini. Tautan dibuka di tab baru tanpa referrer.
 */
export default function TombolBagikan({ judul }) {
  const [status, setStatus] = useState('');
  const [bisaShare, setBisaShare] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';

  useEffect(() => setBisaShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function'), []);

  async function salin() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Tautan disalin.');
    } catch {
      setStatus('Tidak bisa menyalin otomatis. Salin dari bilah alamat peramban.');
    }
  }

  async function bagikanBawaan() {
    try {
      await navigator.share({ title: judul, url });
    } catch {
      /* dibatalkan pengguna — tidak perlu pesan */
    }
  }

  const enc = encodeURIComponent;
  return (
    <div className="bagikan" role="group" aria-label="Bagikan halaman ini">
      <span className="bagikan__label" aria-hidden="true">
        Bagikan:
      </span>
      <a
        className="bagikan__tombol"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IkonSosmed id="facebook" ukuran={16} /> Facebook<span className="visually-hidden"> (tab baru)</span>
      </a>
      <a className="bagikan__tombol" href={`https://wa.me/?text=${enc(`${judul} ${url}`)}`} target="_blank" rel="noopener noreferrer">
        <IkonWa /> WhatsApp<span className="visually-hidden"> (tab baru)</span>
      </a>
      <button type="button" className="bagikan__tombol" onClick={salin}>
        <IkonTautan /> Salin tautan
      </button>
      {bisaShare && (
        <button type="button" className="bagikan__tombol" onClick={bagikanBawaan}>
          <IkonBagikan /> Lainnya…
        </button>
      )}
      <p className="bagikan__status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
