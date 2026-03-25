'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/atoms/ui/dialog';
import { useRequestChangeEmail, useVerifyOtp } from '../../hooks';
import type { ChangeEmailDto, VerifyOtpDto } from '../../types';
import SettingsFormField from '../atoms/SettingsFormField';

export default function ChangeEmailForm() {
  const t = useTranslations('settings.accountSettings');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const { requestChangeEmail, isRequesting } = useRequestChangeEmail();
  const { verifyOtp, isVerifying } = useVerifyOtp();

  const emailForm = useForm<ChangeEmailDto>();
  const otpForm = useForm<VerifyOtpDto>();

  const onEmailSubmit = async (data: ChangeEmailDto) => {
    await requestChangeEmail(data);
    setStep(2);
  };

  const onOtpSubmit = async (data: VerifyOtpDto) => {
    await verifyOtp(data);
    setIsOpen(false);
    setStep(1);
    otpForm.reset();
    emailForm.reset();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{t('changeEmail')}</h1>
        <p className="text-sm text-gray-400">{t('changeEmailDescription')}</p>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setStep(1);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full px-8 py-2 font-semibold">
            {t('changeEmail')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {step === 1 ? t('changeEmail') : t('verifyOtp')}
            </DialogTitle>
          </DialogHeader>

          {step === 1 ? (
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="flex flex-col gap-4"
            >
              <SettingsFormField
                id="newEmail"
                label={t('newEmail')}
                placeholder={t('newEmailPlaceholder')}
                {...emailForm.register('newEmail', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={isRequesting}>
                  {isRequesting ? 'Requesting...' : t('saveChanges')}
                </Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="flex flex-col gap-4"
            >
              <p className="text-sm text-gray-400">{t('verifyOtpDescription')}</p>
              <SettingsFormField
                id="otp"
                label={t('otp')}
                placeholder={t('otpPlaceholder')}
                {...otpForm.register('otp', { required: true })}
              />
              <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : t('verifyOtp')}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
