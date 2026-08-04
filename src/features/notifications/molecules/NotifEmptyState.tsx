import { type ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import { EmptyState } from '@/shared/components/molecules/EmptyState';
import { CheckCheck } from 'lucide-react';

export function NotifEmptyState(): ReactElement {
  const t = useTranslations('notifications.empty');

  return (
    <EmptyState
      icon={CheckCheck}
      title={t('title')}
      description={t('subtitle')}
    />
  );
}
