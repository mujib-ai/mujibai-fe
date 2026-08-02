import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { SlackOAuthStart } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function startSlackOAuth(): Promise<SlackOAuthStart> {
  const { data } = await AxiosAPI.get<ApiEnvelope<SlackOAuthStart>>(
    '/integrations/slack/oauth/start'
  );
  return data.data;
}
