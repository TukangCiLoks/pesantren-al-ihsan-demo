import { useEffect } from 'react';

const SITUS = 'Pesantren Al-Ihsan (Demo)';

/** Mengatur <title> per halaman (SEO & orientasi pembaca layar). */
export function useDocumentTitle(judul) {
  useEffect(() => {
    document.title = judul ? `${judul} — ${SITUS}` : `${SITUS} — Situs Portofolio`;
  }, [judul]);
}
