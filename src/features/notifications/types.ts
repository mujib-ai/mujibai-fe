export type NotificationSeverity = 'info' | 'success' | 'warning' | 'critical';

export interface NotificationPublic {
  id: string;
  eventType: string;
  severity: NotificationSeverity;
  title: string;
  body: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  readAt?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface GetNotificationsQuery {
  eventType?: string;
  severity?: NotificationSeverity;
  readStatus?: boolean;
  dateFrom?: string;
  dateTo?: string;
  after?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedNotifications {
  items: NotificationPublic[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export type NotificationTab = 'all' | 'unread';

export type NotificationChannel = 'in_app' | 'email' | 'slack' | 'whatsapp';

export type NotificationFrequency =
  | 'immediate'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'disabled';

export interface NotificationSettingsPublic {
  eventType: string;
  channels: NotificationChannel[];
  frequency: NotificationFrequency;
  threshold: number | null;
  mandatory: boolean;
  supportsThreshold: boolean;
  allowedChannels: NotificationChannel[];
  allowedFrequencies: NotificationFrequency[];
}

export interface UpdateNotificationSettingsPayload {
  channels: NotificationChannel[];
  frequency: NotificationFrequency;
  threshold?: number | null;
}

export interface NotificationCreatedEvent {
  type: 'notification.created';
  data: NotificationPublic;
}

export interface NotificationUpdatedEvent {
  type: 'notification.updated';
  data: NotificationPublic;
}

export interface NotificationDeletedEvent {
  type: 'notification.deleted';
  data: { id: string };
}

export interface NotificationReadEvent {
  type: 'notification.read';
  data: { id: string; unreadCount: number };
}

export interface NotificationsReadAllEvent {
  type: 'notifications.read_all';
  data: { unreadCount: 0 };
}

export interface NotificationsUnreadCountEvent {
  type: 'notifications.unread_count';
  data: { unreadCount: number };
}

export interface ConnectionReadyEvent {
  type: 'connection.ready';
  data: { unreadCount: number; serverTime: string };
}

export interface NotificationSocketErrorEvent {
  type: 'error';
  data: { code: string; message: string };
}

export interface NotificationSocketPingEvent {
  type: 'ping';
  data: Record<string, never>;
}

export type NotificationSocketEvent =
  | ConnectionReadyEvent
  | NotificationCreatedEvent
  | NotificationUpdatedEvent
  | NotificationDeletedEvent
  | NotificationReadEvent
  | NotificationsReadAllEvent
  | NotificationsUnreadCountEvent
  | NotificationSocketErrorEvent
  | NotificationSocketPingEvent;
