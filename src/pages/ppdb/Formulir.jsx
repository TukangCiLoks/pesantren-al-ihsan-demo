import { Link } from 'react-router-dom';
import Halaman, { Bagian } from '../../components/Halaman.jsx';
import FormPendaftaran from '../../components/FormPendaftaran.jsx';

/** Formulir pendaftaran online (dipindahkan dari beranda). Logika & validasi tidak berubah. */
export default function Formulir() {
  return (
    <Halaman pengantar="Isi data calon santri dan wali. Nomor pendaftaran langsung muncul setelah formulir terkirim.">
      <Bagian id="formulir" judul="Formulir pendaftaran santri baru" judulTersembunyi>
        <p className="prosa">
          Belum yakin? Baca dulu <Link to="/ppdb/syarat">syarat</Link>, <Link to="/ppdb/biaya">biaya</Link>, dan{' '}
          <Link to="/ppdb/faq">pertanyaan yang sering diajukan</Link>.
        </p>
        {/* Sengaja tanpa Reveal: isian yang difokus harus selalu tampak. */}
        <FormPendaftaran />
      </Bagian>
    </Halaman>
  );
}
