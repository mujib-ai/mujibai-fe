import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  NotificationSettingsPublic,
  UpdateNotificationSettingsPayload,
} from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class NotificationSettingsService {
  static async list(): Promise<NotificationSettingsPublic[]> {
    const { data } = await AxiosAPI.get<
      ApiEnvelope<NotificationSettingsPublic[]>
    >('/notification-settings');
    return data.data;
  }

  static async update(
    eventType: string,
    payload: UpdateNotificationSettingsPayload
  ): Promise<NotificationSettingsPublic> {
    const { data } = await AxiosAPI.patch<
      ApiEnvelope<NotificationSettingsPublic>
    >(`/notification-settings/${eventType}`, payload);
    return data.data;
  }
}
