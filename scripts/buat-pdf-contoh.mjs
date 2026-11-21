// Membuat PDF contoh untuk halaman Unduhan (public/unduhan/*.pdf) — tanpa library.
// Jalankan: node scripts/buat-pdf-contoh.mjs
// PDF satu halaman A4, font bawaan Helvetica (tanpa embed), teks ASCII saja.
// Semua isi fiktif untuk demo portofolio.

import { mkdirSync, writeFileSync, statSync } from 'node:fs';

const DOKUMEN = [
  {
    file: 'brosur-ppdb-2026.pdf',
    judul: 'Brosur Penerimaan Santri Baru 2026/2027',
    baris: [
      'Pesantren Al-Ihsan membuka pendaftaran santri baru untuk jenjang:',
      '  - SMP Islam (kelas 7)',
      '  - SMA Islam (kelas 10, peminatan IPA dan IPS)',
      '  - Program Tahfidz (dapat diikuti santri SMP dan SMA)',
      '',
      'Alur pendaftaran:',
      '  1. Isi formulir online dan simpan nomor pendaftaran.',
      '  2. Panitia memverifikasi data dan menghubungi wali.',
      '  3. Calon santri mengikuti tes dasar dan wawancara.',
      '  4. Hasil seleksi diumumkan kepada wali.',
      '',
      'Kontak panitia: 0800-0000-0000 (Senin-Sabtu, 08.00-15.00 WIB)',
    ],
  },
  {
    file: 'kalender-akademik-2026-2027.pdf',
    judul: 'Kalender Akademik 2026/2027',
    baris: [
      'Semester ganjil',
      '  13-15 Juli 2026        Masa orientasi santri baru',
      '  16 Juli 2026           Awal kegiatan belajar',
      '  21-26 September 2026   Penilaian tengah semester',
      '  30 Nov - 5 Des 2026    Penilaian akhir semester',
      '  19 Desember 2026       Pembagian rapor',
      '',
      'Semester genap',
      '  4 Januari 2027         Awal semester genap',
      '  1-6 Maret 2027         Penilaian tengah semester',
      '  7-12 Juni 2027         Penilaian akhir tahun',
      '  19 Juni 2027           Wisuda tahfidz dan kelulusan',
      '',
      'Tanggal dapat berubah sesuai keputusan pimpinan pesantren.',
    ],
  },
  {
    file: 'tata-tertib-santri.pdf',
    judul: 'Ringkasan Tata Tertib Santri',
    baris: [
      '1. Mengikuti salat berjamaah lima waktu di masjid.',
      '2. Hadir tepat waktu di kelas, halaqah, dan belajar malam.',
      '3. Menjaga kebersihan kamar, kelas, dan lingkungan.',
      '4. Berpakaian rapi dan sopan sesuai ketentuan pesantren.',
      '5. Tidak membawa telepon genggam kecuali dengan izin.',
      '6. Izin keluar pesantren melalui pembina asrama.',
      '7. Menghormati asatidz, pengurus, dan sesama santri.',
      '',
      'Pelanggaran ditangani secara bertahap: nasihat, pembinaan,',
      'dan pemanggilan wali bila diperlukan.',
    ],
  },
];

const escape = (s) => s.replace(/[\\()]/g, (c) => `\\${c}`);

function buatPdf({ judul, baris }) {
  const teks = [];
  teks.push('BT /F2 9 Tf 56 800 Td (PESANTREN AL-IHSAN \\(DEMO\\)) Tj ET');
  teks.push(`BT /F2 20 Tf 56 760 Td (${escape(judul)}) Tj ET`);
  teks.push('0.04 0.12 0.23 RG 2 w 56 745 m 539 745 l S');
  let y = 715;
  for (const b of baris) {
    if (b) teks.push(`BT /F1 11 Tf 56 ${y} Td (${escape(b)}) Tj ET`);
    y -= 18;
  }
  teks.push('BT /F1 8 Tf 56 50 Td (Dokumen contoh untuk situs portofolio. Pesantren Al-Ihsan adalah lembaga fiktif.) Tj ET');
  const isi = teks.join('\n');

  const objek = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(isi, 'latin1')} >>\nstream\n${isi}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offset = [];
  objek.forEach((o, i) => {
    offset.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objek.length + 1}\n0000000000 65535 f \n`;
  pdf += offset.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
  pdf += `trailer\n<< /Size ${objek.length + 1} /Root 1 0 R /Info << /Title (${escape(judul)}) >> >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'latin1');
}

const folder = new URL('../public/unduhan/', import.meta.url);
mkdirSync(folder, { recursive: true });
for (const d of DOKUMEN) {
  const tujuan = new URL(d.file, folder);
  writeFileSync(tujuan, buatPdf(d));
  console.log(`${d.file}  ${statSync(tujuan).size} byte`);
}
