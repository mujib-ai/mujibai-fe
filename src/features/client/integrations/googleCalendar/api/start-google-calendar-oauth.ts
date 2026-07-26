import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GoogleCalendarOAuthStart } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function startGoogleCalendarOAuth(): Promise<GoogleCalendarOAuthStart> {
  const { data } = await AxiosAPI.get<ApiEnvelope<GoogleCalendarOAuthStart>>(
    '/integrations/google-calendar/oauth/start'
  );
  return data.data;
}
