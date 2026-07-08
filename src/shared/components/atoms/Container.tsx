import type * as React from 'react';

import { cn } from '@/shared/lib/utils';

export const LANDING_SECTION_SPACING = 'py-16 md:py-20 lg:py-24';

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, 'as'>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-6', className)}
      {...props}
    />
  );
}
