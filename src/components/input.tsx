import type { HTMLInputTypeAttribute } from 'react';
import { cn } from '../utils/cn';

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  size?: 'small' | 'large';
}

export default function Input({
  type,
  name,
  placeholder,

  size = 'large',
}: InputProps) {
  return (
    <input
      className={cn('input', size === 'small' ? 'input-small' : 'input-large')}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}
