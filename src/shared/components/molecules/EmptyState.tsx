import type { ReactElement, ReactNode } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
}: EmptyStateProps): ReactElement {
  return (
    <div className="bg-muted/20 flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-5 py-10 text-center">
      <div className="text-primary bg-primary/10 mb-1 flex size-12 items-center justify-center rounded-full">
        <Icon className="size-5" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      {description && (
        <p className="text-muted-foreground max-w-xs text-xs">{description}</p>
      )}
      {action && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}
