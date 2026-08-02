'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import useAuth from '@/features/auth/hooks/useAuth';
import {
  clearPendingTwoFactorLogin,
  getPendingTwoFactorLogin,
} from '@/features/auth/lib/pending-two-factor';
import { TwoFactorCodeInput } from '@/features/security/molecules/TwoFactorCodeInput';
import { Button } from '@/shared/components/atoms/ui/button';
import { LoginHeader } from '@/shared/components/molecules/LoginComponents';
import { Spinner } from '@heroui/react';

export default function TwoFactorVerificationPage() {
  const t = useTranslations('loginPage');
  const router = useRouter();
  const { handleLogin, loginLoading } = useAuth();
  const [code, setCode] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!getPendingTwoFactorLogin()) {
      router.replace('/login');
      return;
    }
    setIsReady(true);
  }, [router]);

  const verifyCode = async () => {
    const pending = getPendingTwoFactorLogin();
    if (!pending || code.length !== 6) return;

    try {
      await handleLogin({ ...pending.credentials, code });
      clearPendingTwoFactorLogin();
      router.replace(pending.destination);
    } catch {
      setCode('');
    }
  };

  const backToLogin = () => {
    const destination = getPendingTwoFactorLogin()?.destination;
    clearPendingTwoFactorLogin();
    const loginUrl =
      destination && destination !== '/'
        ? `/login?from=${encodeURIComponent(destination)}`
        : '/login';
    router.replace(loginUrl);
  };

  if (!isReady) return null;

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex h-[50%] w-full flex-col items-center justify-center gap-5 sm:w-[50%]">
        <LoginHeader />
        <div className="rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-10 sm:w-full md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
          <h1 className="text-2xl font-semibold">{t('twoFactorTitle')}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t('twoFactorDescription')}
          </p>

          <form
            className="flex flex-col gap-4 py-5"
            onSubmit={event => {
              event.preventDefault();
              void verifyCode();
            }}
          >
            <div className="flex justify-center">
              <TwoFactorCodeInput
                value={code}
                onChange={setCode}
                disabled={loginLoading}
                autoFocus
              />
            </div>
            <Button
              type="submit"
              disabled={loginLoading || code.length !== 6}
              className="text-md mt-2 w-full rounded-full py-5 text-white capitalize transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loginLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" color="current" />
                  {t('loading')}
                </span>
              ) : (
                t('verifyCode')
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={backToLogin}
              disabled={loginLoading}
            >
              {t('backToLogin')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
