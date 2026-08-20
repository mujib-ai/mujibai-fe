'use client';

import Link from 'next/link';

import { useResetPasswordForm } from '@/features/auth';
import { Button } from '@/shared/components/atoms/ui/button';
import { PasswordField } from '@/shared/components/molecules/PasswordField';
import {
  ResetPasswordAlert,
  ResetPasswordHeader,
} from '@/shared/components/molecules/ResetPasswordComponents';

export default function ResetPasswordPage({ token }: { token: string }) {
  const {
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid,
    tokenIsValid,
    alert,
    getFieldProps,
    t,
  } = useResetPasswordForm({ token });

  const showNewLinkAction = !tokenIsValid || alert.type === 'error';

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex w-full max-w-xl flex-col items-center justify-center gap-5 px-4">
        <ResetPasswordHeader />

        <div className="w-full rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-8 dark:bg-[#06B6D40F]">
          <ResetPasswordAlert
            alert={
              tokenIsValid
                ? alert
                : {
                    type: 'error',
                    title: t('invalidLinkTitle'),
                    description: t('invalidLink'),
                  }
            }
          />

          <h1 className="text-2xl font-semibold">{t('title')}</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-5"
          >
            <PasswordField
              id="newPassword"
              label={t('newPassword')}
              placeholder={t('placeholder')}
              {...getFieldProps('newPassword')}
            />

            <PasswordField
              id="confirmPassword"
              label={t('confirmPassword')}
              placeholder={t('placeholder')}
              {...getFieldProps('confirmPassword')}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-md mt-2 w-full rounded-full py-5 capitalize disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>

          {showNewLinkAction && (
            <Link
              href="/forgot-password"
              className="text-primary block text-center text-sm font-semibold hover:underline"
            >
              {t('requestNewLink')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
