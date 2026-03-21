import { FieldError, UseFormRegister } from 'react-hook-form';

import { FormField } from '@/shared/components/atoms/FormField';
import { Textarea } from '@/shared/components/atoms/ui/textarea';

interface TextareaFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
}

export function TextareaFormField({
  name,
  label,
  placeholder,
  register,
  error,
  className,
}: TextareaFormFieldProps) {
  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error?.message}
      className={className}
    >
      <Textarea id={name} placeholder={placeholder} {...register(name)} />
    </FormField>
  );
}
