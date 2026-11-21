import Reveal from './Reveal.jsx';
import '../styles/Linimasa.css';

/** Linimasa vertikal (sejarah). Tiap titik muncul bertahap saat di-scroll (animasi 4). */
export default function Linimasa({ items }) {
  return (
    <ol className="linimasa">
      {items.map((it) => (
        <Reveal as="li" key={it.tahun} className="linimasa__item">
          <p className="linimasa__tahun">{it.tahun}</p>
          <div className="linimasa__isi">
            <h3>{it.judul}</h3>
            <p>{it.teks}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
