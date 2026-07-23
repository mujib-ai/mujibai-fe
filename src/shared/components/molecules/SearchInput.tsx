import type { ComponentProps } from 'react';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Input } from '@/shared/components/atoms/ui/input';
import { cn } from '@/shared/lib/utils';

interface SearchInputProps extends ComponentProps<typeof Input> {
  containerClassName?: string;
}

export function SearchInput({
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn(
        'col-span-3 flex w-full items-center gap-2 rounded-full bg-[#06B6D426] px-3 py-2 dark:bg-white/10',
        containerClassName
      )}
    >
      <Input
        {...props}
        className={cn(
          'flex-1 border-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent',
          className
        )}
      />
      <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
        <ThemedIcon name="search" className="size-4" />
      </div>
    </div>
  );
}
