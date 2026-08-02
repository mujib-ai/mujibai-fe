import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/shared/components/atoms/ui/input-group';
import { Label } from '@/shared/components/atoms/ui/label';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldWebsiteProps {
  label: string;
  placeholder: string;
  required?: boolean;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export function FormFieldWebsite({
  label,
  placeholder,
  required = false,
  name,
  register,
  error,
}: FormFieldWebsiteProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-cyan-500">*</span>}
      </Label>
      <InputGroup
        className={`h-11 rounded-lg border-none bg-[#06B6D40F] ${
          error ? 'border border-red-500' : ''
        }`}
        aria-invalid={!!error}
      >
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id={name}
          placeholder={placeholder}
          className="placeholder:text-gray-500"
          {...register}
          name={name}
        />
      </InputGroup>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
