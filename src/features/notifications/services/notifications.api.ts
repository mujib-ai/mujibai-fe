import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  GetNotificationsQuery,
  NotificationPublic,
  PaginatedNotifications,
} from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class NotificationService {
  static async list(
    query: GetNotificationsQuery = {}
  ): Promise<PaginatedNotifications> {
    const { data } = await AxiosAPI.get<ApiEnvelope<PaginatedNotifications>>(
      '/notifications',
      { params: query }
    );
    return data.data;
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
}
