'use client';

import type { ReactElement } from 'react';

import { Input } from '@/shared/components/atoms/ui/input';
import { cn } from '@/shared/lib/utils';

interface TwoFactorCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
  error?: string;
}

export function TwoFactorCodeInput({
  value,
  onChange,
  disabled,
  autoFocus,
  label,
  error,
}: TwoFactorCodeInputProps): ReactElement {
  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        maxLength={6}
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={event =>
          onChange(event.target.value.replace(/\D/g, '').slice(0, 6))
        }
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={label}
        aria-invalid={Boolean(error)}
        autoComplete="one-time-code"
        dir="ltr"
        className={cn(
          'text-center text-lg tracking-widest md:text-lg',
          error && 'border-destructive border'
        )}
      />
      {error && (
        <p className="text-destructive mt-1.5 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
