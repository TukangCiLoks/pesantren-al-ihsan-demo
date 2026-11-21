import { Link } from 'react-router-dom';
import { tautanInformasi } from '../lib/berita.js';
import { bagianTanggal, formatJam, formatTanggal } from '../utils/format.js';
import '../styles/Informasi.css';

/** Ikon penanda lokasi satu warna (mengikuti warna teks). */
export function IkonLokasi() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

/** Baris pengumuman: tanggal terbit, kategori, judul (tautan), ringkasan. */
export function ItemPengumuman({ item }) {
  return (
    <article className="item-info">
      <p className="item-info__meta">
        <time dateTime={item.created_at}>{formatTanggal(item.created_at)}</time>
        {item.kategori && <span className="label-garis">{item.kategori}</span>}
        {item.contoh && <span className="label-garis">Contoh</span>}
      </p>
      <h3 className="item-info__judul">
        <Link to={tautanInformasi(item)} className="item-info__tautan">
          {item.judul}
        </Link>
      </h3>
      {item.ringkasan && <p className="item-info__ringkasan">{item.ringkasan}</p>}
    </article>
  );
}

/** Baris agenda: blok tanggal besar, judul (tautan), jam, dan lokasi. */
export function ItemAgenda({ item, lewat = false }) {
  const { hari, bulan } = bagianTanggal(item.tanggal_acara);
  return (
    <article className={`item-info item-agenda${lewat ? ' item-agenda--lewat' : ''}`}>
      <time className="item-agenda__tanggal" dateTime={item.tanggal_acara}>
        <span className="item-agenda__hari">{hari}</span>
        <span className="item-agenda__bulan">{bulan}</span>
      </time>
      <div>
        <h3 className="item-info__judul">
          <Link to={tautanInformasi(item)} className="item-info__tautan">
            {item.judul}
          </Link>
        </h3>
        <p className="item-info__meta">
          <span>
            {formatTanggal(item.tanggal_acara)} · {formatJam(item.tanggal_acara)} WIB
          </span>
          {item.lokasi && (
            <span className="item-info__lokasi">
              <IkonLokasi />
              <span className="visually-hidden">Lokasi: </span>
              {item.lokasi}
            </span>
          )}
          {item.contoh && <span className="label-garis">Contoh</span>}
        </p>
      </div>
    </article>
  );
}
