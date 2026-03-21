import { Label } from '@/shared/components/atoms/ui/label';
import { Textarea } from '@/shared/components/atoms/ui/textarea';

interface FormFieldTextareaProps {
  label: string;
  placeholder: string;
  required?: boolean;
  name: string;
  register: any;
  error?: string;
}

export function FormFieldTextarea({
  label,
  placeholder,
  required = false,
  name,
  register,
  error,
}: FormFieldTextareaProps) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-cyan-500">*</span>}
      </Label>
      <Textarea
        placeholder={placeholder}
        className="h-24 rounded-lg border-none bg-[#06B6D40F] placeholder:text-gray-500"
        {...register}
        name={name}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
