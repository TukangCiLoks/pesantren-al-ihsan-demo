import { Link } from 'react-router-dom';
import '../styles/Button.css';

/**
 * Tombol / tautan bergaya tombol.
 * variant: 'dark' (navy, untuk latar terang) | 'light' (putih, untuk latar navy)
 *          | 'ghost-light' (garis putih, untuk latar navy)
 * pulse:   animasi 3 — cincin denyut halus mengikuti varian.
 * to → <Link>, href → <a>, selain itu → <button>.
 */
export default function Button({ variant = 'dark', pulse = false, to, href, className = '', children, ...rest }) {
  const cls = `btn btn--${variant}${pulse ? ' btn--pulse' : ''}${className ? ` ${className}` : ''}`;
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
