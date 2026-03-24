'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/atoms/ui/dialog';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import type { ApiKey } from '../../types';

interface EditApiKeyDialogProps {
  apiKey: ApiKey | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: { name: string }) => Promise<void>;
  isLoading?: boolean;
}

export function EditApiKeyDialog({
  apiKey,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: EditApiKeyDialogProps) {
  const t = useTranslations('APIKeys');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (apiKey) {
      setName(apiKey.name);
    }
  }, [apiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !name.trim()) return;
    await onSubmit(apiKey.id, { name });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('editApiKey') || 'Edit API Key'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="editApiKeyName">{t('name')}</Label>
            <Input
              id="editApiKeyName"
              placeholder={t('namePlaceholder') || 'Enter API key name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isLoading || !name.trim()}>
              {isLoading ? t('updating') : t('update')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
