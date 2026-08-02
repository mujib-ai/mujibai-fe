'use client';

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
import { Spinner } from '@heroui/react';
import { AlertTriangle } from 'lucide-react';

import type { ApiKeyPublic } from '../../types';

interface RevokeApiKeyDialogProps {
  apiKey: ApiKeyPublic | null;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function RevokeApiKeyDialog({
  apiKey,
  onClose,
  onConfirm,
  loading,
}: RevokeApiKeyDialogProps) {
  const t = useTranslations('APIKeys');

  return (
    <Dialog open={!!apiKey} onOpenChange={open => !open && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
            <AlertTriangle className="size-6 text-red-600 dark:text-red-500" />
          </div>
          <DialogTitle className="text-center">{t('revoke.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('revoke.message', { name: apiKey?.name ?? '' })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild onClick={onClose}>
            <Button className="w-fit" variant="outline">
              {t('revoke.cancel')}
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={loading} onClick={onConfirm}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" color="current" />
                {t('revoke.confirm')}
              </span>
            ) : (
              t('revoke.confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
