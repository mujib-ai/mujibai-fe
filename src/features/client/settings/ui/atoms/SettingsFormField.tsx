'use client';

import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';

interface SettingsFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function SettingsFormField({
  id,
  label,
  type = 'text',
  placeholder,
  children,
}: SettingsFormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children ?? (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="focus-visible:ring-primary border-none bg-[#06B6D40F] text-white placeholder:text-gray-400 focus-visible:ring-1 dark:bg-[#FFFFFF0F]"
        />
      )}
    </div>
  );
}
