import Halaman, { Bagian } from '../../components/Halaman.jsx';
import Linimasa from '../../components/Linimasa.jsx';
import { SEJARAH } from '../../data/profil.js';

export default function Sejarah() {
  return (
    <Halaman pengantar={SEJARAH.pengantar}>
      <Bagian id="linimasa" judul="Perjalanan dari masa ke masa">
        <Linimasa items={SEJARAH.linimasa} />
      </Bagian>
    </Halaman>
  );
}
