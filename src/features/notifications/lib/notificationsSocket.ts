import { getAccessToken } from '@/shared/lib/auth-token';

import type { NotificationSocketEvent } from '../types';

const SERVER_EVENT_TYPES = new Set<NotificationSocketEvent['type']>([
  'connection.ready',
  'notification.created',
  'notification.updated',
  'notification.deleted',
  'notification.read',
  'notifications.read_all',
  'notifications.unread_count',
  'error',
  'ping',
]);

/**
 * A native browser WebSocket can't set an Authorization header on the
 * handshake, so the access token is passed as a query param instead. This
 * relies on the backend accepting `?token=` as a fallback auth method for
 * this endpoint — confirm with backend before relying on this in production.
 */
export function getNotificationsWebSocketUrl(): string {
  const value = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_URL;
  if (!value) throw new Error('configuration');

  const url = new URL(value);
  if (!['ws:', 'wss:'].includes(url.protocol)) throw new Error('configuration');
  if (window.location.protocol === 'https:' && url.protocol !== 'wss:')
    throw new Error('configuration');

  const token = getAccessToken();
  if (!token) throw new Error('unauthenticated');
  url.searchParams.set('token', token);

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
