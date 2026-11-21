import Halaman, { Bagian } from '../../components/Halaman.jsx';
import { KALENDER } from '../../data/pendidikan.js';

export default function Kalender() {
  return (
    <Halaman pengantar="Agenda penting tahun ajaran 2026/2027 (contoh). Tanggal dapat berubah mengikuti keputusan pimpinan pesantren.">
      {KALENDER.map((s, i) => (
        <Bagian key={s.semester} id={`semester-${i + 1}`} judul={s.semester} tone={i % 2 ? 'soft' : 'white'}>
          <div className="tabel-gulir">
            <table className="tabel-isi">
              <caption className="visually-hidden">Kalender {s.semester}</caption>
              <thead>
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Kegiatan</th>
                  <th scope="col">Jenis</th>
                </tr>
              </thead>
              <tbody>
                {s.kegiatan.map((k) => (
                  <tr key={k.tanggal + k.nama}>
                    <th scope="row" className="kalender__tanggal">
                      {k.tanggal}
                    </th>
                    <td>{k.nama}</td>
                    <td>
                      <span className="label-garis">{k.jenis}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Bagian>
      ))}
    </Halaman>
  );
}
