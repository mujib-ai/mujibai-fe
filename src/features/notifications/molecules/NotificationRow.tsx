'use client';

import type { ReactElement } from 'react';

import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

import { NotifIcon } from '../atoms/NotifIcon';
import { NOTIFICATION_SEVERITY_META } from '../constants/notifTypeMeta';
import type { NotificationPublic } from '../types';

interface NotificationRowProps {
  notification: NotificationPublic;
  onRowClick: () => void;
  onRemove: () => void;
}

export function NotificationRow({
  notification,
  onRowClick,
  onRemove,
}: NotificationRowProps): ReactElement {
  const t = useTranslations('notifications');
  const format = useFormatter();
  const meta = NOTIFICATION_SEVERITY_META[notification.severity];
  const isUnread = !notification.readAt;

  const date = new Date(notification.createdAt);
  const time = Number.isNaN(date.getTime())
    ? ''
    : format.relativeTime(date, new Date());

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition-colors dark:bg-[#00143473]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('row.actions')}
            className="text-muted-foreground size-8 shrink-0 rounded-full"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onRemove} variant="destructive">
            {t('row.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <span
        aria-hidden
        className={`mt-1 size-2 shrink-0 rounded-full ${
          isUnread ? 'bg-destructive' : 'bg-transparent'
        }`}
      />

      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-full ${meta.className}`}
      >
        <NotifIcon name={meta.icon} size={18} />
      </div>

      <Link
        href={`/dashboard/notifications/${notification.id}`}
        onClick={onRowClick}
        className="min-w-0 flex-1"
      >
        <p className="truncate text-sm font-medium">{notification.title}</p>
        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
          {notification.body}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-muted-foreground text-[11px]">{time}</span>
          {notification.severity === 'critical' && (
            <Badge variant="destructive" className="h-4 px-1.5 text-[10px]">
              {t('chips.critical')}
            </Badge>
          )}
          {notification.severity === 'warning' && (
            <Badge
              variant="secondary"
              className="h-4 bg-amber-500/10 px-1.5 text-[10px] text-amber-700"
            >
              {t('chips.warning')}
            </Badge>
          )}
        </div>
      </Link>
    </div>
  );
}
