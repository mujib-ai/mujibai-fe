import React from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function LogoutDailog({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  const t = useTranslations('landingPage.logoutDialog');
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
            <AlertTriangle className="size-6 text-red-600 dark:text-red-500" />
          </div>
          <DialogTitle className="text-center">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('message')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild onClick={onClose}>
            <Button className="w-fit" variant="outline">
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {t('confirm')}
              </span>
            ) : (
              t('confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
