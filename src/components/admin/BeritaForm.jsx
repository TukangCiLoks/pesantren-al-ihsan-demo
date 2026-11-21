import { useEffect, useRef, useState } from 'react';
import FormField from '../FormField.jsx';
import Button from '../Button.jsx';
import StatusMessage from '../StatusMessage.jsx';
import { URUTAN_BERITA, validasiBerita } from '../../utils/validasi.js';
import { simpanBerita } from '../../lib/admin.js';

/** Formulir tambah/ubah berita. `awal` null = berita baru. */
export default function BeritaForm({ awal, onSimpan, onBatal }) {
  const [nilai, setNilai] = useState({
    judul: awal?.judul ?? '',
    kategori: awal?.kategori ?? '',
    ringkasan: awal?.ringkasan ?? '',
    isi: awal?.isi ?? '',
    dipublikasi: awal?.dipublikasi ?? false,
  });
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');
  const [menyimpan, setMenyimpan] = useState(false);
  const sedangSimpan = useRef(false);
  const refs = useRef({});
  const judulRef = useRef(null);

  // Pindahkan fokus ke formulir saat dibuka.
  useEffect(() => {
    judulRef.current?.focus();
  }, []);

  function ubah(e) {
    const { name, value, type, checked } = e.target;
    const baru = { ...nilai, [name]: type === 'checkbox' ? checked : value };
    setNilai(baru);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validasiBerita(baru)[name] }));
  }

  async function kirim(e) {
    e.preventDefault();
    if (sedangSimpan.current) return;
    const err = validasiBerita(nilai);
    setErrors(err);
    const pertama = URUTAN_BERITA.find((f) => err[f]);
    if (pertama) return refs.current[pertama]?.focus();

    sedangSimpan.current = true;
    setMenyimpan(true);
    setPesan('');
    try {
      const tersimpan = await simpanBerita({
        id: awal?.id,
        judul: nilai.judul.trim(),
        kategori: nilai.kategori.trim() || null,
        ringkasan: nilai.ringkasan.trim() || null,
        isi: nilai.isi.trim(),
        dipublikasi: nilai.dipublikasi,
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
    id: `berita-${nama}`,
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
        {awal ? 'Ubah berita' : 'Tambah berita'}
      </h3>
      <fieldset className="berita-form__grup" disabled={menyimpan}>
        <legend className="visually-hidden">Isi berita</legend>
        <div className="berita-form__grid">
          <FormField {...umum('judul')} label="Judul" maxLength={160} className="span-2" />
          <FormField {...umum('kategori')} label="Kategori (opsional)" maxLength={40} required={false} hint="Contoh: Pengumuman, Kegiatan" />
          <FormField
            {...umum('ringkasan')}
            as="textarea"
            rows={2}
            label="Ringkasan (opsional)"
            maxLength={300}
            required={false}
            className="span-2"
          />
          <FormField
            {...umum('isi')}
            as="textarea"
            rows={8}
            label="Isi berita"
            maxLength={20000}
            hint="Teks biasa. Pisahkan paragraf dengan satu baris kosong. HTML tidak diproses."
            className="span-2"
          />
        </div>
        <label className="berita-form__cek">
          <input type="checkbox" name="dipublikasi" checked={nilai.dipublikasi} onChange={ubah} />
          Terbitkan (tampil di situs publik)
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
