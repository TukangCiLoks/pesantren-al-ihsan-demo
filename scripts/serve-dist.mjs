// Menyajikan dist/ seperti Vercel: header dari vercel.json + fallback SPA ke index.html.
// Untuk menguji CSP secara lokal: `npm run build && node scripts/serve-dist.mjs` → http://localhost:5190
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const PORT = Number(process.env.PORT) || 5190;
const ROOT = 'dist';
const cfg = JSON.parse(readFileSync('vercel.json', 'utf8'));
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json',
};
const cocok = (pola, path) => new RegExp(`^${pola.replace('(.*)', '.*')}$`).test(path);

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) file = join(ROOT, 'index.html');
  for (const aturan of cfg.headers) {
    if (cocok(aturan.source, path)) for (const h of aturan.headers) res.setHeader(h.key, h.value);
  }
  res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream');
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`dist + header Vercel: http://localhost:${PORT}`));
