import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GoogleCalendarCalendarsPage } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function getGoogleCalendarCalendars(
  cursor?: string | null
): Promise<GoogleCalendarCalendarsPage> {
  const { data } = await AxiosAPI.get<ApiEnvelope<GoogleCalendarCalendarsPage>>(
    '/integrations/google-calendar/calendars',
    { params: cursor ? { cursor } : undefined }
  );
  return data.data;
}
