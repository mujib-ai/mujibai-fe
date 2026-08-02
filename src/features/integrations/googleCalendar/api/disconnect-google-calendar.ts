import { AxiosAPI } from '@/shared/utils/axiosInstance';

export async function disconnectGoogleCalendar(): Promise<void> {
  await AxiosAPI.delete('/integrations/google-calendar');
}
