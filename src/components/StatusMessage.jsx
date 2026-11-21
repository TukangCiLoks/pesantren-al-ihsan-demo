import '../styles/StatusMessage.css';

/**
 * Pesan status (memuat / kosong / error / sukses). role="status" agar
 * pembaca layar mengumumkan perubahan; error memakai role="alert".
 */
export default function StatusMessage({ tone = 'info', children }) {
  return (
    <div className={`status status--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}
