'use client';

import type { ReactElement } from 'react';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTwoFactor, useTwoFactorStatus } from '../hooks/useTwoFactor';
import { getTwoFactorErrorTranslationKey } from '../lib/two-factor-error';
import { TwoFactorCodeInput } from '../molecules/TwoFactorCodeInput';
import { TwoFactorSetupDialog } from './TwoFactorSetupDialog';

export function TwoFactorSettingsCard(): ReactElement {
  const t = useTranslations('security.twoFactor');
  const { enabled, isLoading } = useTwoFactorStatus();
  const { disable, disableLoading } = useTwoFactor();

  const [setupOpen, setSetupOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const { control, handleSubmit, reset, setError } = useForm<{ code: string }>({
    resolver: zodResolver(
      z.object({
        code: z.string().regex(/^\d{6}$/, t('errors.codeRequired')),
      })
    ),
    defaultValues: { code: '' },
    mode: 'onSubmit',
  });

  const handleDisableOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    setDisableOpen(nextOpen);
  };

  const handleDisable = handleSubmit(async ({ code }) => {
    try {
      await disable({ code });
      handleDisableOpenChange(false);
    } catch (error) {
      setError('code', {
        type: 'server',
        message: t(
          getTwoFactorErrorTranslationKey(error, 'errors.disableFailed')
        ),
      });
    }
  });

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="bg-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div className="flex flex-col gap-2">
          <Badge variant={enabled ? 'default' : 'secondary'} className="w-fit">
            {enabled ? t('statusEnabled') : t('statusDisabled')}
          </Badge>
          <p className="text-muted-foreground max-w-xl text-sm">
            {t('subTitle')}
          </p>
        </div>

        {enabled ? (
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => setDisableOpen(true)}
          >
            {t('disableButton')}
          </Button>
        ) : (
          <Button disabled={isLoading} onClick={() => setSetupOpen(true)}>
            {t('enableButton')}
          </Button>
        )}
      </CardContent>

      <TwoFactorSetupDialog
        open={setupOpen}
        onOpenChange={setSetupOpen}
        onEnabled={() => setSetupOpen(false)}
      />

      <Dialog open={disableOpen} onOpenChange={handleDisableOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('disableDialog.title')}</DialogTitle>
            <DialogDescription>
              {t('disableDialog.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-2">
            <Controller
              name="code"
              control={control}
              render={({ field, fieldState }) => (
                <TwoFactorCodeInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disableLoading}
                  autoFocus
                  label={t('setup.codeLabel')}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleDisableOpenChange(false)}
            >
              {t('disableDialog.cancel')}
            </Button>
            <Button
              variant="destructive"
              disabled={disableLoading}
              onClick={() => void handleDisable()}
            >
              {t('disableDialog.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
