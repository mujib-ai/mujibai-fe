'use client';

import { useTranslations } from 'next-intl';

import { CopyButton } from '@/shared/components/atoms/CopyButton';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface RevealApiKeySecretDialogProps {
  open: boolean;
  onClose: () => void;
  fullKey: string | null;
}

export default function RevealApiKeySecretDialog({
  open,
  onClose,
  fullKey,
}: RevealApiKeySecretDialogProps) {
  const t = useTranslations('APIKeys');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
            <AlertTriangle className="size-6 text-amber-600 dark:text-amber-500" />
          </div>
          <DialogTitle className="text-center">{t('reveal.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('reveal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="border-input dark:bg-input/30 flex min-w-0 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2">
          <code className="min-w-0 flex-1 truncate font-mono text-sm select-all">
            {fullKey}
          </code>
          {fullKey && <CopyButton value={fullKey} />}
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            {t('reveal.done')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
