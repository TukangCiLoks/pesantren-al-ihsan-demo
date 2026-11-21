/** Basmalah dalam Amiri, dengan arti untuk pembaca layar. */
export default function Basmalah({ className = '', style }) {
  return (
    <p className={`teks-arab ${className}`} style={style}>
      <span lang="ar" dir="rtl">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </span>
      <span className="visually-hidden"> — Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang</span>
    </p>
  );
}
