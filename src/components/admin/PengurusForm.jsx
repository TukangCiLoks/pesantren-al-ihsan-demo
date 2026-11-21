import { useEffect, useMemo, useRef, useState } from 'react';
import FormField from '../FormField.jsx';
import Button from '../Button.jsx';
import StatusMessage from '../StatusMessage.jsx';
import { URUTAN_PENGURUS, validasiPengurus } from '../../utils/validasi.js';
import { bangunPohon, keturunan } from '../../utils/pohon.js';
import { simpanPengurus } from '../../lib/admin.js';
import { UNIT } from '../../lib/pengurus.js';

/** Pohon → daftar datar berurutan dengan kedalaman, untuk pilihan atasan yang menjorok. */
function ratakan(pohon, dalam = 0) {
  return pohon.flatMap((s) => [{ ...s, dalam }, ...ratakan(s.anak, dalam + 1)]);
}

/**
 * Formulir tambah/ubah pengurus. `awal` null = baru.
 * Pilihan atasan hanya dari unit yang sama dan tidak termasuk dirinya/bawahannya,
 * supaya tidak terbentuk lingkaran (server juga menolaknya lewat trigger).
 */
export default function PengurusForm({ awal, unitAwal, semua, onSimpan, onBatal }) {
  const [nilai, setNilai] = useState({
    nama: awal?.nama ?? '',
    jabatan: awal?.jabatan ?? '',
    unit: awal?.unit ?? unitAwal,
    induk_id: awal?.induk_id != null ? String(awal.induk_id) : '',
    urutan: String(awal?.urutan ?? 0),
    aktif: awal?.aktif ?? true,
  });
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');
  const [menyimpan, setMenyimpan] = useState(false);
  const sedangSimpan = useRef(false);
  const refs = useRef({});
  const judulRef = useRef(null);

  useEffect(() => {
    judulRef.current?.focus();
  }, []);

  const pilihanAtasan = useMemo(() => {
    const terlarang = awal ? new Set([awal.id, ...keturunan(semua, awal.id)]) : new Set();
    const seUnit = semua.filter((p) => p.unit === nilai.unit && !terlarang.has(p.id));
    return ratakan(bangunPohon(seUnit));
  }, [semua, nilai.unit, awal]);

  function ubah(e) {
    const { name, value, type, checked } = e.target;
    setNilai((v) => {
      const baru = { ...v, [name]: type === 'checkbox' ? checked : value };
      if (name === 'unit') baru.induk_id = ''; // atasan harus dari unit yang sama
      if (errors[name]) setErrors((p) => ({ ...p, [name]: validasiPengurus(baru)[name] }));
      return baru;
    });
  }

  async function kirim(e) {
    e.preventDefault();
    if (sedangSimpan.current) return;
    const err = validasiPengurus(nilai);
    setErrors(err);
    const pertama = URUTAN_PENGURUS.find((f) => err[f]);
    if (pertama) return refs.current[pertama]?.focus();

    sedangSimpan.current = true;
    setMenyimpan(true);
    setPesan('');
    try {
      const tersimpan = await simpanPengurus({
        id: awal?.id,
        nama: nilai.nama.trim(),
        jabatan: nilai.jabatan.trim(),
        unit: nilai.unit,
        induk_id: nilai.induk_id ? Number(nilai.induk_id) : null,
        urutan: Number(nilai.urutan),
        aktif: nilai.aktif,
      });
      onSimpan(tersimpan, Boolean(awal));
    } catch (e2) {
      setPesan(e2.message);
    } finally {
      sedangSimpan.current = false;
      setMenyimpan(false);
    }
  }

  const umum = (nama) => ({
    id: `pengurus-${nama}`,
    name: nama,
    value: nilai[nama],
    onChange: ubah,
    error: errors[nama],
    ref: (el) => {
      refs.current[nama] = el;
    },
  });

  return (
    <form className="admin-kartu berita-form" onSubmit={kirim} noValidate aria-busy={menyimpan}>
      <h3 ref={judulRef} tabIndex={-1}>
        {awal ? 'Ubah pengurus' : 'Tambah pengurus'}
      </h3>
      <fieldset className="berita-form__grup" disabled={menyimpan}>
        <legend className="visually-hidden">Data pengurus</legend>
        <div className="berita-form__grid">
          <FormField {...umum('jabatan')} label="Jabatan" maxLength={100} hint="Contoh: Kepala Bagian Kurikulum" />
          <FormField {...umum('nama')} label="Nama" maxLength={100} />
          <FormField {...umum('unit')} as="select" label="Unit">
            {Object.entries(UNIT).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </FormField>
          <FormField {...umum('induk_id')} as="select" label="Atasan langsung" required={false}>
            <option value="">— Tanpa atasan (puncak bagan) —</option>
            {pilihanAtasan.map((p) => (
              <option key={p.id} value={p.id}>
                {'  '.repeat(p.dalam)}
                {p.dalam ? '└ ' : ''}
                {p.jabatan} — {p.nama}
              </option>
            ))}
          </FormField>
          <FormField
            {...umum('urutan')}
            label="Urutan"
            type="number"
            inputMode="numeric"
            min={0}
            max={999}
            hint="Urutan di antara rekan satu atasan (kecil = kiri/atas)."
          />
        </div>
        <label className="berita-form__cek">
          <input type="checkbox" name="aktif" checked={nilai.aktif} onChange={ubah} />
          Aktif (tampil di situs publik)
        </label>
      </fieldset>

      {pesan && <StatusMessage tone="error">{pesan}</StatusMessage>}

      <div className="berita-form__aksi">
        <Button type="submit" variant="dark" disabled={menyimpan}>
          {menyimpan ? 'Menyimpan…' : 'Simpan'}
        </Button>
        <Button variant="ghost-dark" onClick={onBatal} disabled={menyimpan}>
          Batal
        </Button>
      </div>
    </form>
  );
}
