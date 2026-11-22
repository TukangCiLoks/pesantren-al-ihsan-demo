import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// CSS dasar dimuat lebih dulu agar CSS komponen (diimpor lewat App) bisa menimpanya.
import './styles/tokens.css';
import './styles/global.css';
import App from './App.jsx';

// Aktifkan font Google yang sudah diunduh tanpa memblokir render (lihat index.html).
document.querySelectorAll('link[data-font]').forEach((link) => {
  link.media = 'all';
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
