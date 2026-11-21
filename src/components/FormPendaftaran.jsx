import { useEffect, useMemo, useRef, useState } from 'react';
import FormField from './FormField.jsx';
import Button from './Button.jsx';
import StatusMessage from './StatusMessage.jsx';
import {
  JENJANG,
  NILAI_AWAL,
  URUTAN_FIELD,
  batasTanggalLahir,
  validasiField,
  validasiPendaftar,
} from '../utils/validasi.js';
import { kirimPendaftaran } from '../lib/pendaftaran.js';
import '../styles/FormPendaftaran.css';

export default function FormPendaftaran() {
  const [nilai, setNilai] = useState(NILAI_AWAL);
  const [errors, setErrors] = useState({});
  // status: 'isi' → 'mengirim' → 'sukses' | kembali 'isi' dengan pesanGagal
  const [status, setStatus] = useState('isi');
  const [pesanGagal, setPesanGagal] = useState('');
  const [nomor, setNomor] = useState('');

  // Ref untuk tiap kontrol, dipakai memfokus error pertama.
  const refs = useRef({});
  const daftarRef = (nama) => (el) => {
    refs.current[nama] = el;
  };
  // Kunci sinkron anti kirim ganda: state `status` baru berubah setelah render,
  // sedangkan klik ganda cepat bisa terjadi sebelum itu.
  const sedangKirim = useRef(false);
  const suksesRef = useRef(null);

  const batas = useMemo(() => batasTanggalLahir(), []);

  useEffect(() => {
    if (status === 'sukses') suksesRef.current?.focus();
  }, [status]);

  function ubah(e) {
    const { name, value } = e.target;
    const baru = { ...nilai, [name]: value };
    setNilai(baru);
    // Error yang sudah tampil diperbarui saat mengetik, agar hilang begitu benar.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validasiField(name, baru) }));
  }

  function tinggalkan(e) {
    // Validasi saat meninggalkan isian yang sudah diisi (tidak mengganggu saat baru mulai).
    const { name, value } = e.target;
    if (value.trim()) setErrors((prev) => ({ ...prev, [name]: validasiField(name, nilai) }));
  }

  async function kirim(e) {
    e.preventDefault();
    if (sedangKirim.current) return;

    const hasilValidasi = validasiPendaftar(nilai);
    setErrors(hasilValidasi);
    const pertama = URUTAN_FIELD.find((f) => hasilValidasi[f]);
    if (pertama) {
      setPesanGagal('');
      refs.current[pertama]?.focus();
      return;
    }

    sedangKirim.current = true;
    setStatus('mengirim');
    setPesanGagal('');
    try {
      const no = await kirimPendaftaran(nilai);
      setNomor(no);
      setStatus('sukses');
    } catch (err) {
      setPesanGagal(err.message);
      setStatus('isi');
    } finally {
      sedangKirim.current = false;
    }
  }

  function daftarLagi() {
    setNilai(NILAI_AWAL);
    setErrors({});
    setNomor('');
    setStatus('isi');
    // Fokus kembali ke isian pertama setelah formulir dirender ulang.
    requestAnimationFrame(() => refs.current.nama?.focus());
  }

  if (status === 'sukses') {
    return (
      <div className="form-daftar form-daftar--sukses" role="status">
        <h3 ref={suksesRef} tabIndex={-1}>
          Pendaftaran berhasil terkirim
        </h3>
        <p>Simpan nomor pendaftaran berikut. Panitia akan menghubungi wali melalui nomor HP yang didaftarkan.</p>
        <p className="form-daftar__nomor">
          <span className="form-daftar__nomor-label">Nomor pendaftaran</span>
          <strong>{nomor}</strong>
        </p>
        <Button variant="dark" onClick={daftarLagi}>
          Daftarkan santri lain
        </Button>
      </div>
    );
  }

  const jumlahError = Object.values(errors).filter(Boolean).length;
  const mengirim = status === 'mengirim';
  const umum = (nama) => ({
    id: nama,
    value: nilai[nama],
    onChange: ubah,
    onBlur: tinggalkan,
    error: errors[nama],
    ref: daftarRef(nama),
  });

  return (
    <form className="form-daftar" onSubmit={kirim} noValidate aria-busy={mengirim}>
      <p className="form-daftar__demo">
        <strong>Situs demo.</strong> Gunakan data fiktif.
      </p>
      <p className="form-daftar__wajib">Semua isian wajib diisi.</p>

      {jumlahError > 0 && (
        <StatusMessage tone="error">
          Ada {jumlahError} isian yang perlu diperbaiki. Lihat pesan di bawah masing-masing isian.
        </StatusMessage>
      )}

      <fieldset className="form-daftar__grup" disabled={mengirim}>
        <legend>Data calon santri</legend>
        <div className="form-daftar__grid">
          <FormField {...umum('nama')} label="Nama lengkap" autoComplete="off" maxLength={100} className="span-2" />
          <FormField {...umum('tempat_lahir')} label="Tempat lahir" autoComplete="off" maxLength={60} />
          <FormField
            {...umum('tgl_lahir')}
            label="Tanggal lahir"
            type="date"
            min={batas.min}
            max={batas.max}
            hint="Usia 9–25 tahun."
          />
          <FormField {...umum('jenjang')} as="select" label="Jenjang">
            <option value="">— Pilih jenjang —</option>
            {JENJANG.map((j) => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
            ))}
          </FormField>
          <FormField
            {...umum('asal_sekolah')}
            label="Asal sekolah"
            autoComplete="off"
            maxLength={100}
            hint="Contoh: SD Contoh 1"
          />
        </div>
      </fieldset>

      <fieldset className="form-daftar__grup" disabled={mengirim}>
        <legend>Data wali</legend>
        <div className="form-daftar__grid">
          <FormField {...umum('nama_wali')} label="Nama wali" autoComplete="name" maxLength={100} />
          <FormField
            {...umum('hp_wali')}
            label="Nomor HP wali"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            hint="Format 08xxxxxxxxxx."
          />
          <FormField
            {...umum('alamat')}
            as="textarea"
            label="Alamat"
            autoComplete="street-address"
            maxLength={300}
            rows={3}
            className="span-2"
          />
        </div>
      </fieldset>

      {pesanGagal && <StatusMessage tone="error">{pesanGagal}</StatusMessage>}

      <div className="form-daftar__aksi">
        <Button type="submit" variant="dark" disabled={mengirim}>
          {mengirim ? 'Mengirim…' : 'Kirim Pendaftaran'}
        </Button>
      </div>
    </form>
  );
}
