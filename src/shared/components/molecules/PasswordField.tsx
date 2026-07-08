import PasswordInput from '@/shared/components/atoms/PasswordInput';
import { Label } from '@/shared/components/atoms/ui/label';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export function PasswordField({
  id,
  label,
  placeholder,
  register,
  error,
}: PasswordFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <PasswordInput id={id} placeholder={placeholder} {...register} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
