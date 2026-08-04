import type { ReactElement } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { cn } from '@/shared/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  className,
}: ErrorStateProps): ReactElement {
  return (
    <div
      className={cn(
        'border-destructive/30 bg-destructive/5 flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-5 py-10 text-center',
        className
      )}
      role="alert"
    >
      <div className="bg-destructive/10 flex size-12 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-5" aria-hidden="true" />
      </div>
      <div className="max-w-md space-y-1">
        <p className="font-semibold">{title}</p>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {onRetry && retryLabel ? (
        <Button size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
