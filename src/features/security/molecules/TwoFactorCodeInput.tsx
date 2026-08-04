'use client';

import type { ReactElement } from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/atoms/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface TwoFactorCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
}

export function TwoFactorCodeInput({
  value,
  onChange,
  disabled,
  autoFocus,
  label,
}: TwoFactorCodeInputProps): ReactElement {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      value={value}
      onChange={value => onChange(value.replace(/\D/g, '').slice(0, 6))}
      disabled={disabled}
      autoFocus={autoFocus}
      aria-label={label}
    >
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
