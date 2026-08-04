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
import { Container } from '@/shared/components/atoms/Container';
import LanguageSwitcher from '@/shared/components/atoms/LanguageSwitcher';
import Logo from '@/shared/components/atoms/Logo';
import { Button } from '@/shared/components/atoms/ui/button';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { Spinner } from '@heroui/react';
import { ShieldCheck } from 'lucide-react';

export default function TwoFactorVerificationPage() {
  const t = useTranslations('loginPage');
  const router = useRouter();
  const { handleLogin, loginLoading } = useAuth();
  const [code, setCode] = useState('');
  const [pendingLogin, setPendingLogin] = useState<
    ReturnType<typeof getPendingTwoFactorLogin> | undefined
  >(undefined);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const pending = getPendingTwoFactorLogin();
      if (!pending) {
        router.replace('/login');
        return;
      }
      setPendingLogin(pending);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  const verifyCode = async () => {
    if (!pendingLogin || !/^\d{6}$/.test(code)) return;

    try {
      await handleLogin({ ...pendingLogin.credentials, code });
      clearPendingTwoFactorLogin();
      router.replace(pendingLogin.destination);
    } catch {
      setCode('');
    }
  };

  const backToLogin = () => {
    const destination = pendingLogin?.destination;
    clearPendingTwoFactorLogin();
    const loginUrl =
      destination && destination !== '/'
        ? `/login?from=${encodeURIComponent(destination)}`
        : '/login';
    router.replace(loginUrl);
  };

  if (!pendingLogin) return null;

  return (
    <PageBackground showHeader={false} className="items-stretch">
      <Container
        as="header"
        className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center py-5 md:py-7"
      >
        <span aria-hidden="true" />
        <Logo />
        <div className="justify-self-end">
          <LanguageSwitcher />
        </div>
      </Container>

      <Container
        as="section"
        className="relative z-10 flex flex-1 items-center justify-center py-10 md:py-16"
      >
        <div className="border-border/60 bg-background/80 w-full max-w-lg rounded-3xl border p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-xl sm:p-10">
          <div className="bg-primary/10 text-primary mb-6 flex size-14 items-center justify-center rounded-2xl">
            <ShieldCheck aria-hidden="true" className="size-7" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('twoFactorTitle')}
          </h1>
          <p className="text-muted-foreground mt-3 leading-7">
            {t('twoFactorDescription')}
          </p>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={event => {
              event.preventDefault();
              void verifyCode();
            }}
          >
            <div className="flex justify-center" dir="ltr">
              <TwoFactorCodeInput
                value={code}
                onChange={setCode}
                disabled={loginLoading}
                autoFocus
                label={t('twoFactorCode')}
              />
            </div>

            <Button
              type="submit"
              disabled={loginLoading || !/^\d{6}$/.test(code)}
              className="mt-2 h-12 w-full rounded-full text-base text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
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
              variant="outline"
              onClick={backToLogin}
              disabled={loginLoading}
              className="h-12 w-full rounded-full"
            >
              {t('backToLogin')}
            </Button>
          </form>
        </div>
      </Container>
    </PageBackground>
  );
}
