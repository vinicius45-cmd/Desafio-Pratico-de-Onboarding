import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Estilização base com variáveis CSS ou classes inline seguras (compatível com Tailwind se ativo)
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '0.5rem',
    border: '1px solid transparent',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    opacity: disabled || loading ? 0.6 : 1,
    transform: 'scale(1)',
  };

  const variants = {
    primary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
    },
    secondary: {
      backgroundColor: '#374151',
      color: '#f3f4f6',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#4b5563',
      color: '#f3f4f6',
    }
  };

  const sizes = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.5rem 1.25rem', fontSize: '1rem' },
    lg: { padding: '0.75rem 1.75rem', fontSize: '1.125rem' }
  };

  const activeVariant = variants[variant];
  const activeSize = sizes[size];

  return (
    <button
      style={{ ...baseStyle, ...activeVariant, ...activeSize }}
      disabled={disabled || loading}
      onMouseDown={(e) => { if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.95)' }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onMouseEnter={(e) => { if (!disabled && !loading) e.currentTarget.style.filter = 'brightness(1.1)' }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'scale(1)' }}
      {...props}
    >
      {loading ? (
        <svg
          style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem', width: '1rem', height: '1rem' }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};
