'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/shared/components/atoms/ui/dialog';
import { Button } from '@/shared/components/atoms/ui/button';
import type { ApiKey } from '../../types';

interface DeleteApiKeyDialogProps {
  apiKey: ApiKey | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function DeleteApiKeyDialog({
  apiKey,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: DeleteApiKeyDialogProps) {
  const t = useTranslations('APIKeys');

  const handleDelete = async () => {
    if (!apiKey) return;
    await onSubmit(apiKey.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">{t('deleteApiKey') || 'Delete API Key'}</DialogTitle>
          <DialogDescription>
            {t('deleteApiKeyDescription') || 'Are you sure you want to delete this API key? This action cannot be undone.'}
          </DialogDescription>
        </DialogHeader>
        {apiKey && (
          <div className="py-2">
            <span className="font-semibold">{t('name')}:</span> {apiKey.name}
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            {t('cancel')}
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? t('deleting') : t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
