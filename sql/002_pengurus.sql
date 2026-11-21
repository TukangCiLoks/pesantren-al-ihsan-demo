-- ═══════════════════════════════════════════════════════════════════════
-- Migrasi 002 — Struktur Organisasi (tabel `pengurus`)
-- Jalankan SETELAH sql/schema.sql (butuh fungsi public.is_admin()).
-- Supabase Dashboard › SQL Editor › New query → tempel → Run. Aman dijalankan ulang.
-- ═══════════════════════════════════════════════════════════════════════

-- 1. TABEL ------------------------------------------------------------------
-- Satu baris = satu jabatan. `induk_id` menunjuk atasan langsung → membentuk pohon.
create table if not exists public.pengurus (
  id          bigint generated always as identity primary key,
  nama        text not null check (char_length(nama) between 3 and 100),
  jabatan     text not null check (char_length(jabatan) between 2 and 100),
  unit        text not null check (unit in ('yayasan', 'pimpinan', 'unit')),
  induk_id    bigint references public.pengurus (id) on delete set null,
  urutan      integer not null default 0 check (urutan between 0 and 999),
  aktif       boolean not null default true,
  created_at  timestamptz not null default now(),
  check (induk_id is null or induk_id <> id)
);

create index if not exists pengurus_unit_idx on public.pengurus (unit, urutan);
create index if not exists pengurus_induk_idx on public.pengurus (induk_id);


-- 2. JAGA BENTUK POHON --------------------------------------------------------
-- Atasan harus dari unit yang sama, dan tidak boleh terbentuk lingkaran
-- (A atasan B, B atasan A). Dicek di server agar data tetap valid walau
-- dikirim dari luar panel admin.
create or replace function public.cek_pohon_pengurus()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_unit_induk text;
  v_langkah    int := 0;
  v_cur        bigint := new.induk_id;
begin
  if new.induk_id is null then
    return new;
  end if;

  select unit into v_unit_induk from public.pengurus where id = new.induk_id;
  if v_unit_induk is null then
    raise exception 'Atasan tidak ditemukan.' using errcode = '23503';
  end if;
  if v_unit_induk <> new.unit then
    raise exception 'Atasan harus berada di unit yang sama.' using errcode = '22023';
  end if;

  -- Telusuri rantai atasan; bila bertemu diri sendiri berarti melingkar.
  while v_cur is not null loop
    if v_cur = new.id then
      raise exception 'Susunan atasan membentuk lingkaran.' using errcode = '22023';
    end if;
    v_langkah := v_langkah + 1;
    if v_langkah > 50 then
      raise exception 'Struktur terlalu dalam.' using errcode = '22023';
    end if;
    select induk_id into v_cur from public.pengurus where id = v_cur;
  end loop;

  return new;
end;
$$;

drop trigger if exists pengurus_cek_pohon on public.pengurus;
create trigger pengurus_cek_pohon
  before insert or update of induk_id, unit on public.pengurus
  for each row execute function public.cek_pohon_pengurus();

revoke execute on function public.cek_pohon_pengurus() from public, anon, authenticated;


-- 3. GRANT (lapis 1) ------------------------------------------------------------
revoke all on public.pengurus from anon, authenticated;
grant select                  on public.pengurus to anon, authenticated;
grant insert, update, delete  on public.pengurus to authenticated;


-- 4. RLS (lapis 2) --------------------------------------------------------------
alter table public.pengurus enable row level security;

drop policy if exists "publik membaca pengurus aktif"  on public.pengurus;
drop policy if exists "admin membaca semua pengurus"   on public.pengurus;
drop policy if exists "admin menambah pengurus"        on public.pengurus;
drop policy if exists "admin mengubah pengurus"        on public.pengurus;
drop policy if exists "admin menghapus pengurus"       on public.pengurus;

create policy "publik membaca pengurus aktif" on public.pengurus
  for select to anon, authenticated
  using (aktif);

create policy "admin membaca semua pengurus" on public.pengurus
  for select to authenticated
  using (public.is_admin());

create policy "admin menambah pengurus" on public.pengurus
  for insert to authenticated
  with check (public.is_admin());

create policy "admin mengubah pengurus" on public.pengurus
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin menghapus pengurus" on public.pengurus
  for delete to authenticated
  using (public.is_admin());


-- 5. SEED — susunan fiktif, hanya bila tabel kosong ------------------------------
do $$
declare
  v_pembina bigint; v_ketua bigint;
  v_pengasuh bigint; v_mudir bigint;
  v_smp bigint; v_sma bigint; v_tahfidz bigint;
begin
  if exists (select 1 from public.pengurus) then
    return;
  end if;

  -- Yayasan
  insert into public.pengurus (nama, jabatan, unit, urutan)
    values ('H. Rahmat Fiktif', 'Ketua Dewan Pembina', 'yayasan', 1) returning id into v_pembina;
  insert into public.pengurus (nama, jabatan, unit, induk_id, urutan)
    values ('H. Darmawan Contoh', 'Ketua Yayasan', 'yayasan', v_pembina, 1) returning id into v_ketua;
  insert into public.pengurus (nama, jabatan, unit, induk_id, urutan) values
    ('Bapak Hamid Sampel', 'Ketua Dewan Pengawas', 'yayasan', v_pembina, 2),
    ('Ibu Siti Rekaan', 'Sekretaris Yayasan', 'yayasan', v_ketua, 1),
    ('Bapak Anwar Demo', 'Bendahara Yayasan', 'yayasan', v_ketua, 2);

  -- Pimpinan pesantren
  insert into public.pengurus (nama, jabatan, unit, urutan)
    values ('KH. Abdul Rasyid Fiktif', 'Pengasuh Pesantren', 'pimpinan', 1) returning id into v_pengasuh;
  insert into public.pengurus (nama, jabatan, unit, induk_id, urutan)
    values ('Ustadz Fauzan Ilustrasi', 'Mudir (Direktur) Pesantren', 'pimpinan', v_pengasuh, 1) returning id into v_mudir;
  insert into public.pengurus (nama, jabatan, unit, induk_id, urutan) values
    ('Ustadz Yusuf Ilustrasi', 'Kepala Bagian Kesantrian', 'pimpinan', v_mudir, 1),
    ('Ustadzah Rina Contoh', 'Kepala Bagian Kurikulum', 'pimpinan', v_mudir, 2),
    ('Bapak Teguh Demo', 'Kepala Bagian Keuangan & Umum', 'pimpinan', v_mudir, 3);

  -- Unit pendidikan
  insert into public.pengurus (nama, jabatan, unit, urutan)
    values ('Ustadz Faruq Sampel', 'Kepala SMP Islam', 'unit', 1) returning id into v_smp;
  insert into public.pengurus (nama, jabatan, unit, urutan)
    values ('Ustadzah Laila Rekaan', 'Kepala SMA Islam', 'unit', 2) returning id into v_sma;
  insert into public.pengurus (nama, jabatan, unit, urutan)
    values ('Ustadz Hasan Demo', 'Koordinator Tahfidz', 'unit', 3) returning id into v_tahfidz;
  insert into public.pengurus (nama, jabatan, unit, induk_id, urutan) values
    ('Ustadzah Dewi Fiktif', 'Wakasek Kurikulum SMP', 'unit', v_smp, 1),
    ('Ustadz Rafi Contoh', 'Wakasek Kesiswaan SMP', 'unit', v_smp, 2),
    ('Ustadz Bima Demo', 'Wakasek Kurikulum SMA', 'unit', v_sma, 1),
    ('Ustadzah Hana Sampel', 'Wakasek Kesiswaan SMA', 'unit', v_sma, 2),
    ('Ustadz Ilham Fiktif', 'Musyrif Tahfidz Putra', 'unit', v_tahfidz, 1),
    ('Ustadzah Zahra Contoh', 'Musyrifah Tahfidz Putri', 'unit', v_tahfidz, 2);
end;
$$;
