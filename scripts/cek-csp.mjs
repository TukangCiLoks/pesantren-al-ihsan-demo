// Dijalankan otomatis setelah `npm run build` (postbuild).
// Memastikan hash skrip inline di dist/index.html sama dengan yang diizinkan CSP di vercel.json.
// Bila skrip tema di index.html diubah, build gagal di sini dan mencetak hash baru.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const csp = JSON.parse(readFileSync('vercel.json', 'utf8'))
  .headers.flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy').value;

const kurang = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(([, isi]) => `'sha256-${createHash('sha256').update(isi).digest('base64')}'`)
  .filter((hash) => !csp.includes(hash));

if (kurang.length) {
  console.error(`[cek-csp] Skrip inline tidak diizinkan CSP. Tambahkan ke script-src di vercel.json:\n  ${kurang.join('\n  ')}`);
  process.exit(1);
}
console.log('[cek-csp] Hash skrip inline cocok dengan CSP.');
