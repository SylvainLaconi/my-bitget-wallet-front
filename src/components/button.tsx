import Spinner from './spinner';

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children?: React.ReactNode;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  onClick,
  disabled = false,
  children,
  isLoading = false,
  size = 'large',
  variant = 'primary',
  icon,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${size} btn-${variant}`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled || isLoading}
    >
      {isLoading && <Spinner size={size} />}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
