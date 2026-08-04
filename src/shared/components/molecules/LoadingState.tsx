import type { ReactElement } from 'react';

import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@heroui/react';

interface LoadingStateProps {
  label: string;
  className?: string;
  rows?: number;
}

export function LoadingState({
  label,
  className,
  rows = 4,
}: LoadingStateProps): ReactElement {
  return (
    <div
      className={cn('space-y-3 py-2', className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton
          key={index}
          animationType="none"
          className="bg-muted h-16 w-full animate-pulse rounded-xl"
        />
      ))}
    </div>
  );
}
