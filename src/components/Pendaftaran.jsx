import Section from './Section.jsx';
import AlurPendaftaran from './AlurPendaftaran.jsx';
import AjakanDaftar from './AjakanDaftar.jsx';
import '../styles/PPDB.css';

/** Bagian PPDB di beranda: alur ringkas + ajakan ke formulir (formulirnya di /ppdb/formulir). */
export default function Pendaftaran() {
  return (
    <Section
      id="daftar"
      tone="soft"
      eyebrow="Penerimaan santri baru"
      title="Pendaftaran tahun ajaran 2026/2027"
      intro="Empat langkah sederhana. Nomor pendaftaran langsung muncul setelah formulir online terkirim."
    >
      <AlurPendaftaran />
      <AjakanDaftar sekunder={{ to: '/ppdb/syarat', label: 'Syarat & biaya' }} />
    </Section>
  );
}
