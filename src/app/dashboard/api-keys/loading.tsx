'use client';

import { useLocale, useTranslations } from 'next-intl';

import ApiKeysTableSkeleton from '@/features/apiKeys/ui/organisms/ApiKeysTableSkeleton';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

export default function ApiKeysLoading() {
  const t = useTranslations('APIKeys');
  const locale = useLocale();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="bg-surface z-50 h-full w-full rounded-2xl p-4 shadow-sm">
        <ApiKeysTableSkeleton
          locale={locale}
          headers={{
            name: t('name'),
            secretKey: t('secretKey'),
            environment: t('environment'),
            status: t('status'),
            scopes: t('scopesLabel'),
            createdOn: t('createdOn'),
            expiresAt: t('create.expiresAt'),
            lastUsed: t('lastUsed'),
            actions: t('actions'),
          }}
        />
      </div>
    </div>
  );
}
