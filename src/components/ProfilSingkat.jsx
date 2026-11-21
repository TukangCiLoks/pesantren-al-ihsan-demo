import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import ProgramCard from './ProgramCard.jsx';
import Button from './Button.jsx';
import { NILAI, PROGRAM } from '../data/konten.js';
import '../styles/ProfilSingkat.css';

export default function ProfilSingkat() {
  return (
    <Section id="profil" eyebrow="Profil singkat" title="Belajar, beribadah, dan bertumbuh bersama">
      <div className="profil__layout">
        <Reveal arah="kiri" className="profil__teks">
          <p className="profil__lead">
            Pesantren Al-Ihsan (fiktif) memadukan kurikulum nasional dengan pendidikan diniyah. Santri dibina untuk
            mandiri, disiplin, dan peduli sesama.
          </p>
          <ul className="profil__nilai">
            {NILAI.map((n) => (
              <li key={n}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="currentColor" />
                  <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <p id="profil-program" className="profil__subjudul">
            Program pendidikan
          </p>
          <ul className="profil__program" aria-labelledby="profil-program">
            {PROGRAM.map((p, i) => (
              <Reveal as="li" arah="kanan" key={p.id} delay={i * 140}>
                <ProgramCard nomor={String(i + 1).padStart(2, '0')} {...p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <Reveal className="profil__cta">
        <p>Penerimaan santri baru tahun ajaran 2026/2027 telah dibuka.</p>
        {/* Animasi 3 — varian navy untuk latar terang */}
        <Button to="/#daftar" variant="dark" pulse>
          Lihat Alur Pendaftaran
        </Button>
      </Reveal>
    </Section>
  );
}
