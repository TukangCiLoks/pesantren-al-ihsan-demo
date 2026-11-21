import Halaman, { Bagian } from '../../components/Halaman.jsx';
import DaftarCek from '../../components/DaftarCek.jsx';
import AjakanDaftar from '../../components/AjakanDaftar.jsx';
import { SYARAT } from '../../data/ppdb.js';
import '../../styles/PPDB.css';

export default function Syarat() {
  return (
    <Halaman pengantar="Ketentuan calon santri dan berkas yang perlu disiapkan (contoh fiktif).">
      <Bagian id="umum" judul="Ketentuan umum">
        <DaftarCek items={SYARAT.umum} />
      </Bagian>
      <Bagian id="berkas" judul="Berkas yang dibawa saat tes" tone="soft">
        <div className="tabel-gulir">
          <table className="tabel-isi">
            <caption className="visually-hidden">Daftar berkas pendaftaran</caption>
            <thead>
              <tr>
                <th scope="col">Berkas</th>
                <th scope="col" className="angka">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              {SYARAT.berkas.map((b) => (
                <tr key={b.nama}>
                  <td>{b.nama}</td>
                  <td className="angka">{b.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="struktur__catatan">{SYARAT.catatan}</p>
        <AjakanDaftar sekunder={{ to: '/ppdb/biaya', label: 'Lihat biaya' }} />
      </Bagian>
    </Halaman>
  );
}
