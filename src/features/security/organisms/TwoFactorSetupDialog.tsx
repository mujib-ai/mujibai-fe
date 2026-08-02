'use client';

import { type ReactElement, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';

import { useTwoFactor } from '../hooks/useTwoFactor';
import { TwoFactorCodeInput } from '../molecules/TwoFactorCodeInput';
import type { TwoFactorSetupResponse } from '../types';

interface TwoFactorSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnabled: () => void;
}

export function TwoFactorSetupDialog({
  open,
  onOpenChange,
  onEnabled,
}: TwoFactorSetupDialogProps): ReactElement {
  const t = useTranslations('security.twoFactor');
  const { startSetup, verifySetup, verifySetupLoading } = useTwoFactor();

  const [setupData, setSetupData] = useState<TwoFactorSetupResponse | null>(
    null
  );
  const [showSecret, setShowSecret] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!open) return;

    startSetup()
      .then(setSetupData)
      .catch(() => {
        // error toast handled in useTwoFactor
      });
  }, [open, startSetup]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSetupData(null);
      setShowSecret(false);
      setCode('');
    }
    onOpenChange(nextOpen);
  };

  const handleVerify = async () => {
    try {
      const result = await verifySetup({ code });
      if (result.isTwoFactorEnabled) {
        handleOpenChange(false);
        onEnabled();
      }
    } catch {
      setCode('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('setup.title')}</DialogTitle>
          <DialogDescription>{t('setup.description')}</DialogDescription>
        </DialogHeader>

        <p className="text-sm">{t('setup.step1')}</p>

        {setupData ? (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl bg-white p-3">
              <Image
                src={setupData.qrCode}
                alt={t('setup.title')}
                width={168}
                height={168}
              />
            </div>
            <p className="text-muted-foreground text-center text-sm">
              {t('setup.step2')}
            </p>
            <button
              type="button"
              className="text-primary text-xs underline"
              onClick={() => setShowSecret(prev => !prev)}
            >
              {showSecret ? t('setup.hideSecretKey') : t('setup.showSecretKey')}
            </button>
            {showSecret && (
              <code className="bg-control rounded-lg px-3 py-1.5 text-xs break-all">
                {setupData.manualEntryKey}
              </code>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-6">
            <div className="border-primary size-8 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">{t('setup.step3')}</p>
          <TwoFactorCodeInput
            value={code}
            onChange={setCode}
            disabled={!setupData || verifySetupLoading}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t('setup.cancel')}
          </Button>
          <Button
            onClick={handleVerify}
            disabled={!setupData || code.length !== 6 || verifySetupLoading}
          >
            {t('setup.verify')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
