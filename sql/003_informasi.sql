-- ═══════════════════════════════════════════════════════════════════════
-- Migrasi 003 — Informasi: berita, pengumuman, dan agenda dalam satu tabel `berita`
-- Jalankan SETELAH sql/schema.sql. Supabase › SQL Editor › New query → tempel → Run.
-- Aman dijalankan ulang. RLS/GRANT tabel berita tidak berubah (berlaku untuk kolom baru juga).
-- ═══════════════════════════════════════════════════════════════════════

-- 1. KOLOM BARU -------------------------------------------------------------------
alter table public.berita
  add column if not exists jenis text not null default 'berita',
  add column if not exists tanggal_acara timestamptz,
  add column if not exists lokasi text;

-- Batasan dibuat lewat blok DO agar tidak error saat dijalankan ulang.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'berita_jenis_check') then
    alter table public.berita
      add constraint berita_jenis_check check (jenis in ('berita', 'pengumuman', 'agenda'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'berita_lokasi_check') then
    alter table public.berita
      add constraint berita_lokasi_check check (lokasi is null or char_length(lokasi) <= 120);
  end if;
  -- Agenda wajib punya tanggal acara.
  if not exists (select 1 from pg_constraint where conname = 'berita_agenda_tanggal_check') then
    alter table public.berita
      add constraint berita_agenda_tanggal_check check (jenis <> 'agenda' or tanggal_acara is not null);
  end if;
end;
$$;

create index if not exists berita_jenis_idx on public.berita (jenis, dipublikasi, created_at desc);
create index if not exists berita_agenda_idx on public.berita (tanggal_acara) where jenis = 'agenda';


-- 2. SEED — pengumuman & agenda contoh (fiktif), hanya bila belum ada -------------------
-- Tanggal agenda relatif terhadap hari ini (WIB) supaya selalu ada yang "akan datang".
-- Jam ditulis sebagai jam dinding WIB lalu dikonversi ke timestamptz lewat `at time zone`.
insert into public.berita (judul, ringkasan, isi, kategori, jenis, tanggal_acara, lokasi, dipublikasi, created_at)
select * from (values
  (
    'Jadwal Daftar Ulang Santri Lama',
    'Daftar ulang santri lama dibuka selama dua pekan sebelum tahun ajaran baru.',
    E'Daftar ulang santri lama dilakukan di kantor tata usaha pada jam layanan.\n\nWali dimohon membawa kartu santri dan bukti pembayaran. Ini adalah pengumuman contoh untuk situs demo.',
    'Administrasi', 'pengumuman', null::timestamptz, null::text, true, now() - interval '3 days'
  ),
  (
    'Libur Akhir Semester Ganjil',
    'Santri pulang ke rumah masing-masing setelah pembagian rapor.',
    E'Libur akhir semester ganjil dimulai setelah pembagian rapor. Santri dijemput wali sesuai jadwal kepulangan per kamar.\n\nPengumuman ini fiktif untuk keperluan demo.',
    'Akademik', 'pengumuman', null, null, true, now() - interval '6 days'
  ),
  (
    'Kajian Umum Bulanan untuk Wali Santri',
    'Kajian terbuka bagi wali santri dan masyarakat sekitar.',
    E'Kajian umum bulanan mengangkat tema pendidikan anak di era digital.\n\nAcara terbuka untuk umum. Agenda ini fiktif untuk keperluan demo.',
    'Kajian', 'agenda', (date_trunc('day', now() at time zone 'Asia/Jakarta') + interval '9 days 8 hours') at time zone 'Asia/Jakarta', 'Masjid Pesantren', true, now() - interval '2 days'
  ),
  (
    'Lomba Pidato Tiga Bahasa',
    'Lomba pidato bahasa Indonesia, Arab, dan Inggris antarkelas.',
    E'Setiap kelas mengirimkan satu wakil untuk setiap bahasa. Penilaian meliputi isi, kefasihan, dan penampilan.\n\nAgenda ini fiktif untuk keperluan demo.',
    'Lomba', 'agenda', (date_trunc('day', now() at time zone 'Asia/Jakarta') + interval '16 days 13 hours 30 minutes') at time zone 'Asia/Jakarta', 'Aula Pesantren', true, now() - interval '4 days'
  ),
  (
    'Bakti Sosial di Desa Sekitar',
    'Santri SMA membersihkan lingkungan dan membagikan paket sembako.',
    E'Kegiatan bakti sosial melibatkan santri kelas 11 bersama warga.\n\nAgenda ini fiktif untuk keperluan demo.',
    'Sosial', 'agenda', (date_trunc('day', now() at time zone 'Asia/Jakarta') - interval '10 days' + interval '7 hours') at time zone 'Asia/Jakarta', 'Desa Fiktif', true, now() - interval '20 days'
  )
) as seed (judul, ringkasan, isi, kategori, jenis, tanggal_acara, lokasi, dipublikasi, created_at)
where not exists (select 1 from public.berita where jenis in ('pengumuman', 'agenda'));
