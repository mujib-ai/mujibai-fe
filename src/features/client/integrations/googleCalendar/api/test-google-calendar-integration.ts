import { AxiosAPI } from '@/shared/utils/axiosInstance';

export async function testGoogleCalendarIntegration(): Promise<void> {
  await AxiosAPI.post('/integrations/google-calendar/test');
}
