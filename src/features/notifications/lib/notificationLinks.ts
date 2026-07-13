import type { NotificationPublic } from '../types';

const RESOURCE_ROUTES: Record<string, string> = {
  ticket: '/dashboard/tickets',
  call: '/dashboard/calls',
  settings: '/dashboard/settings',
};

export function getNotificationHref(
  notification: NotificationPublic
): string | null {
  if (!notification.resourceType) return null;
  return RESOURCE_ROUTES[notification.resourceType] ?? null;
}
