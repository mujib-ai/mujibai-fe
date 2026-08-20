'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { Spinner } from '@/shared/components/atoms/ui/spinner';
import { AlertTriangle } from 'lucide-react';

import type { DeleteSourceDialogProps } from '../../interfaces';

export default function DeleteSourceDialog({
  source,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteSourceDialogProps) {
  const t = useTranslations('KnowledgeBase.confirm');

  return (
    <Dialog
      open={!!source}
      onOpenChange={isOpen => !isOpen && !isDeleting && onClose()}
    >
      <DialogContent showCloseButton={!isDeleting} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500">
            <AlertTriangle className="size-6" />
          </div>
          <DialogTitle>{t('deleteTitle')}</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-center text-sm">
          {t('deleteMessage', { name: source?.name ?? '' })}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            {t('deleteCancel')}
          </Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" />
                {t('deleteConfirm')}
              </span>
            ) : (
              t('deleteConfirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
