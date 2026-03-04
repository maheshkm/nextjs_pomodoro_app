import React from 'react';

export type ButtonVariant = 'primary' | 'danger' | 'default';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** which visual variant to render */
  variant?: ButtonVariant;
}

const baseStyles =
  'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
  default:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  disabled = false,
  className = '',
  ...props
}) => {
  const stateStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantClasses[variant]} ${stateStyles} ${
        className ?? ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;