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
