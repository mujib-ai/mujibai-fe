import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { AnalyticsData } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const { data } = await AxiosAPI.get<ApiEnvelope<AnalyticsData>>('/analytics');
  return data.data;
}
