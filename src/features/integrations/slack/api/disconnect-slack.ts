import { AxiosAPI } from '@/shared/utils/axiosInstance';

export async function disconnectSlack(): Promise<void> {
  await AxiosAPI.delete('/integrations/slack');
}
