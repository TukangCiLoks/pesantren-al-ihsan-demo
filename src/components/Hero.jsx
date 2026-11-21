import Basmalah from './Basmalah.jsx';
import Button from './Button.jsx';
import HeroIllustration from './HeroIllustration.jsx';
import PolaLatar from './PolaLatar.jsx';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="beranda" className="hero on-dark" aria-labelledby="hero-judul">
      {/* Animasi 1 — Ken Burns pada lapisan ilustrasi */}
      <div className="hero__bg">
        <HeroIllustration />
      </div>
      <div className="hero__overlay" />
      <PolaLatar className="hero__pola" ukuran={140} opasitas={0.05} />

      <div className="container hero__content">
        {/* Animasi 2 — text reveal berjenjang (urutan lewat --d) */}
        <Basmalah className="hero__anim hero__basmalah" style={{ '--d': '0ms' }} />
        <p className="eyebrow hero__anim hero__eyebrow" style={{ '--d': '180ms' }}>
          <span className="hero__garis" aria-hidden="true" />
          Pesantren Al-Ihsan · Situs Demo
        </p>
        <h1 id="hero-judul" className="hero__anim" style={{ '--d': '360ms' }}>
          Menumbuhkan generasi berilmu, beradab, dan berakhlak mulia
        </h1>
        <p className="hero__sub hero__anim" style={{ '--d': '540ms' }}>
          Pendidikan SMP, SMA, dan tahfidz dalam lingkungan asrama yang tenang, tertib, dan penuh kepedulian.
        </p>
        <div className="hero__actions hero__anim" style={{ '--d': '720ms' }}>
          {/* Animasi 3 — CTA berdenyut, varian putih di atas navy */}
          <Button to="/#daftar" variant="light" pulse>
            Daftar Sekarang
          </Button>
          <Button to="/#profil" variant="ghost-light">
            Kenali Kami
          </Button>
        </div>
      </div>
    </section>
  );
}
