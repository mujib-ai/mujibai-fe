import { FieldError } from 'react-hook-form';

import { FormField } from '@/shared/components/atoms/FormField';
import PasswordInput from '@/shared/components/atoms/PasswordInput';

interface PasswordFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  className?: string;
}

export function PasswordFormField({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
}: PasswordFormFieldProps) {
  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error?.message}
      className={className}
    >
      <PasswordInput
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormField>
  );
}
