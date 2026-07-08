import PasswordInput from '@/shared/components/atoms/PasswordInput';
import { Label } from '@/shared/components/atoms/ui/label';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface LoginPasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export function LoginPasswordField({
  id,
  label,
  placeholder,
  register,
  error,
  disabled = false,
}: LoginPasswordFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <PasswordInput
        id={id}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
