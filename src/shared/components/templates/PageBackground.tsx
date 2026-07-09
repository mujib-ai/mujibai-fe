import type { ReactNode } from 'react';

import Header from '@/shared/components/organisms/Header';
import { cn } from '@/shared/lib/utils';

export function PageBackground({
  children,
  showHeader = true,
  className,
  glowClassName,
}: {
  children: ReactNode;
  showHeader?: boolean;
  className?: string;
  glowClassName?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center overflow-x-hidden py-12',
        className
      )}
    >
      <div
        className={cn(
          'fixed top-1/2 left-1/2 z-[-1] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]',
          glowClassName
        )}
      />

      {showHeader && <Header />}
      {children}
    </div>
  );
}
