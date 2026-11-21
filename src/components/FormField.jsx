import { forwardRef } from 'react';
import '../styles/FormField.css';

/**
 * Satu isian formulir: label + kontrol + petunjuk + pesan error.
 * Pesan error dan petunjuk dihubungkan ke kontrol lewat aria-describedby,
 * sehingga pembaca layar membacakannya saat kontrol difokus.
 *
 * as: 'input' | 'select' | 'textarea'
 */
const FormField = forwardRef(function FormField(
  { id, label, hint, error, as: Control = 'input', children, className = '', ...props },
  ref,
) {
  const hintId = hint ? `${id}-petunjuk` : null;
  const errorId = error ? `${id}-error` : null;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field${error ? ' field--error' : ''}${className ? ` ${className}` : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      <Control
        ref={ref}
        id={id}
        name={id}
        className="field__control"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
