import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface EmailFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export function EmailField({
  id,
  label,
  placeholder,
  register,
  error,
  disabled = false,
}: EmailFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        className="mt-3 w-full border-none bg-[#06B6D40F] placeholder:text-[#000000BF] focus:ring-2 focus:ring-[#06B6D4] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#3B82F633] dark:placeholder:text-[#FFFFFFBF]"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
