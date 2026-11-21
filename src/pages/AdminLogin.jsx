import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { isSupabaseConfigured } from '../lib/supabase.js';
import { masuk } from '../lib/admin.js';
import { PESAN_JARINGAN } from '../lib/pesanError.js';

export default function AdminLogin() {
  useDocumentTitle('Masuk Admin');
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const tujuan = location.state?.dari || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');
  const [mengirim, setMengirim] = useState(false);
  const sedangKirim = useRef(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Sudah masuk? Langsung ke dashboard.
  if (!loading && session) return <Navigate to={tujuan} replace />;

  async function kirim(e) {
    e.preventDefault();
    if (sedangKirim.current) return;

    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) err.email = 'Masukkan alamat email yang valid.';
    if (!password) err.password = 'Kata sandi wajib diisi.';
    setErrors(err);
    if (err.email) return emailRef.current?.focus();
    if (err.password) return passwordRef.current?.focus();

    sedangKirim.current = true;
    setMengirim(true);
    setPesan('');
    let gagal = PESAN_JARINGAN;
    try {
      const { error } = await masuk(email.trim(), password);
      if (!error) return navigate(tujuan, { replace: true });
      // Pesan sengaja tidak membedakan email vs sandi yang salah.
      if (error.status === 400) gagal = 'Email atau kata sandi salah.';
    } catch {
      // gagal tetap PESAN_JARINGAN
    } finally {
      sedangKirim.current = false;
      setMengirim(false);
    }
    setPesan(gagal);
    setPassword('');
    // Isian masih ter-disable sampai render berikutnya; fokus setelah itu.
    requestAnimationFrame(() => passwordRef.current?.focus());
  }

  return (
    <div className="admin-kartu admin-login">
      <h1>Masuk Admin</h1>
      <p>Khusus pengelola situs. Akun admin dibuat di Supabase Dashboard, bukan lewat pendaftaran.</p>

      {!isSupabaseConfigured && (
        <StatusMessage tone="error">Supabase belum dikonfigurasi (lihat README).</StatusMessage>
      )}

      <form onSubmit={kirim} noValidate className="admin-login__form" aria-busy={mengirim}>
        <FormField
          ref={emailRef}
          id="email"
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={mengirim}
        />
        <FormField
          ref={passwordRef}
          id="password"
          label="Kata sandi"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={mengirim}
        />
        {pesan && <StatusMessage tone="error">{pesan}</StatusMessage>}
        <Button type="submit" variant="dark" disabled={mengirim || !isSupabaseConfigured}>
          {mengirim ? 'Memeriksa…' : 'Masuk'}
        </Button>
      </form>
    </div>
  );
}
