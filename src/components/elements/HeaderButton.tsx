import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onBlur?: () => void;
  className?: string;
}

export default function HeaderButton({ children, disabled, onClick, onBlur, className }: Props) {
  return (
    <button
      className={`bg-transparent text-lg min-w-[150px] sm:min-w-[180px] h-12 p-2 rounded-2xl focus:outline-none ${
        className || ''
      }`}
      disabled={disabled}
      onClick={() => {
        if (onClick) onClick();
      }}
      onBlur={() => {
        if (onBlur) onBlur();
      }}
    >
      {children}
    </button>
  );
}
