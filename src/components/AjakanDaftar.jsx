import Reveal from './Reveal.jsx';
import Button from './Button.jsx';

/** Panel ajakan di akhir halaman PPDB: menuju formulir (+ satu tautan sekunder). */
export default function AjakanDaftar({ sekunder }) {
  return (
    <Reveal className="panel ajakan-daftar">
      <div>
        <p className="panel__judul">Siap mendaftar?</p>
        <p className="ajakan-daftar__teks">Isi formulir online, lalu simpan nomor pendaftaran yang muncul.</p>
      </div>
      <div className="ajakan-daftar__aksi">
        {/* Animasi 3 — CTA berdenyut, varian navy di latar terang */}
        <Button to="/ppdb/formulir" variant="dark" pulse>
          Isi formulir online
        </Button>
        {sekunder && (
          <Button to={sekunder.to} variant="ghost-dark">
            {sekunder.label}
          </Button>
        )}
      </div>
    </Reveal>
  );
}
