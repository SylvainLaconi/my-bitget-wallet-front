import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  name: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

export default function Select({
  name,
  placeholder,
  options,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <select
        name={name}
        className="input select appearance-none w-full pr-10"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
          open ? 'rotate-180' : ''
        }`}
      />
    </div>
  );
}
