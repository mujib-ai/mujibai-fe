import type { ReactElement } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { cn } from '@/shared/lib/utils';
import { LockKeyhole, ShieldAlert } from 'lucide-react';

interface AccessStateProps {
  kind: 'unauthorized' | 'forbidden';
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function AccessState({
  kind,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: AccessStateProps): ReactElement {
  const Icon = kind === 'unauthorized' ? LockKeyhole : ShieldAlert;
  return (
    <div
      className={cn(
        'bg-muted/40 flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-5 py-10 text-center',
        className
      )}
    >
      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
        <Icon className="text-primary size-5" aria-hidden="true" />
      </div>
      <div className="max-w-md space-y-1">
        <p className="font-semibold">{title}</p>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {actionLabel && onAction ? (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
