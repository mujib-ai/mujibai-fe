import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { SlackChannelsPage } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function getSlackChannels(
  cursor?: string | null
): Promise<SlackChannelsPage> {
  const { data } = await AxiosAPI.get<ApiEnvelope<SlackChannelsPage>>(
    '/integrations/slack/channels',
    { params: cursor ? { cursor } : undefined }
  );
  return data.data;
}
