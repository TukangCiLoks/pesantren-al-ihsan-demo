import { useEffect, useState } from 'react';

/** true selama media query cocok; ikut berubah saat jendela diubah ukurannya. */
export function useMediaQuery(query) {
  const [cocok, setCocok] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setCocok(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return cocok;
}
