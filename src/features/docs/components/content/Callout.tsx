import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'danger';

const CALLOUT_CONFIG: Record<
  CalloutType,
  { icon: React.ElementType; className: string }
> = {
  info: {
    icon: Info,
    className: 'border-primary/30 bg-primary/5 text-foreground [&_svg]:text-primary',
  },
  warning: {
    icon: AlertTriangle,
    className:
      'border-amber-500/30 bg-amber-500/10 text-foreground [&_svg]:text-amber-500',
  },
  danger: {
    icon: ShieldAlert,
    className:
      'border-destructive/30 bg-destructive/10 text-foreground [&_svg]:text-destructive',
  },
};

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const { icon: Icon, className: typeClassName } = CALLOUT_CONFIG[type];

  return (
    <div
      className={cn(
        'my-4 flex gap-3 rounded-lg border px-4 py-3 text-sm',
        typeClassName,
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        {title && <p className="font-medium">{title}</p>}
        <div className="text-muted-foreground [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
