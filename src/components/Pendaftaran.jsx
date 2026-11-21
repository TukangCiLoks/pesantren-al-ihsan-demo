import Section from './Section.jsx';
import AlurPendaftaran from './AlurPendaftaran.jsx';
import FormPendaftaran from './FormPendaftaran.jsx';

export default function Pendaftaran() {
  return (
    <Section
      id="daftar"
      tone="soft"
      eyebrow="Pendaftaran online"
      title="Alur & formulir pendaftaran santri baru"
      intro="Empat langkah sederhana. Nomor pendaftaran langsung muncul setelah formulir terkirim."
    >
      <AlurPendaftaran />
      {/* Sengaja tanpa Reveal: formulir panjang bisa tidak pernah mencapai ambang
          terlihat di layar kecil, dan isian yang difokus harus selalu tampak. */}
      <FormPendaftaran />
    </Section>
  );
}
