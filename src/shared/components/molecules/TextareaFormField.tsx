import { FormField } from '@/shared/components/atoms/FormField';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface TextareaFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

export function TextareaFormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  className,
}: TextareaFormFieldProps<T>) {
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
