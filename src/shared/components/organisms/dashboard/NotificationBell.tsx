'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  NotificationsPanel,
  useNotifications,
  useNotificationsPanelDismiss,
} from '@/features/notifications';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { popoverEnter, popoverExit } from '@/shared/lib/motion';
import { useGsapPresence } from '@/shared/lib/motion/usePresence';

export default function NotificationBell() {
  const t = useTranslations('notifications');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ref: panelRef, rendered: panelRendered } =
    useGsapPresence<HTMLDivElement>(open, popoverEnter, popoverExit);

  const {
    notifications,
    isLoading,
    isError,
    unreadCount,
    markRead,
    markAllRead,
    markAllReadLoading,
  } = useNotifications();

  useNotificationsPanelDismiss(open, () => setOpen(false), panelRef, buttonRef);

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        aria-label={t('title')}
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="rounded-full hover:bg-white/10 dark:hover:bg-black/10"
      >
        <div className="relative">
          <ThemedIcon name="bell" className="size-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -end-2 -top-2 h-4 min-w-4 justify-center rounded-full px-1 text-[10px] leading-none"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </div>
      </Button>

      {panelRendered && (
        <div
          ref={panelRef}
          className="bg-background text-foreground absolute end-0 top-full z-50 mt-2 w-[min(28rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border shadow-lg"
        >
          <NotificationsPanel
            notifications={notifications}
            isLoading={isLoading}
            isError={isError}
            unreadCount={unreadCount}
            markAllReadLoading={markAllReadLoading}
            onClose={() => setOpen(false)}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
          />
        </div>
      )}
    </div>
  );
}
