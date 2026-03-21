'use client';

import { Label } from '@/shared/components/atoms/ui/label';
import { cn } from '@/shared/lib/utils';

import type { ThemeOptionCardProps } from '../../types';

export function ThemeOptionCard({
  label,
  value,
  icon,
  isSelected,
  onChange,
}: ThemeOptionCardProps) {
  return (
    <label
      htmlFor={value}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-200',
        'bg-[#FFFFFFBF] dark:bg-[#FFFFFF0F]',
        'hover:ring-primary/40 hover:ring-2',
        isSelected
          ? 'border-primary ring-primary/60 ring-2'
          : 'border-transparent'
      )}
    >
      <div className="my-5 rounded-full bg-[#3B82F640] p-2 dark:bg-[#00143440]">
        {icon}
      </div>
      <input
        id={value}
        type="radio"
        name="theme"
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="hidden"
      />
      <Label className="cursor-pointer font-medium">{label}</Label>
    </label>
  );
}
