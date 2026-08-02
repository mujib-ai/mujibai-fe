import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { SlackIntegration } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function getSlackIntegration(): Promise<SlackIntegration> {
  const { data } = await AxiosAPI.get<ApiEnvelope<SlackIntegration>>(
    '/integrations/slack'
  );
  return data.data;
}
