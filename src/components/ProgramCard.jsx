import '../styles/Card.css';

const IKON = {
  buku: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />,
  toga: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6" />,
  mushaf: <path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5zM12 6v14" />,
};

export default function ProgramCard({ nomor, nama, ringkas, ikon }) {
  return (
    <article className="card card--interaktif program-card">
      <span className="program-card__ikon">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          {IKON[ikon]}
        </svg>
      </span>
      <div>
        <p className="program-card__nomor" aria-hidden="true">
          {nomor}
        </p>
        <h3>{nama}</h3>
        <p>{ringkas}</p>
      </div>
    </article>
  );
}
