import type { NotificationSocketEvent } from '../types';

const SERVER_EVENT_TYPES = new Set<NotificationSocketEvent['type']>([
  'connection.ready',
  'notification.created',
  'notification.deleted',
  'notifications.deleted_all',
  'notification.read',
  'notifications.read_all',
  'notifications.unread_count',
  'error',
  'ping',
]);

export function getNotificationsWebSocketUrl(): string {
  const value = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_URL;
  if (!value) throw new Error('configuration');

  const url = new URL(value);
  if (!['ws:', 'wss:'].includes(url.protocol)) throw new Error('configuration');
  if (window.location.protocol === 'https:' && url.protocol !== 'wss:')
    throw new Error('configuration');

  url.search = '';
  url.hash = '';

  return url.toString();
}

export function parseNotificationSocketEvent(
  value: string
): NotificationSocketEvent | null {
  try {
    const event: unknown = JSON.parse(value);
    if (
      !event ||
      typeof event !== 'object' ||
      !('type' in event) ||
      typeof event.type !== 'string' ||
      !SERVER_EVENT_TYPES.has(event.type as NotificationSocketEvent['type'])
    ) {
      return null;
    }
    return event as NotificationSocketEvent;
  } catch {
    return null;
  }
}
