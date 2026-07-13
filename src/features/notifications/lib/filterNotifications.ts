import type { NotificationPublic, NotificationTab } from '../types';

export function filterNotifications(
  items: NotificationPublic[],
  tab: NotificationTab
): NotificationPublic[] {
  if (tab === 'unread') return items.filter(n => !n.readAt);
  return items;
}

export function countUnread(items: NotificationPublic[]): number {
  return items.filter(n => !n.readAt).length;
}

export const NOTIFICATION_TABS: NotificationTab[] = ['all', 'unread'];
