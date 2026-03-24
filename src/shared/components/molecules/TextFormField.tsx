import { FieldError, UseFormRegister } from 'react-hook-form';

import { FormField } from '@/shared/components/atoms/FormField';
import { Input } from '@/shared/components/atoms/ui/input';

interface TextFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
}

export function TextFormField({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  className,
  inputClassName,
}: TextFormFieldProps) {
  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error?.message}
      className={className}
    >
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={inputClassName}
      />
    </FormField>
  );
}
