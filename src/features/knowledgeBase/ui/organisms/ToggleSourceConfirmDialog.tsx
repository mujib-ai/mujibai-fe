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
import { EyeOff } from 'lucide-react';

import type { ToggleSourceConfirmDialogProps } from '../../interfaces';

export default function ToggleSourceConfirmDialog({
  source,
  onClose,
  onConfirm,
  isToggling,
}: ToggleSourceConfirmDialogProps) {
  const t = useTranslations('KnowledgeBase.confirm');

  return (
    <Dialog
      open={!!source}
      onOpenChange={isOpen => !isOpen && !isToggling && onClose()}
    >
      <DialogContent showCloseButton={!isToggling} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            <EyeOff className="size-6" />
          </div>
          <DialogTitle>{t('disableTitle')}</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-center text-sm">
          {t('disableMessage', { name: source?.name ?? '' })}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isToggling}>
            {t('disableCancel')}
          </Button>
          <Button disabled={isToggling} onClick={onConfirm}>
            {isToggling ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" />
                {t('disableConfirm')}
              </span>
            ) : (
              t('disableConfirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
