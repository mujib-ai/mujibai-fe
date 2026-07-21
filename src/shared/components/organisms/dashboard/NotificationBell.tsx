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
import { AnimatePresence, motion } from 'framer-motion';

export default function NotificationBell() {
  const t = useTranslations('notifications');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="bg-background text-foreground absolute end-0 top-full z-50 mt-2 w-80 origin-top-right overflow-hidden rounded-2xl border shadow-lg"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
