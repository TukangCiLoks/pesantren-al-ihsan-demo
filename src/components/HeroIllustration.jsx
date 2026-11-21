/**
 * Ilustrasi latar hero buatan sendiri (SVG), berlapis untuk kesan kedalaman:
 * langit + cahaya, bintang, bulan sabit, bukit jauh, asrama, masjid dengan
 * jendela menyala, pohon kurma, dan tanah depan. Hanya warna palet
 * (navy, navy-2, putih dengan berbagai transparansi).
 * Komposisi berat di kanan agar teks di kiri tetap mudah dibaca.
 */
const N = '#0B1F3A';
const N2 = '#14325C';
const W = '#FFFFFF';

function Menara({ x, tinggi }) {
  const atas = 820 - tinggi;
  return (
    <g>
      <rect x={x} y={atas} width="40" height={tinggi} fill={N} />
      <rect x={x - 8} y={atas + 70} width="56" height="12" fill={N} />
      <rect x={x - 8} y={atas + 190} width="56" height="12" fill={N} />
      <path d={`M${x - 6} ${atas} h52 l-26 -64z`} fill={N} />
      <circle cx={x + 20} cy={atas - 72} r="5" fill={W} fillOpacity="0.7" />
      <rect x={x + 14} y={atas + 100} width="12" height="26" rx="6" fill={W} fillOpacity="0.35" />
      <rect x={x + 14} y={atas + 230} width="12" height="26" rx="6" fill={W} fillOpacity="0.3" />
    </g>
  );
}

function Kurma({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={N}>
      <path d="M-4 0 q6 -90 -2 -170 h8 q6 80 2 170z" />
      <path d="M0 -170 q-60 -20 -110 20 q55 -10 110 -12z" />
      <path d="M0 -170 q60 -20 110 20 q-55 -10 -110 -12z" />
      <path d="M0 -172 q-40 -50 -95 -45 q50 15 95 47z" />
      <path d="M0 -172 q40 -50 95 -45 q-50 15 -95 47z" />
      <path d="M0 -172 q-5 -55 10 -80 q-2 40 -6 80z" />
    </g>
  );
}

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" width="100%" height="100%">
      <defs>
        <linearGradient id="hero-langit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={N} />
          <stop offset="1" stopColor={N2} />
        </linearGradient>
        <radialGradient id="hero-cahaya" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={W} stopOpacity="0.22" />
          <stop offset="1" stopColor={W} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#hero-langit)" />
      <circle cx="1040" cy="560" r="460" fill="url(#hero-cahaya)" />

      {/* Bintang */}
      <g fill={W}>
        {[
          [180, 120, 2, 0.5], [320, 210, 1.5, 0.4], [470, 90, 2, 0.55], [620, 170, 1.5, 0.4], [760, 70, 2.2, 0.6],
          [880, 200, 1.5, 0.45], [980, 110, 2, 0.6], [1350, 90, 1.8, 0.5], [1390, 300, 2, 0.45], [1110, 280, 1.4, 0.4],
          [560, 300, 1.4, 0.3], [90, 330, 1.6, 0.35], [1280, 360, 1.3, 0.35],
        ].map(([x, y, r, o]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fillOpacity={o} />
        ))}
      </g>

      {/* Bulan sabit dengan pendar */}
      <g transform="translate(1210 170)">
        <circle r="92" fill={W} fillOpacity="0.06" />
        <circle r="54" fill={W} fillOpacity="0.92" />
        <circle cx="22" cy="-12" r="48" fill={N} />
      </g>

      {/* Bukit jauh */}
      <path d="M0 690 Q 200 610 420 660 T 860 640 T 1440 620 V 900 H 0 Z" fill={W} fillOpacity="0.05" />
      <path d="M0 740 Q 260 680 520 720 T 1100 700 T 1440 710 V 900 H 0 Z" fill={N2} />

      {/* Asrama di kiri belakang */}
      <g fill={N2}>
        <rect x="250" y="640" width="300" height="180" />
        <path d="M240 640 h320 l-30 -40 h-260z" />
      </g>
      <g fill={W} fillOpacity="0.16">
        {[280, 340, 400, 460, 510].map((x) => (
          <rect key={x} x={x} y="670" width="22" height="30" rx="3" />
        ))}
        {[280, 340, 400, 460, 510].map((x) => (
          <rect key={`b${x}`} x={x} y="730" width="22" height="30" rx="3" />
        ))}
      </g>

      {/* Masjid utama */}
      <Menara x={790} tinggi={470} />
      <Menara x={1250} tinggi={470} />
      <g fill={N}>
        <rect x="860" y="590" width="360" height="230" />
        {/* kubah utama */}
        <path d="M915 590 C 915 420, 1165 420, 1165 590 Z" />
        <rect x="1036" y="425" width="8" height="34" />
        <path d="M1040 392 a14 14 0 1 0 10 24 a11 11 0 1 1 -10 -24z" fill={W} fillOpacity="0.75" />
        {/* kubah kecil */}
        <path d="M860 590 C 860 530, 930 530, 930 590 Z" />
        <path d="M1150 590 C 1150 530, 1220 530, 1220 590 Z" />
        {/* tangga & lantai */}
        <rect x="830" y="808" width="420" height="14" />
      </g>
      {/* Pita hiasan di bawah kubah */}
      <rect x="915" y="584" width="250" height="6" fill={W} fillOpacity="0.18" />
      {/* Jendela & pintu menyala */}
      <g fill={W}>
        <path d="M905 770 v-70 q22 -36 44 0 v70z" fillOpacity="0.28" />
        <path d="M1131 770 v-70 q22 -36 44 0 v70z" fillOpacity="0.28" />
        <path d="M1005 808 v-110 q35 -56 70 0 v110z" fillOpacity="0.42" />
        <path d="M960 690 v-34 q12 -20 24 0 v34z" fillOpacity="0.22" />
        <path d="M1096 690 v-34 q12 -20 24 0 v34z" fillOpacity="0.22" />
      </g>

      {/* Pohon kurma (latar depan) */}
      <Kurma x={690} y={830} s={1.05} />
      <Kurma x={1370} y={840} s={0.9} />

      {/* Tanah depan */}
      <path d="M0 820 Q 720 790 1440 820 V 900 H 0 Z" fill={N} />
    </svg>
  );
}
