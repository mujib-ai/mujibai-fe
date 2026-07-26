import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GoogleCalendarIntegration } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function getGoogleCalendarIntegration(): Promise<GoogleCalendarIntegration> {
  const { data } = await AxiosAPI.get<ApiEnvelope<GoogleCalendarIntegration>>(
    '/integrations/google-calendar'
  );
  return data.data;
}
