import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Reveal from '../../components/Reveal.jsx';
import Button from '../../components/Button.jsx';
import { JENJANG } from '../../data/pendidikan.js';
import '../../styles/Card.css';
import '../../styles/Jenjang.css';

/** Satu templat untuk SMP, SMA, dan Tahfidz; isi dari data/pendidikan.js berdasarkan `jenis`. */
export default function Jenjang({ jenis }) {
  const j = JENJANG[jenis];

  return (
    <Halaman pengantar={j.pengantar}>
      <Bagian id="ringkasan" judul="Ringkasan program" judulTersembunyi>
        <ul className="sorotan" aria-label="Sekilas">
          {j.sorotan.map((s) => (
            <li key={s.label}>
              <span className="sorotan__nilai">{s.nilai}</span>
              <span className="sorotan__label">{s.label}</span>
            </li>
          ))}
        </ul>
        <div className="prosa prosa--lead">
          {j.paragraf.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Bagian>

      <Bagian id="kurikulum" judul="Muatan pembelajaran" tone="soft">
        <ul className="grid-kartu grid-kartu--3">
          {j.kurikulum.map((k, i) => (
            <Reveal as="li" key={k.kelompok} delay={i * 120}>
              <article className="card kurikulum-kartu">
                <h3>{k.kelompok}</h3>
                <ul className="kurikulum-kartu__mapel">
                  {k.mapel.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </Bagian>

      <Bagian id="jadwal" judul="Jadwal harian santri">
        <div className="dua-kolom">
          <div className="tabel-gulir">
            <table className="tabel-isi">
              <caption className="visually-hidden">Jadwal harian santri (contoh)</caption>
              <thead>
                <tr>
                  <th scope="col">Waktu</th>
                  <th scope="col">Kegiatan</th>
                </tr>
              </thead>
              <tbody>
                {j.jadwal.map((r) => (
                  <tr key={r.waktu}>
                    <th scope="row">{r.waktu}</th>
                    <td>{r.kegiatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal arah="kanan" className="panel cta-jenjang">
            <p className="panel__judul">Penerimaan santri baru</p>
            <p>Pendaftaran tahun ajaran 2026/2027 dibuka secara online. Lihat alur dan syaratnya, lalu isi formulir.</p>
            <div className="cta-jenjang__aksi">
              <Button to="/ppdb/formulir" variant="dark">
                Daftar sekarang
              </Button>
              <Button to="/ppdb/syarat" variant="ghost-dark">
                Lihat syarat
              </Button>
            </div>
          </Reveal>
        </div>
      </Bagian>
    </Halaman>
  );
}
