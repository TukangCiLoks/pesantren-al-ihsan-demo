import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Menghitung naik dari 0 ke `target` dalam `duration` ms setelah `start` true.
 * Dengan reduced-motion, langsung mengembalikan angka akhir.
 */
export function useCountUp(target, { duration = 1600, start = true } = {}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reduced) return undefined;

    let frame;
    const t0 = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start, reduced]);

  return reduced ? target : value;
}
