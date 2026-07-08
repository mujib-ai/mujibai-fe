import type { ReactNode } from 'react';

import { Label } from '@/shared/components/atoms/ui/label';
import { cn } from '@/shared/lib/utils';

import { RequiredMark } from './RequiredMark';

type FieldLabelProps = {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  optional?: string;
  rightSlot?: ReactNode;
};

export function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
  rightSlot,
}: FieldLabelProps) {
  return (
    <div
      className={cn(
        'mb-1.5 flex items-baseline',
        rightSlot ? 'justify-between' : 'justify-start'
      )}
    >
      <Label htmlFor={htmlFor} className="text-xs font-medium text-(--ink-2)">
        {children}
        {required && <RequiredMark />}
        {optional && (
          <span className="ms-1 font-normal text-(--ink-3)">{optional}</span>
        )}
      </Label>
      {rightSlot}
    </div>
  );
}
