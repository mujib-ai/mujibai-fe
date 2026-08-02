import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  DisableTwoFactorPayload,
  TwoFactorSetupResponse,
  VerifyTwoFactorPayload,
  VerifyTwoFactorResponse,
} from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class TwoFactorService {
  static async startSetup(): Promise<TwoFactorSetupResponse> {
    const { data } = await AxiosAPI.post<ApiEnvelope<TwoFactorSetupResponse>>(
      '/tenants/me/2fa/setup'
    );
    return data.data;
  }

  static async enable(
    payload: VerifyTwoFactorPayload
  ): Promise<VerifyTwoFactorResponse> {
    const { data } = await AxiosAPI.post<ApiEnvelope<VerifyTwoFactorResponse>>(
      '/tenants/me/2fa/enable',
      payload
    );
    return data.data;
  }

  static async disable(
    payload: DisableTwoFactorPayload
  ): Promise<VerifyTwoFactorResponse> {
    const { data } = await AxiosAPI.post<ApiEnvelope<VerifyTwoFactorResponse>>(
      '/tenants/me/2fa/disable',
      payload
    );
    return data.data;
  }
}
