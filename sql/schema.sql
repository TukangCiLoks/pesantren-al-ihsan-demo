-- ═══════════════════════════════════════════════════════════════════════
-- Pesantren Al-Ihsan (Demo) — skema Supabase
-- Jalankan seluruh file ini di Supabase Dashboard › SQL Editor.
-- Aman dijalankan ulang (idempotent): tabel/kebijakan/fungsi dibuat ulang
-- tanpa menghapus data.
--
-- Keamanan dua lapis:
--   1. GRANT  — peran mana yang boleh menyentuh tabel sama sekali.
--   2. RLS    — baris mana yang boleh dibaca/diubah oleh peran itu.
-- Kalau salah satu lapis keliru, lapis lain masih menahan.
-- ═══════════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────────────
-- 1. TABEL
-- ───────────────────────────────────────────────────────────────────────

create table if not exists public.pendaftar (
  id              uuid primary key default gen_random_uuid(),
  no_pendaftaran  text not null unique,
  nama            text not null check (char_length(nama) between 3 and 100),
  tempat_lahir    text not null check (char_length(tempat_lahir) between 2 and 60),
  tgl_lahir       date not null check (tgl_lahir >= date '1980-01-01'),
  jenjang         text not null check (jenjang in ('SMP', 'SMA', 'Tahfidz')),
  nama_wali       text not null check (char_length(nama_wali) between 3 and 100),
  hp_wali         text not null check (hp_wali ~ '^08[0-9]{8,11}$'),
  alamat          text not null check (char_length(alamat) between 10 and 300),
  asal_sekolah    text not null check (char_length(asal_sekolah) between 3 and 100),
  status          text not null default 'baru'
                  check (status in ('baru', 'diverifikasi', 'diterima', 'ditolak')),
  created_at      timestamptz not null default now()
);

create index if not exists pendaftar_status_created_idx
  on public.pendaftar (status, created_at desc);

create table if not exists public.berita (
  id          bigint generated always as identity primary key,
  judul       text not null check (char_length(judul) between 5 and 160),
  ringkasan   text check (char_length(ringkasan) <= 300),
  isi         text not null check (char_length(isi) between 10 and 20000),
  kategori    text check (char_length(kategori) <= 40),
  dipublikasi boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists berita_publik_idx
  on public.berita (dipublikasi, created_at desc);

-- Daftar email admin. Diisi manual lewat SQL Editor (lihat README), tidak
-- pernah lewat front-end.
create table if not exists public.admin_emails (
  email text primary key check (email = lower(email))
);


-- ───────────────────────────────────────────────────────────────────────
-- 2. NOMOR PENDAFTARAN (PSN-2026-0001)
-- Dibuat oleh trigger, bukan oleh klien, sehingga tidak bisa dipalsukan
-- dan tidak bentrok walau dua orang mendaftar bersamaan (sequence atomik).
-- ───────────────────────────────────────────────────────────────────────

create sequence if not exists public.pendaftar_seq;

create or replace function public.set_data_pendaftar()
returns trigger
language plpgsql
security definer            -- anon tidak perlu hak atas sequence
set search_path = public
as $$
declare
  n bigint := nextval('public.pendaftar_seq');
begin
  new.no_pendaftaran := format(
    'PSN-%s-%s',
    to_char(now() at time zone 'Asia/Jakarta', 'YYYY'),
    lpad(n::text, greatest(4, char_length(n::text)), '0')  -- 0001 … 9999, 10000, …
  );
  new.status     := 'baru';   -- pendaftar baru selalu berstatus 'baru'
  new.created_at := now();
  return new;
end;
$$;

drop trigger if exists pendaftar_before_insert on public.pendaftar;
create trigger pendaftar_before_insert
  before insert on public.pendaftar
  for each row execute function public.set_data_pendaftar();


-- ───────────────────────────────────────────────────────────────────────
-- 3. FUNGSI ADMIN
-- SECURITY DEFINER supaya bisa membaca admin_emails walau klien tidak
-- punya akses ke tabel itu.
-- ───────────────────────────────────────────────────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;


-- ───────────────────────────────────────────────────────────────────────
-- 4. RPC PENDAFTARAN
-- Anon tidak boleh SELECT pendaftar, jadi tidak bisa membaca balik nomor
-- pendaftarannya setelah INSERT biasa. Fungsi ini melakukan INSERT lalu
-- hanya mengembalikan nomor itu — tidak ada data lain yang bocor.
-- ───────────────────────────────────────────────────────────────────────

create or replace function public.daftar_santri(
  p_nama          text,
  p_tempat_lahir  text,
  p_tgl_lahir     date,
  p_jenjang       text,
  p_nama_wali     text,
  p_hp_wali       text,
  p_alamat        text,
  p_asal_sekolah  text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_no text;
begin
  -- Usia calon santri 9–25 tahun. Dicek di sini (bukan CHECK) karena
  -- bergantung pada tanggal hari ini.
  if p_tgl_lahir is null
     or p_tgl_lahir > (current_date - interval '9 years')
     or p_tgl_lahir < (current_date - interval '25 years') then
    raise exception 'Tanggal lahir di luar rentang usia 9–25 tahun.'
      using errcode = '22023';
  end if;

  insert into public.pendaftar
    (nama, tempat_lahir, tgl_lahir, jenjang, nama_wali, hp_wali, alamat, asal_sekolah)
  values
    (trim(p_nama), trim(p_tempat_lahir), p_tgl_lahir, p_jenjang,
     trim(p_nama_wali), trim(p_hp_wali), trim(p_alamat), trim(p_asal_sekolah))
  returning no_pendaftaran into v_no;

  return v_no;
end;
$$;


-- ───────────────────────────────────────────────────────────────────────
-- 5. GRANT (lapis 1)
-- Supabase memberi anon/authenticated akses penuh ke tabel public secara
-- bawaan. Kita cabut dulu, lalu beri hanya yang perlu.
-- ───────────────────────────────────────────────────────────────────────

revoke all on public.pendaftar, public.berita, public.admin_emails from anon, authenticated;
revoke all on sequence public.pendaftar_seq from anon, authenticated;

-- pendaftar: anon hanya INSERT; admin (authenticated + RLS) baca/ubah/hapus
grant insert                         on public.pendaftar to anon, authenticated;
grant select, update, delete         on public.pendaftar to authenticated;

-- berita: semua boleh membaca (RLS menyaring), admin mengelola
grant select                         on public.berita to anon, authenticated;
grant insert, update, delete         on public.berita to authenticated;

-- admin_emails: tidak ada grant untuk klien sama sekali.

-- Fungsi: secara bawaan EXECUTE diberikan ke PUBLIC — cabut, lalu beri eksplisit.
revoke execute on function public.set_data_pendaftar() from public, anon, authenticated;
revoke execute on function public.is_admin() from public;
revoke execute on function public.daftar_santri(text, text, date, text, text, text, text, text) from public;
grant  execute on function public.is_admin() to anon, authenticated;
grant  execute on function public.daftar_santri(text, text, date, text, text, text, text, text)
  to anon, authenticated;


-- ───────────────────────────────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY (lapis 2)
-- Tanpa kebijakan yang cocok, RLS menolak semuanya (deny by default).
-- ───────────────────────────────────────────────────────────────────────

alter table public.pendaftar    enable row level security;
alter table public.berita       enable row level security;
alter table public.admin_emails enable row level security;

-- pendaftar ------------------------------------------------------------
drop policy if exists "pengunjung boleh mendaftar"      on public.pendaftar;
drop policy if exists "admin membaca pendaftar"         on public.pendaftar;
drop policy if exists "admin mengubah pendaftar"        on public.pendaftar;
drop policy if exists "admin menghapus pendaftar"       on public.pendaftar;

create policy "pengunjung boleh mendaftar" on public.pendaftar
  for insert to anon, authenticated
  with check (status = 'baru');

create policy "admin membaca pendaftar" on public.pendaftar
  for select to authenticated
  using (public.is_admin());

create policy "admin mengubah pendaftar" on public.pendaftar
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin menghapus pendaftar" on public.pendaftar
  for delete to authenticated
  using (public.is_admin());

-- berita ---------------------------------------------------------------
drop policy if exists "publik membaca berita terbit"    on public.berita;
drop policy if exists "admin membaca semua berita"      on public.berita;
drop policy if exists "admin menambah berita"           on public.berita;
drop policy if exists "admin mengubah berita"           on public.berita;
drop policy if exists "admin menghapus berita"          on public.berita;

create policy "publik membaca berita terbit" on public.berita
  for select to anon, authenticated
  using (dipublikasi);

create policy "admin membaca semua berita" on public.berita
  for select to authenticated
  using (public.is_admin());

create policy "admin menambah berita" on public.berita
  for insert to authenticated
  with check (public.is_admin());

create policy "admin mengubah berita" on public.berita
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin menghapus berita" on public.berita
  for delete to authenticated
  using (public.is_admin());

-- admin_emails: sengaja TIDAK ada kebijakan → klien tidak bisa apa-apa.


-- ───────────────────────────────────────────────────────────────────────
-- 7. SEED — 3 berita dummy (2 terbit, 1 draf). Hanya bila tabel kosong.
-- ───────────────────────────────────────────────────────────────────────

insert into public.berita (judul, ringkasan, isi, kategori, dipublikasi, created_at)
select * from (values
  (
    'Penerimaan Santri Baru 2026/2027 Resmi Dibuka',
    'Pendaftaran jenjang SMP, SMA, dan Program Tahfidz dibuka secara online hingga akhir Juni.',
    E'Pesantren Al-Ihsan (fiktif) membuka penerimaan santri baru untuk tahun ajaran 2026/2027. Pendaftaran dilakukan secara online melalui formulir di situs ini.\n\nSetelah mengisi formulir, calon santri akan menerima nomor pendaftaran. Panitia akan menghubungi wali melalui nomor HP yang didaftarkan untuk jadwal tes dan wawancara.\n\nCatatan: ini adalah situs demo. Gunakan data fiktif saat mencoba formulir.',
    'Pengumuman',
    true,
    now() - interval '2 days'
  ),
  (
    'Wisuda Tahfidz Angkatan Ke-12',
    'Sebanyak 48 santri menuntaskan hafalan dan mengikuti prosesi wisuda tahfidz di masjid pesantren.',
    E'Prosesi wisuda tahfidz angkatan ke-12 berlangsung khidmat di masjid pesantren. Para wisudawan sebelumnya telah melalui ujian hafalan di hadapan dewan penguji.\n\nAcara ditutup dengan doa bersama dan ramah tamah bersama para wali santri.',
    'Kegiatan',
    true,
    now() - interval '9 days'
  ),
  (
    'Draf: Jadwal Libur Semester Genap',
    'Draf pengumuman jadwal libur. Belum dipublikasikan.',
    E'Jadwal libur semester genap masih menunggu keputusan rapat pengurus.\n\nBerita ini sengaja belum dipublikasikan untuk menguji bahwa pengunjung tidak dapat melihat draf.',
    'Pengumuman',
    false,
    now() - interval '1 day'
  )
) as seed (judul, ringkasan, isi, kategori, dipublikasi, created_at)
where not exists (select 1 from public.berita);
