import { type ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import { X } from 'lucide-react';

interface NotifPanelHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
  markAllReadLoading: boolean;
  onClose: () => void;
}

export function NotifPanelHeader({
  unreadCount,
  onMarkAllRead,
  markAllReadLoading,
  onClose,
}: NotifPanelHeaderProps): ReactElement {
  const t = useTranslations('notifications.panel');

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div>
        <p className="text-sm font-semibold">{t('title')}</p>
        <p className="text-muted-foreground text-xs">
          {t('unreadSummary', { count: unreadCount })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onMarkAllRead}
          disabled={!unreadCount || markAllReadLoading}
        >
          {t('markAllRead')}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label={t('close')}
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
