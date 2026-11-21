import Halaman, { Bagian } from '../components/Halaman.jsx';
import Reveal from '../components/Reveal.jsx';
import Button from '../components/Button.jsx';
import IkonSosmed from '../components/IkonSosmed.jsx';
import PolaLatar from '../components/PolaLatar.jsx';
import { KONTAK, NAMA, SOSMED } from '../data/konten.js';
import '../styles/Card.css';
import '../styles/PPDB.css';

const Ikon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const IKON = {
  alamat: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  telepon: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  email: 'M3 5h18v14H3zM3 7l9 6 9-6',
  jam: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
};

/** Peta ilustrasi buatan sendiri (bukan peta sungguhan — tidak ada embed pihak ketiga). */
function PetaIlustrasi() {
  const garis = { stroke: 'var(--white)', strokeOpacity: 0.28 };
  return (
    <figure className="peta">
      <PolaLatar className="ilustrasi-fasilitas__pola" ukuran={60} opasitas={0.05} />
      <svg viewBox="0 0 400 240" width="100%" role="img" aria-label="Ilustrasi peta lokasi pesantren (fiktif)">
        <path d="M0 150 C 90 140, 150 175, 240 150 S 360 120, 400 135" fill="none" style={garis} strokeWidth="14" />
        <path d="M120 0 C 130 80, 110 160, 140 240" fill="none" style={garis} strokeWidth="10" />
        <path d="M290 0 L 270 240" fill="none" style={garis} strokeWidth="6" />
        <rect x="30" y="40" width="60" height="40" rx="6" style={{ fill: 'var(--white)', fillOpacity: 0.1 }} />
        <rect x="310" y="170" width="70" height="44" rx="6" style={{ fill: 'var(--white)', fillOpacity: 0.1 }} />
        <circle cx="205" cy="105" r="34" style={{ fill: 'var(--white)', fillOpacity: 0.12 }} />
        <path d="M205 120s-16-14-16-26a16 16 0 0 1 32 0c0 12-16 26-16 26z" style={{ fill: 'var(--white)' }} />
        <circle cx="205" cy="94" r="5.5" style={{ fill: 'var(--navy)' }} />
      </svg>
      <figcaption>Ilustrasi lokasi — {KONTAK.alamat.join(', ')}</figcaption>
    </figure>
  );
}

export default function Kontak() {
  const info = [
    { k: 'alamat', label: 'Alamat', nilai: KONTAK.alamat.join(', ') },
    { k: 'telepon', label: 'Telepon', nilai: <a href={`tel:${KONTAK.telepon.replace(/\D/g, '')}`}>{KONTAK.telepon}</a> },
    { k: 'email', label: 'Email', nilai: <a href={`mailto:${KONTAK.email}`}>{KONTAK.email}</a> },
    { k: 'jam', label: 'Jam layanan', nilai: KONTAK.jamLayanan },
  ];

  return (
    <Halaman pengantar="Hubungi panitia atau kunjungi kami. Semua data kontak di situs ini fiktif.">
      <Bagian id="kontak-info" judul="Informasi kontak">
        <div className="kontak-grid">
          <Reveal arah="kiri" className="panel">
            <ul className="kontak-daftar">
              {info.map((i) => (
                <li key={i.k}>
                  <span className="kontak-daftar__ikon">
                    <Ikon d={IKON[i.k]} />
                  </span>
                  <span>
                    <span className="kontak-daftar__label">{i.label}</span>
                    <span className="kontak-daftar__nilai">{i.nilai}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal arah="kanan">
            <PetaIlustrasi />
          </Reveal>
        </div>
      </Bagian>

      <Bagian id="sosmed" judul="Media sosial" tone="soft">
        <ul className="grid-kartu grid-kartu--4">
          {SOSMED.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 100}>
              <article className="card card--interaktif kartu-sosmed">
                <span className="kartu-sosmed__ikon">
                  <IkonSosmed id={s.id} ukuran={22} />
                </span>
                <h3>{s.nama}</h3>
                <p>{s.akun}</p>
                <Button
                  href={s.url}
                  variant="ghost-dark"
                  className="btn--kecil"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kunjungi ${s.nama} ${NAMA} (akun demo, buka di tab baru)`}
                >
                  Kunjungi
                </Button>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="struktur__catatan">
          Pesantren ini fiktif, jadi tautan mengarah ke beranda masing-masing platform, bukan ke akun sungguhan.
        </p>
      </Bagian>
    </Halaman>
  );
}
