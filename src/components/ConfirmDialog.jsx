import { useEffect, useId, useRef } from 'react';
import Button from './Button.jsx';

/**
 * Dialog konfirmasi di dalam halaman (pengganti window.confirm).
 * Memakai <dialog>.showModal(): peramban sudah menyediakan fokus terjebak,
 * tombol Esc, latar yang tidak bisa diklik, dan pengembalian fokus.
 */
export default function ConfirmDialog({ open, judul, pesan, labelKonfirmasi = 'Hapus', sedangProses, onKonfirmasi, onBatal }) {
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={`${id}-judul`}
      aria-describedby={`${id}-pesan`}
      onCancel={(e) => {
        // Esc: tutup lewat state React, bukan langsung oleh peramban.
        e.preventDefault();
        if (!sedangProses) onBatal();
      }}
    >
      <h2 id={`${id}-judul`}>{judul}</h2>
      <p id={`${id}-pesan`}>{pesan}</p>
      <div className="dialog__aksi">
        {/* Fokus awal di "Batal": pilihan paling aman bila Enter ditekan tanpa sengaja. */}
        <Button variant="ghost-dark" onClick={onBatal} disabled={sedangProses} autoFocus>
          Batal
        </Button>
        <Button variant="danger" onClick={onKonfirmasi} disabled={sedangProses}>
          {sedangProses ? 'Memproses…' : labelKonfirmasi}
        </Button>
      </div>
    </dialog>
  );
}
