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
        'bg-control col-span-3 flex w-full items-center gap-2 rounded-full px-3',
        containerClassName
      )}
    >
      <Input
        {...props}
        className={cn(
          'flex-1 border-0 bg-transparent py-0 shadow-none focus-visible:ring-0 dark:bg-transparent',
          className
        )}
      />
      <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
        <ThemedIcon name="search" className="size-4" />
      </div>
    </div>
  );
}
