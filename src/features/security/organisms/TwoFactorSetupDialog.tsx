'use client';

import { type ReactElement, useState } from 'react';

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
import { Spinner } from '@/shared/components/atoms/ui/spinner';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, KeyRound, ShieldCheck } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTwoFactor } from '../hooks/useTwoFactor';
import { getTwoFactorErrorTranslationKey } from '../lib/two-factor-error';
import { TwoFactorCodeInput } from '../molecules/TwoFactorCodeInput';
import type { TwoFactorSetupResponse } from '../types';

interface TwoFactorSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnabled: () => void;
}

const STEPS = [1, 2] as const;
type Step = (typeof STEPS)[number];

function Stepper({
  step,
  labels,
}: {
  step: Step;
  labels: [string, string];
}): ReactElement {
  return (
    <div className="flex shrink-0 flex-col gap-6 sm:w-40">
      {STEPS.map((num, index) => {
        const isActive = step === num;
        const isDone = step > num;
        return (
          <div key={num} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold',
                  isActive
                    ? 'border-primary text-primary'
                    : isDone
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground/60'
                )}
              >
                {isDone ? <Check className="size-3.5" /> : num}
              </span>
              {index < STEPS.length - 1 && (
                <span
                  className={cn(
                    'mt-1 h-8 w-px',
                    isDone ? 'bg-primary' : 'bg-muted-foreground/20'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'pt-0.5 text-sm font-medium',
                isActive
                  ? 'text-foreground'
                  : isDone
                    ? 'text-foreground'
                    : 'text-muted-foreground/60'
              )}
            >
              {labels[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function TwoFactorSetupDialog({
  open,
  onOpenChange,
  onEnabled,
}: TwoFactorSetupDialogProps): ReactElement {
  const t = useTranslations('security.twoFactor');
  const { startSetup, startSetupLoading, verifySetup, verifySetupLoading } =
    useTwoFactor();

  const [step, setStep] = useState<Step>(1);
  const [setupData, setSetupData] = useState<TwoFactorSetupResponse | null>(
    null
  );
  const [showSecret, setShowSecret] = useState(false);
  const { control, handleSubmit, reset, setError } = useForm<{ code: string }>({
    resolver: zodResolver(
      z.object({
        code: z.string().regex(/^\d{6}$/, t('errors.codeRequired')),
      })
    ),
    defaultValues: { code: '' },
    mode: 'onSubmit',
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStep(1);
      setSetupData(null);
      setShowSecret(false);
      reset();
    }
    onOpenChange(nextOpen);
  };

  const handleNext = () => {
    startSetup()
      .then(data => {
        setSetupData(data);
        setStep(2);
      })
      .catch(() => {
        // error toast handled in useTwoFactor
      });
  };

  const handleVerify = handleSubmit(async ({ code }) => {
    try {
      const result = await verifySetup({ code });
      if (result.isTwoFactorEnabled) {
        handleOpenChange(false);
        onEnabled();
      }
    } catch (error) {
      setError('code', {
        type: 'server',
        message: t(
          getTwoFactorErrorTranslationKey(error, 'errors.enableFailed')
        ),
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('setup.title')}</DialogTitle>
          <DialogDescription>{t('setup.description')}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 sm:flex-row">
          <Stepper
            step={step}
            labels={[t('setup.stepper.step1'), t('setup.stepper.step2')]}
          />

          <div className="flex flex-1 flex-col gap-4 border-t pt-4 sm:border-s sm:border-t-0 sm:ps-6 sm:pt-0">
            {step === 1 ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                  <ShieldCheck className="size-6" />
                </div>
                <p className="text-sm">{t('setup.step1')}</p>
              </div>
            ) : (
              <>
                {setupData ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="rounded-xl bg-white p-3">
                      <Image
                        src={setupData.qrCode}
                        alt={t('setup.qrCodeAlt')}
                        width={168}
                        height={168}
                      />
                    </div>
                    <p className="text-muted-foreground text-center text-sm">
                      {t('setup.step2')}
                    </p>
                    <button
                      type="button"
                      className="text-primary flex items-center gap-1 text-xs underline"
                      onClick={() => setShowSecret(prev => !prev)}
                    >
                      <KeyRound className="size-3" />
                      {showSecret
                        ? t('setup.hideSecretKey')
                        : t('setup.showSecretKey')}
                    </button>
                    {showSecret && (
                      <code className="bg-control rounded-lg px-3 py-1.5 text-xs break-all">
                        {setupData.manualEntryKey}
                      </code>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center py-6">
                    <Spinner className="text-primary size-8" />
                  </div>
                )}

                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm">{t('setup.step3')}</p>
                  <Controller
                    name="code"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TwoFactorCodeInput
                        value={field.value}
                        onChange={field.onChange}
                        disabled={!setupData || verifySetupLoading}
                        label={t('setup.codeLabel')}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                {t('setup.cancel')}
              </Button>
              <Button onClick={handleNext} disabled={startSetupLoading}>
                {t('setup.next')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                {t('setup.previous')}
              </Button>
              <Button
                onClick={() => void handleVerify()}
                disabled={!setupData || verifySetupLoading}
              >
                {t('setup.verify')}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
