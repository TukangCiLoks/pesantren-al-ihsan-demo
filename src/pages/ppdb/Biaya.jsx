import Halaman, { Bagian } from '../../components/Halaman.jsx';
import AjakanDaftar from '../../components/AjakanDaftar.jsx';
import { BIAYA } from '../../data/ppdb.js';
import '../../styles/PPDB.css';

const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const jumlah = (baris, kolom) => baris.reduce((t, b) => t + b[kolom], 0);

function TabelBiaya({ judul, baris, labelTotal }) {
  return (
    <div className="tabel-gulir">
      <table className="tabel-isi">
        <caption className="visually-hidden">{judul}</caption>
        <thead>
          <tr>
            <th scope="col">Komponen</th>
            <th scope="col" className="angka">
              SMP Islam
            </th>
            <th scope="col" className="angka">
              SMA Islam
            </th>
          </tr>
        </thead>
        <tbody>
          {baris.map((b) => (
            <tr key={b.komponen}>
              <td>{b.komponen}</td>
              <td className="angka">{rupiah.format(b.smp)}</td>
              <td className="angka">{rupiah.format(b.sma)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">{labelTotal}</th>
            <td className="angka">{rupiah.format(jumlah(baris, 'smp'))}</td>
            <td className="angka">{rupiah.format(jumlah(baris, 'sma'))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function Biaya() {
  return (
    <Halaman pengantar="Rincian biaya pendidikan tahun ajaran 2026/2027. Semua angka di halaman ini adalah contoh fiktif.">
      <Bagian id="masuk" judul="Biaya masuk (sekali bayar)">
        <TabelBiaya judul="Biaya masuk" baris={BIAYA.masuk} labelTotal="Total biaya masuk" />
      </Bagian>
      <Bagian id="bulanan" judul="Biaya bulanan" tone="soft">
        <TabelBiaya judul="Biaya bulanan" baris={BIAYA.bulanan} labelTotal="Total per bulan" />
        <ul className="catatan-daftar">
          {BIAYA.catatan.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <AjakanDaftar sekunder={{ to: '/ppdb/faq', label: 'Baca FAQ' }} />
      </Bagian>
    </Halaman>
  );
}
