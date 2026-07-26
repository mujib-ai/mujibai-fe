import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { SlackIntegration } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function selectSlackChannel(
  channelId: string
): Promise<SlackIntegration> {
  const { data } = await AxiosAPI.put<ApiEnvelope<SlackIntegration>>(
    '/integrations/slack/channel',
    { channelId }
  );
  return data.data;
}
