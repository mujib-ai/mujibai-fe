'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { cn } from '@/shared/lib/utils';

import type { ResponsiveFormDialogProps } from '../../interfaces';

export function ResponsiveFormDialog({
  open,
  onClose,
  title,
  description,
  children,
}: ResponsiveFormDialogProps) {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent
        className={cn(
          'flex max-h-[90vh] w-full flex-col p-0 sm:max-w-lg',
          isMobile &&
            'top-auto bottom-0 max-w-full translate-y-0 rounded-b-none'
        )}
      >
        <DialogHeader className="gap-1 px-6 pt-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
