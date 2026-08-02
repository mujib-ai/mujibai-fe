'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { getAllowedRedirectFrom } from '@/features/auth/lib/redirect';
import { TwoFactorSetupDialog } from '@/features/security';
import { Button } from '@/shared/components/atoms/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function SecurityCheckPage() {
  const t = useTranslations('security.check');
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = getAllowedRedirectFrom(searchParams.get('from')) ?? '/';

  const [setupOpen, setSetupOpen] = useState(false);

  const goToDestination = () => router.push(destination);

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex w-full flex-col items-center justify-center gap-5 sm:w-[50%]">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-10 text-center sm:w-full md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
          <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-full">
            <ShieldCheck className="size-7" />
          </div>
          <h1 className="text-2xl font-semibold">{t('title')}</h1>
          <p className="text-muted-foreground text-sm">{t('subTitle')}</p>

          <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={goToDestination}
            >
              {t('skipButton')}
            </Button>
            <Button className="rounded-full" onClick={() => setSetupOpen(true)}>
              {t('enableButton')}
            </Button>
          </div>
        </div>
      </div>

      <TwoFactorSetupDialog
        open={setupOpen}
        onOpenChange={setSetupOpen}
        onEnabled={goToDestination}
      />
    </div>
  );
}
