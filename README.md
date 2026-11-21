# Pesantren Al-Ihsan (Demo)

Situs portofolio untuk pesantren **fiktif**. Semua nama, alamat, dan data adalah contoh;
tidak ada nama, logo, teks, atau foto dari pesantren nyata.

**Stack:** Vite 6 + React 18 (JavaScript) · React Router v6 · Supabase (Postgres + Auth)
lewat `@supabase/supabase-js` v2 · CSS biasa (tanpa Tailwind, library UI, atau library animasi)
· deploy di Vercel.

## Fitur

- **Situs instansi ±30 halaman** dengan menu bertingkat (menu › submenu › sub-submenu), bar atas
  berisi kontak & ikon media sosial, breadcrumb, dan footer peta situs.
  - **Profil:** sejarah (linimasa), visi & misi, struktur organisasi (bagan dari database),
    pengasuh & asatidz, 4 halaman fasilitas berilustrasi.
  - **Pendidikan:** SMP, SMA, Tahfidz (kurikulum + jadwal harian), ekstrakurikuler, kalender akademik.
  - **Informasi:** berita & pengumuman (cari, filter kategori, paginasi), agenda (mendatang/lewat),
    detail dengan tombol Bagikan, galeri, unduhan PDF.
  - **PPDB:** alur, syarat, biaya, formulir online, FAQ. **Kontak** dengan kartu media sosial.
- **Pendaftaran online:** validasi klien, nomor `PSN-2026-0001` dari server, pencegahan
  kirim ganda, pesan ramah untuk error server/jaringan.
- **Panel admin** (`/admin`, dimuat lazy): kelola pendaftar, berita/pengumuman/agenda, dan
  struktur organisasi.
- **Mode terang/gelap/ikuti sistem** dengan token warna semantik; kontras ≥ 4,5:1 di kedua mode.
- **Enam animasi CSS** (Ken Burns, text reveal, CTA berdenyut, scroll reveal, hover, counter),
  semuanya mati bila `prefers-reduced-motion: reduce`. Semua tanggal & jam ditampilkan dalam WIB.

## Struktur

```
src/
  main.jsx, App.jsx           rute (dari data/menu.js); halaman konten & admin lewat React.lazy
  lib/                        supabase.js (klien tunggal), berita.js, pengurus.js, pendaftaran.js, admin.js
  hooks/                      useReveal, useCountUp, useReducedMotion, useAuth, useTema, useMediaQuery, …
  components/                 kerangka (Header, NavUtama, TopBar, Footer, PageHeader, Halaman), komponen isi, admin/
  pages/                      Beranda, Kontak, profil/, pendidikan/, informasi/, ppdb/, admin
  styles/                     tokens.css (palet + token semantik), global.css, satu file per komponen
  data/                       menu.js, konten.js, profil.js, pendidikan.js, ppdb.js, unduhan.js, data contoh
  utils/                      menu.js, pohon.js, validasi.js, format.js
sql/schema.sql                tabel inti, trigger, RPC, GRANT, RLS, seed
sql/002_pengurus.sql          struktur organisasi
sql/003_informasi.sql         jenis berita/pengumuman/agenda
scripts/                      uji-rls.mjs, buat-pdf-contoh.mjs, audit-kontras.browser.js
public/unduhan/               PDF contoh
```

## 1. Setup Supabase

1. Buat proyek di [supabase.com](https://supabase.com).
2. **Jalankan skema:** Dashboard › SQL Editor › New query → tempel seluruh isi
   [`sql/schema.sql`](sql/schema.sql) → Run. File ini aman dijalankan ulang.
3. **Tutup pendaftaran akun:** Authentication › Sign In / Providers → matikan
   *Allow new users to sign up*. Admin dibuat manual, bukan lewat daftar sendiri.
4. **Buat akun admin:** Authentication › Users › Add user › Create new user
   (email + password, centang *Auto Confirm User*).
5. **Tandai sebagai admin** di SQL Editor (email langkah 4, huruf kecil):
   ```sql
   insert into public.admin_emails (email) values ('email-admin-anda@contoh.com');
   ```
6. **Jalankan migrasi Struktur Organisasi:** SQL Editor › New query → tempel seluruh isi
   [`sql/002_pengurus.sql`](sql/002_pengurus.sql) → Run (setelah `schema.sql`). Membuat tabel
   `pengurus` beserta RLS, pengaman bentuk bagan, dan susunan pengurus contoh. Aman dijalankan ulang.
7. **Jalankan migrasi Informasi:** tempel isi [`sql/003_informasi.sql`](sql/003_informasi.sql) → Run.
   Menambah kolom `jenis` (berita/pengumuman/agenda), `tanggal_acara`, dan `lokasi` ke tabel
   `berita`, plus pengumuman & agenda contoh. **Wajib** sebelum memakai versi situs ini:
   tanpa kolom `jenis`, daftar berita menampilkan pesan "Kolom informasi belum dibuat".

## 2. Isi `.env.local`

Salin `.env.example` menjadi `.env.local`, lalu isi dari Project Settings › API
(atau tombol *Connect*):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=kunci-anon-atau-publishable
```

Hanya kunci **anon/publishable**. Jangan pernah memakai `service_role` di proyek ini.
`.env.local` sudah ada di `.gitignore`.

## 3. Menjalankan lokal

Butuh Node.js 20+ (diuji dengan Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # hasil di dist/
npm run preview    # menjalankan hasil build
npm run uji:rls    # uji RLS (butuh .env.local)
node scripts/buat-pdf-contoh.mjs   # buat ulang PDF contoh di public/unduhan/
```

Tanpa `.env.local`, situs tetap tampil: berita dan bagan struktur memakai data contoh
berlabel "Contoh", sedangkan formulir dan admin menampilkan pesan "Supabase belum dikonfigurasi".

## 4. Panel admin

1. Buka `/admin/login` (tautan **Admin** ada di footer).
2. Masuk dengan akun dari langkah Setup 4–5.
3. Tab **Pendaftar**: filter status, ubah status (baru → diverifikasi → diterima/ditolak),
   hapus lewat dialog konfirmasi.
4. Tab **Berita**: filter jenis (berita/pengumuman/agenda), *+ Tambah*, *Ubah*, *Terbitkan/Tarik*,
   *Hapus*. Agenda wajib diberi tanggal & jam acara (WIB), lokasi opsional. Isi berupa teks biasa;
   pisahkan paragraf dengan satu baris kosong. HTML tidak diproses.
5. Tab **Struktur**: pilih unit (Yayasan / Pimpinan / Unit Pendidikan), tambah atau ubah
   pengurus beserta atasan langsungnya, nonaktifkan (tidak tampil di situs) atau hapus.
   Bawahan dari pengurus yang dihapus otomatis menjadi puncak bagan. Server menolak susunan
   yang melingkar atau atasan dari unit lain.

Akun yang bisa login tetapi tidak ada di `admin_emails` hanya melihat "Akses ditolak".

## Model keamanan

| Peran | `pendaftar` | `berita` | `admin_emails` |
|---|---|---|---|
| Pengunjung (anon) | INSERT saja (lewat RPC `daftar_santri`) | SELECT yang `dipublikasi` | — |
| Login, bukan admin | INSERT saja | SELECT yang `dipublikasi` | — |
| Admin (`is_admin()`) | SELECT, UPDATE, DELETE | SELECT semua, INSERT, UPDATE, DELETE | — |

- **Dua lapis:** GRANT menentukan peran mana yang boleh menyentuh tabel; RLS menentukan
  baris mana. Anon bahkan tidak punya hak SELECT atas `pendaftar`, jadi permintaan baca
  langsung ditolak (`permission denied`), bukan sekadar mengembalikan 0 baris.
- **Nomor pendaftaran** dibuat trigger di server dari sebuah sequence, jadi tidak bisa
  dipalsukan klien dan tidak bentrok saat pendaftaran bersamaan. Status baru selalu `baru`.
- **`daftar_santri()`** (`SECURITY DEFINER`) memasukkan data lalu hanya mengembalikan
  nomor pendaftaran; tanpanya anon tidak bisa mengetahui nomornya.
- **Admin** dikenali dari email di JWT yang tercantum di `admin_emails`. Sekadar login tidak cukup.
- **`ProtectedRoute`** hanya untuk pengalaman pengguna: tanpa sesi admin, dashboard tidak
  dirender dan tidak ada data yang diminta. Perlindungan data sesungguhnya tetap RLS.
- **Tidak ada `dangerouslySetInnerHTML`.** Semua data database dirender sebagai teks JSX.

## Menguji RLS

**Dari sisi pengunjung (kunci anon, seperti browser):**
```bash
npm run uji:rls
```
Memeriksa bahwa anon bisa mendaftar tetapi tidak bisa membaca/mengubah/menghapus
pendaftar, hanya melihat berita terbit, tidak bisa menambah berita, dan tidak bisa membaca
`admin_emails`. Skrip membuat 2 pendaftar uji bernama "Uji RLS Otomatis" (hapus lewat panel admin).

**Langsung di SQL Editor:**
```sql
begin;
set local role anon;
select count(*) from public.pendaftar;   -- ERROR: permission denied for table pendaftar
select count(*) from public.berita;      -- hanya berita terbit
rollback;
```

## 5. Deploy ke Vercel

1. Push repo ke GitHub, lalu di Vercel: *Add New › Project* → impor repo.
2. Framework preset **Vite** (Build Command `npm run build`, Output Directory `dist`).
3. *Environment Variables*: tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
   (nilai sama dengan `.env.local`), lalu Deploy.
4. [`vercel.json`](vercel.json) me-rewrite semua rute ke `index.html`, jadi membuka
   langsung `/berita/1` atau `/admin` tidak menghasilkan 404.

Variabel `VITE_*` ditanam ke JavaScript saat build: setelah mengubahnya di Vercel, lakukan
*Redeploy*. Kunci anon memang publik; keamanan bergantung pada RLS, bukan kerahasiaan kunci.

## Kualitas

- **Kontras** (dihitung, lihat komentar di `tokens.css`): semua pasangan ≥ 4,5:1;
  `--slate-2` hanya untuk teks ≥ 14px. Tepi isian formulir memakai `--slate-2` (≥ 3:1).
- **Font** (diukur di beranda, Chrome): ±258 KB woff2; Amiri (subset Arab) ±125 KB
  di antaranya. Cinzel dimuat dengan `&text=` (±2 KB).
- **Bundle:** kode panel admin terpisah (±4 KB gzip) dan tidak diunduh pengunjung biasa.
- **Lighthouse:** jalankan di Chrome DevTools › Lighthouse pada hasil `npm run preview`
  atau URL Vercel. Belum diukur di proyek ini.
- **Reduced motion:** DevTools › Rendering › *Emulate CSS prefers-reduced-motion: reduce*.

## Keterbatasan (demo)

- Nomor urut berlanjut lintas tahun (tidak kembali ke 0001 setiap Januari).
- Formulir publik tidak dibatasi laju pengiriman; situs sungguhan perlu captcha atau
  pembatasan di Edge Function.
- Belum ada gambar Open Graph (`og:image`).
