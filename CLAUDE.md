# CLAUDE.md — Pesantren Al-Ihsan (Demo)

Situs demo untuk portofolio. Pesantren-nya **fiktif**: jangan memakai nama, logo, teks, atau foto
pesantren nyata. Semua data adalah dummy.

## Stack

- Vite 6 + React 18 (JavaScript, bukan TypeScript), React Router v6 (`BrowserRouter`)
- @supabase/supabase-js v2 (Postgres + Auth)
- CSS biasa: `src/styles/tokens.css` (variabel), `global.css` (dasar + aturan gerak), satu file CSS per komponen
- Deploy: **Vercel** (`vercel.json` me-rewrite semua rute ke `index.html`)

**Jangan menambah:** Tailwind, library UI, library animasi (GSAP, Framer Motion, AOS, dll.).
Dependensi baru harus ditanyakan dulu.

## Struktur

- `src/lib/supabase.js` — klien tunggal (null bila env kosong); `berita.js`, `pendaftaran.js`,
  `admin.js` — akses data; `pesanError.js` — pesan error bersama
- `src/hooks/` — `useReveal`, `useCountUp`, `useReducedMotion`, `useAuth`, `useDocumentTitle`
- Area admin (`AdminLayout`, `AdminLogin`, `AdminDashboard`) dimuat lewat `React.lazy`;
  `ProtectedRoute` merender dashboard hanya untuk sesi yang lolos `is_admin()`
- Elemen `.visually-hidden` di dalam wadah gulir butuh induk `position: relative`
  (lihat `.tabel-wrap`), kalau tidak halaman ikut melebar
- `src/components/`, `src/pages/`, `src/data/konten.js` (konten statis dummy), `src/utils/`
- `sql/schema.sql` — tabel, RLS, RPC, seed
- `public/` — aset statis (favicon). `src/public/` kosong dan tidak dipakai Vite.
- `design source/` — bahan referensi, baca saja

## Desain

### Palet (hanya ini, didefinisikan di `tokens.css`)
`--navy #0B1F3A`, `--navy-2 #14325C`, `--white #FFFFFF`, `--white-soft #F8FAFC`, `--slate #475569`,
`--slate-2 #64748B` (hanya teks ≥14px), `--slate-line #E2E8F0`; status: `--error #B91C1C`, `--success #166534`.
Turunan transparan navy/putih boleh (bayangan, overlay, cincin). Jangan menulis kode warna di komponen.
Teks di latar navy selalu putih. Kontras minimal 4,5:1 (teks besar 3:1).

### Tipografi
| Peran | Font | Variabel |
|---|---|---|
| Judul H1–H3 | Playfair Display 600/700 | `--font-heading` |
| Logo/wordmark **saja** | Cinzel 600 (subset `&text=`) | `--font-logo` |
| Sub-judul, menu, tombol, label, kategori, tanggal | Lato 400/700 (tidak ada 500/600) | `--font-sub` |
| Isi paragraf | Open Sans 400/600 | `--font-body` |
| Arab (basmalah, ayat, doa) | Amiri 400/700, `lang="ar" dir="rtl"`, ~1.25×, line-height ~2 | `--font-arab` |

Ukuran pakai `clamp()`, body ≥16px. Maksimal dua gaya font dalam satu paragraf.

### Enam animasi yang disetujui (hanya ini)
1. **Ken Burns** — `.hero__bg`, keyframes `ken-burns` 20s alternate, scale 1→1,15 + geser (`Hero.css`)
2. **Text reveal** — `.hero__anim` + `--d` (0/180/360/540/720ms), keyframes `fade-up` 32px 1,1 dtk (`Hero.css`)
3. **CTA berdenyut** — `.btn--pulse::after`, keyframes `cta-pulse`; varian putih di hero, navy di latar terang (`Button.css`)
4. **Scroll reveal** — komponen `Reveal` (`arah`: atas/kiri/kanan, `delay`) + `useReveal`; dipakai di judul
   bagian, kartu program/berita/galeri, pita ayat, langkah alur (`global.css`). Bagian memakai
   `overflow-x: clip` agar reveal kiri/kanan tidak membuat scroll horizontal.
5. **Hover** — `.card--interaktif` naik 4px + bayangan via `::after` opacity; `.thumb__img` scale 1.05;
   `.btn` naik 2px; garis bawah menu `scaleX` dari tengah; warna tautan → `--navy-2` tanpa transisi
   (`Card.css`, `BeritaCard.css`, `Button.css`, `Header.css`)
6. **Counter** — `useCountUp` (rAF, easeOutCubic, 1,6 dtk) di `Stats.jsx`

Overlay hero: mulai 1100px gradasi kiri→kanan (pekat ≥0,86 sampai 62% lebar, tempat teks berakhir);
di bawah itu overlay rata. Jangan membuka overlay di area teks.

Tanpa Supabase (`.env.local` kosong), berita memakai `src/data/beritaContoh.js` berlabel "Contoh";
begitu terhubung, berita selalu dari tabel. Teks ayat di `data/konten.js` (`AYAT`) perlu diverifikasi manusia.

Aturan: hanya `transform` dan `opacity` yang dianimasikan. Keadaan awal animasi hanya ditulis di dalam
`@media (prefers-reduced-motion: no-preference)`; `reduce` mematikan semuanya dan counter langsung angka akhir.
Dilarang: parallax, video background, partikel, 3D, smooth-scroll.

## Supabase & keamanan (wajib)

- Hanya kunci **anon** di front-end; **jangan pernah** `service_role`. Kredensial hanya di `.env.local`
  (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), tidak pernah di kode.
- RLS aktif di semua tabel. Anon: INSERT `pendaftar` saja (tanpa SELECT/UPDATE/DELETE), SELECT `berita`
  yang dipublikasi. Admin = `is_admin()` (email JWT ada di tabel `admin_emails`), bukan sekadar `authenticated`.
- Formulir mendaftar lewat RPC `daftar_santri()` (SECURITY DEFINER) yang mengembalikan `no_pendaftaran`
  (`PSN-<tahun>-0001`), karena anon tidak boleh membaca balik barisnya.
- **Data dari database tidak boleh masuk lewat `dangerouslySetInnerHTML`.** Render sebagai teks JSX
  (isi berita dipecah per paragraf dengan `pecahParagraf`).

## Cara bekerja

1. Rencana dulu, **tunggu persetujuan** sebelum menulis kode.
2. Bertahap: **(a)** scaffolding + tokens + halaman publik + animasi, **(b)** `sql/schema.sql`,
   **(c)** formulir pendaftaran, **(d)** panel admin. Setelah tiap tahap: cara menguji + satu pesan commit.
   Commit dijalankan oleh pemilik proyek kecuali diminta.
3. Jelaskan tiap keputusan penting (hook, state, routing, RLS) dalam 1–2 kalimat.
4. Terus terang bila tidak yakin; tanya, jangan menebak. Bahasa komunikasi: Indonesia.

## Checklist sebelum menyerahkan

- [ ] `npm run build` sukses
- [ ] Hanya warna/font dari token; Cinzel hanya di logo
- [ ] Tidak ada animasi di luar enam di atas; reduced-motion dihormati
- [ ] Tidak ada `service_role`/kredensial di kode; tidak ada `dangerouslySetInnerHTML` untuk data DB
- [ ] Rapi di 360px dan 1280px, tanpa scroll horizontal
