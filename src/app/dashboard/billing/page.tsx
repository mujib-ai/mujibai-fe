import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('billingPage');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default async function BillingPage() {
  const t = await getTranslations('billingPage');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-white/75 p-4 shadow-sm dark:bg-[#001434A6]">
        <p className="text-foreground text-sm">{t('comingSoon')}</p>
      </div>
    </div>
  );
}
