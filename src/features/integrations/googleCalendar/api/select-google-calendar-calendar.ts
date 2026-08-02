import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GoogleCalendarIntegration } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function selectGoogleCalendarCalendar(
  calendarId: string
): Promise<GoogleCalendarIntegration> {
  const { data } = await AxiosAPI.put<ApiEnvelope<GoogleCalendarIntegration>>(
    '/integrations/google-calendar/calendar',
    { calendarId }
  );
  return data.data;
}
