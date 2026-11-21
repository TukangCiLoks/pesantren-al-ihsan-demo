// Audit kontras WCAG untuk halaman yang sedang terbuka — jalankan di Console DevTools.
//
// Cara pakai: buka halaman (npm run dev), gulir sampai bawah agar semua elemen reveal tampil,
// lalu tempel seluruh isi file ini ke Console. Hasil: jumlah teks yang diperiksa per tema,
// daftar pasangan yang gagal (< 4,5:1, atau < 3:1 untuk teks besar), dan warna yang tak terbaca.
//
// Catatan: browser melaporkan warna hasil color-mix() sebagai `color(srgb …)`; parser di
// bawah membaca format itu juga (versi awal tidak, sehingga teks --text-muted mode gelap terlewat).
// Teks di atas gambar/gradien (hero) dilewati karena latarnya tidak tunggal.

(async () => {
  const tunggu = (ms) => new Promise((r) => setTimeout(r, ms));
  const parse = (c) => {
    let m = c.match(/^rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    m = c.match(/^color\(srgb ([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[ /]+/).filter(Boolean).map(Number);
      return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 };
    }
    return `TIDAK_TERBACA:${c}`;
  };
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const L = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => {
    const x = L(a);
    const y = L(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  const blend = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });

  const audit = () => {
    const tak = new Set();
    const gagal = [];
    let n = 0;
    const bgOf = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const cs = getComputedStyle(e);
        const c = parse(cs.backgroundColor);
        if (typeof c === 'string') {
          tak.add(c);
          return null;
        }
        if (c.a > 0) {
          stack.push(c);
          if (c.a >= 1) break;
        }
        if (cs.backgroundImage !== 'none' && !stack.length && e !== el) return null;
      }
      let bg = { r: 255, g: 255, b: 255, a: 1 };
      for (const c of stack.reverse()) bg = blend(c, bg);
      return bg;
    };
    for (const el of document.querySelectorAll('body *')) {
      if (![...el.childNodes].some((x) => x.nodeType === 3 && x.textContent.trim())) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (el.closest('.visually-hidden, svg, .hero')) continue;
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      if (typeof fg === 'string') {
        tak.add(fg);
        continue;
      }
      const bg = bgOf(el);
      if (!bg) continue;
      n += 1;
      const ukuran = parseFloat(cs.fontSize);
      const besar = ukuran >= 24 || (ukuran >= 18.66 && +cs.fontWeight >= 700);
      const k = ratio(blend(fg, bg), bg);
      if (k < (besar ? 3 : 4.5)) gagal.push(`${k.toFixed(2)} ${el.tagName} "${el.textContent.trim().slice(0, 30)}"`);
    }
    return { diperiksa: n, gagal, takTerbaca: [...tak] };
  };

  const root = document.documentElement;
  const semula = root.dataset.theme;
  root.dataset.theme = 'light';
  await tunggu(100);
  const terang = audit();
  root.dataset.theme = 'dark';
  await tunggu(100);
  const gelap = audit();
  if (semula) root.dataset.theme = semula;
  else delete root.dataset.theme;
  console.table({ terang: { ...terang, gagal: terang.gagal.length }, gelap: { ...gelap, gagal: gelap.gagal.length } });
  console.log({ terang, gelap });
})();
