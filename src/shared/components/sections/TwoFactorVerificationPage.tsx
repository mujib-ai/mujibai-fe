'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  getVerificationErrorTranslationKey,
  requiresFreshLogin,
} from '@/features/auth/lib/auth-error';
import { AuthService } from '@/features/auth/services/auth.service';
import { TwoFactorCodeInput } from '@/features/security/molecules/TwoFactorCodeInput';
import { Container } from '@/shared/components/atoms/Container';
import LanguageSwitcher from '@/shared/components/atoms/LanguageSwitcher';
import Logo from '@/shared/components/atoms/Logo';
import { Button } from '@/shared/components/atoms/ui/button';
import { Spinner } from '@/shared/components/atoms/ui/spinner';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ShieldCheck } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface VerificationFormData {
  code: string;
}

export default function TwoFactorVerificationPage() {
  const t = useTranslations('loginPage');
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(
      z.object({
        code: z.string().regex(/^\d{6}$/, t('twoFactorCodeRequired')),
      })
    ),
    defaultValues: { code: '' },
    mode: 'onSubmit',
  });

  const verifyCode = handleSubmit(async ({ code }) => {
    try {
      const response = await AuthService.verifyTwoFactor(code);
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.replace(response.redirectTo);
    } catch (error) {
      const message = t(getVerificationErrorTranslationKey(error));
      if (requiresFreshLogin(error)) {
        toast.error(message);
        router.replace('/login');
        return;
      }

      setError('code', { type: 'server', message });
    }
  });

  const backToLogin = async () => {
    await AuthService.clearLocalSession().catch(() => undefined);
    router.replace('/login');
  };

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
            onSubmit={event => void verifyCode(event)}
          >
            <div className="flex justify-center" dir="ltr">
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                  <TwoFactorCodeInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    autoFocus
                    label={t('twoFactorCode')}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-full text-base transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  {t('loading')}
                </span>
              ) : (
                t('verifyCode')
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => void backToLogin()}
              disabled={isSubmitting}
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
