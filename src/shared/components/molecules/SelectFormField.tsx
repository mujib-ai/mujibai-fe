import { ReactNode } from 'react';

import { FieldError } from 'react-hook-form';

import { FormField } from '@/shared/components/atoms/FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: FieldError;
  className?: string;
  renderOption?: (option: SelectOption) => ReactNode;
}

export function SelectFormField({
  name,
  label,
  placeholder,
  options,
  value,
  onValueChange,
  error,
  className,
  renderOption,
}: SelectFormFieldProps) {
  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error?.message}
      className={className}
    >
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option =>
            renderOption ? (
              renderOption(option)
            ) : (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </FormField>
  );
}
