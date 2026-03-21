import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: 'text' | 'password' | 'email';
  register: React.ComponentProps<typeof Input>;
}

export function FormField({
  id,
  label,
  placeholder,
  error,
  type = 'text',
  register,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${error ? 'border-destructive' : ''} bg-[#06B6D40F]!`}
        {...register}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
