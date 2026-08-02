import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { NotificationPreferences } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class NotificationPreferencesService {
  static async get(): Promise<NotificationPreferences> {
    const { data } = await AxiosAPI.get<ApiEnvelope<NotificationPreferences>>(
      '/notification-preferences'
    );
    return data.data;
  }

  static async update(
    preferences: NotificationPreferences
  ): Promise<NotificationPreferences> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<NotificationPreferences>>(
      '/notification-preferences',
      preferences
    );
    return data.data;
  }
}
