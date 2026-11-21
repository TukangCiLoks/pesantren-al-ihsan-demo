import PolaLatar from './PolaLatar.jsx';

/**
 * Ilustrasi fasilitas buatan sendiri (SVG) di atas panel navy — sama di kedua tema.
 * Warna lewat variabel palet (style), bukan kode hex.
 */
// Bangunan memakai putih transparan (bukan navy-2) agar tetap terlihat di atas gradasi navy.
const P = { navy2: { fill: 'var(--white)', fillOpacity: 0.14 }, putih: { fill: 'var(--white)' } };

const ADEGAN = {
  asrama: (
    <g>
      <rect x="70" y="90" width="260" height="140" style={P.navy2} />
      <path d="M55 92 L200 40 L345 92 Z" style={P.navy2} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={92 + c * 46} y={108 + r * 38} width="26" height="24" rx="3" style={P.putih} fillOpacity={(r + c) % 3 === 0 ? 0.55 : 0.22} />
        )),
      )}
      <path d="M182 230 v-40 q18 -26 36 0 v40z" style={P.putih} fillOpacity="0.4" />
    </g>
  ),
  masjid: (
    <g>
      <rect x="110" y="140" width="180" height="90" style={P.navy2} />
      <path d="M130 140 C130 60, 270 60, 270 140 Z" style={P.navy2} />
      <rect x="197" y="62" width="6" height="20" style={P.putih} fillOpacity="0.7" />
      <rect x="70" y="80" width="22" height="150" style={P.navy2} />
      <path d="M66 80 h30 l-15 -34z" style={P.navy2} />
      <rect x="308" y="80" width="22" height="150" style={P.navy2} />
      <path d="M304 80 h30 l-15 -34z" style={P.navy2} />
      <path d="M182 230 v-50 q18 -30 36 0 v50z" style={P.putih} fillOpacity="0.45" />
      <path d="M135 200 v-26 q11 -18 22 0 v26z M243 200 v-26 q11 -18 22 0 v26z" style={P.putih} fillOpacity="0.25" />
    </g>
  ),
  perpustakaan: (
    <g>
      <rect x="60" y="50" width="280" height="180" rx="6" style={P.navy2} />
      {[0, 1, 2].map((rak) => (
        <g key={rak}>
          <rect x="60" y={102 + rak * 58} width="280" height="6" style={P.putih} fillOpacity="0.35" />
          {Array.from({ length: 11 }).map((_, i) => (
            <rect
              key={i}
              x={78 + i * 23 + (i > 5 ? 8 : 0)}
              y={102 + rak * 58 - (34 + ((i * 7 + rak * 5) % 14))}
              width="16"
              height={34 + ((i * 7 + rak * 5) % 14)}
              rx="2"
              style={P.putih}
              fillOpacity={0.18 + (((i + rak) % 4) * 0.12)}
            />
          ))}
        </g>
      ))}
    </g>
  ),
  laboratorium: (
    <g>
      <rect x="50" y="190" width="300" height="12" rx="3" style={P.putih} fillOpacity="0.4" />
      <path d="M120 90 h30 v40 l34 58 h-98 l34 -58z" style={P.navy2} />
      <path d="M100 170 h70 l12 18 h-94z" style={P.putih} fillOpacity="0.45" />
      <rect x="114" y="80" width="42" height="12" rx="3" style={P.navy2} />
      <rect x="215" y="110" width="26" height="78" rx="13" style={P.navy2} />
      <rect x="219" y="150" width="18" height="34" rx="9" style={P.putih} fillOpacity="0.45" />
      <rect x="262" y="96" width="26" height="92" rx="13" style={P.navy2} />
      <rect x="266" y="126" width="18" height="58" rx="9" style={P.putih} fillOpacity="0.3" />
      <circle cx="160" cy="62" r="5" style={P.putih} fillOpacity="0.5" />
      <circle cx="176" cy="44" r="3.5" style={P.putih} fillOpacity="0.4" />
    </g>
  ),
};

export default function IlustrasiFasilitas({ jenis }) {
  return (
    <div className="ilustrasi-fasilitas">
      <PolaLatar className="ilustrasi-fasilitas__pola" ukuran={80} opasitas={0.07} />
      <svg viewBox="0 0 400 260" width="100%" aria-hidden="true" focusable="false">
        {ADEGAN[jenis]}
      </svg>
    </div>
  );
}
