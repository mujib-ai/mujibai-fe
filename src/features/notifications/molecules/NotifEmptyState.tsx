import { type ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import { NotifIcon } from '../atoms/NotifIcon';

export function NotifEmptyState(): ReactElement {
  const t = useTranslations('notifications.empty');

  return (
    <div className="px-4 py-10 text-center">
      <div className="text-muted-foreground bg-muted mx-auto mb-3 flex size-10 items-center justify-center rounded-full">
        <NotifIcon name="check" size={18} />
      </div>
      <p className="text-sm font-semibold">{t('title')}</p>
      <p className="text-muted-foreground mt-1 text-xs">{t('subtitle')}</p>
    </div>
  );
}
