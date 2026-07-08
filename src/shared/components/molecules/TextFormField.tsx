import { FormField } from '@/shared/components/atoms/FormField';
import { Input } from '@/shared/components/atoms/ui/input';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface TextFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

export function TextFormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  className,
}: TextFormFieldProps<T>) {
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
      />
    </FormField>
  );
}
