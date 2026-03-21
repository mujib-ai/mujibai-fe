import { Label } from '@/shared/components/atoms/ui/label';
import { Input } from '@/shared/components/atoms/ui/input';

interface FormFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  name: string;
  register: any;
  error?: string;
}

export function FormField({
  label,
  placeholder,
  required = false,
  name,
  register,
  error,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-cyan-500">*</span>}
      </Label>
      <Input
        placeholder={placeholder}
        className={`h-11 rounded-lg border-none bg-[#06B6D40F] placeholder:text-gray-500 ${
          error ? 'border border-red-500' : ''
        }`}
        {...register}
        name={name}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
