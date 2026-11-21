import Halaman, { Bagian } from '../../components/Halaman.jsx';
import AlurPendaftaran from '../../components/AlurPendaftaran.jsx';
import AjakanDaftar from '../../components/AjakanDaftar.jsx';
import '../../styles/PPDB.css';

export default function Alur() {
  return (
    <Halaman pengantar="Empat langkah sederhana dari mengisi formulir hingga pengumuman hasil seleksi.">
      <Bagian id="alur" judul="Langkah pendaftaran" judulTersembunyi>
        <AlurPendaftaran />
        <AjakanDaftar sekunder={{ to: '/ppdb/syarat', label: 'Lihat syarat' }} />
      </Bagian>
    </Halaman>
  );
}
