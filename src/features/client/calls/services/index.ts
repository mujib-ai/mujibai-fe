import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { CallListResponse, GetAllCallsParams } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class CallService {
  static async getAllCalls(
    params: GetAllCallsParams
  ): Promise<CallListResponse> {
    const { data } = await AxiosAPI.get<ApiEnvelope<CallListResponse>>(
      '/calls',
      { params }
    );
    return data.data;
  }
}
