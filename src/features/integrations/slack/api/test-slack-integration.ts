import { AxiosAPI } from '@/shared/utils/axiosInstance';

export async function testSlackIntegration(): Promise<void> {
  await AxiosAPI.post('/integrations/slack/test');
}
