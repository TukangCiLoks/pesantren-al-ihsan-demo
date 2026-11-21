import { useId } from 'react';

/**
 * Pola bintang delapan sebagai lapisan latar (garis putih transparan).
 * Dipakai di hero dan pita ayat. Ukuran sel dan ketebalan bisa diatur.
 */
export default function PolaLatar({ ukuran = 120, opasitas = 0.07, className = '' }) {
  const id = `pola-latar-${useId().replace(/:/g, '')}`;
  const s = ukuran;
  const q = s / 4;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
          <g fill="none" style={{ stroke: 'var(--white)' }} strokeOpacity={opasitas} strokeWidth="1.5">
            <rect x={q * 1.15} y={q * 1.15} width={q * 1.7} height={q * 1.7} />
            <rect x={q * 1.15} y={q * 1.15} width={q * 1.7} height={q * 1.7} transform={`rotate(45 ${s / 2} ${s / 2})`} />
            <circle cx={s / 2} cy={s / 2} r={s / 12} />
            <path d={`M0 ${s / 2}h${q * 0.85}M${s - q * 0.85} ${s / 2}h${q * 0.85}M${s / 2} 0v${q * 0.85}M${s / 2} ${s - q * 0.85}v${q * 0.85}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
