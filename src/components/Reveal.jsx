import { useReveal } from '../hooks/useReveal.js';

/**
 * Pembungkus animasi 4 (scroll reveal). Memberi kelas .reveal dan, sekali
 * elemen terlihat, .is-visible. Keadaan awal tersembunyi hanya berlaku bila
 * reduced-motion tidak aktif (lihat global.css).
 *
 * arah: 'atas' (default, naik dari bawah) | 'kiri' | 'kanan'
 * delay: jeda dalam ms, untuk efek bertahap antarkartu.
 */
export default function Reveal({ as: Tag = 'div', arah = 'atas', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  const kelas = ['reveal', arah !== 'atas' && `reveal--${arah}`, visible && 'is-visible', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag ref={ref} className={kelas} style={delay ? { '--reveal-delay': `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
