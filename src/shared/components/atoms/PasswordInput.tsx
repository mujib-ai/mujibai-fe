'use client';

import { forwardRef, useState } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { id, name, placeholder, error, touched, disabled, className, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ') e.preventDefault();
    };

    return (
      <div className="relative flex w-full flex-col">
        <Input
          ref={ref}
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`mt-3 w-full ${className} focus:border-primary focus:ring-primary/30 border border-transparent bg-[#06B6D40F] ps-3 pe-12 text-start transition-all duration-200 placeholder:text-[#000000BF] focus:ring-2 dark:bg-[#3B82F633] dark:placeholder:text-[#FFFFFFBF]`}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(prev => !prev)}
          className="hover:text-primary text-primary absolute end-2 top-[50%] h-9 w-9 -translate-y-[30%] hover:bg-transparent dark:hover:bg-transparent"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>

        {touched && error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
