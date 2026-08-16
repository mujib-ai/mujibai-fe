import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  GetNotificationsQuery,
  NotificationPublic,
  NotificationsPagination,
  PaginatedNotifications,
} from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

const EMPTY_PAGINATION: NotificationsPagination = {
  page: 1,
  limit: 0,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
};

function findArray(value: unknown, depth = 0): NotificationPublic[] | null {
  if (Array.isArray(value)) return value;
  if (depth < 3 && value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of ['data', 'items', 'notifications']) {
      const found = findArray(record[key], depth + 1);
      if (found) return found;
    }
  }
  return null;
}

function extractItems(value: unknown): NotificationPublic[] {
  return findArray(value) ?? [];
}

function extractPagination(value: unknown): NotificationsPagination | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (record.pagination && typeof record.pagination === 'object') {
    return record.pagination as NotificationsPagination;
  }
  if (typeof record.total === 'number') {
    return record as unknown as NotificationsPagination;
  }
  if (typeof record.data === 'object') return extractPagination(record.data);
  return null;
}

export class NotificationService {
  static async list(
    query: GetNotificationsQuery = {}
  ): Promise<PaginatedNotifications> {
    const { data } = await AxiosAPI.get('/notifications', { params: query });

    return {
      items: extractItems(data),
      pagination: extractPagination(data) ?? EMPTY_PAGINATION,
    };
  }

  static async unreadCount(): Promise<number> {
    const { data } = await AxiosAPI.get<ApiEnvelope<{ count: number }>>(
      '/notifications/unread-count'
    );
    return data.data.count;
  }

  static async markRead(notificationId: string): Promise<NotificationPublic> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<NotificationPublic>>(
      `/notifications/${notificationId}/read`
    );
    return data.data;
  }

  static async markAllRead(): Promise<void> {
    await AxiosAPI.post('/notifications/read-all');
  }

  static async remove(notificationId: string): Promise<void> {
    await AxiosAPI.delete(`/notifications/${notificationId}`);
  }
  static async removeAll(): Promise<void> {
    await AxiosAPI.delete('/notifications');
  }
}
