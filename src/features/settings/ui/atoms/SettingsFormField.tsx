'use client';

import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';

interface SettingsFormFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  'id' | 'type' | 'children'
> {
  id: string;
  label: string;
  type?: string;
  children?: React.ReactNode;
}

export default function SettingsFormField({
  id,
  label,
  type = 'text',
  placeholder,
  children,
  ...inputProps
}: SettingsFormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children ?? (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          {...inputProps}
        />
      )}
    </div>
  );
}
