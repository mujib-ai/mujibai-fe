import { clearAuthTokens, storeAuthTokens } from '@/shared/lib/auth-token';
import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  AuthMessageResponse,
  AuthResponse,
  ChangePasswordCredentials,
  ForgotPasswordPayload,
  LoginCredentials,
  LoginResponse,
  ResetPasswordCredentials,
  TwoFactorVerificationResponse,
} from '../types';

export class AuthRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuthRequestError';
  }
}

export function isTwoFactorRequiredError(error: unknown): boolean {
  if (!(error instanceof AuthRequestError)) return false;
  if (
    error.details?.requiresTwoFactor === true ||
    error.details?.isTwoFactorRequired === true
  ) {
    return true;
  }
  return /(?:two[- ]factor|2fa|totp).*(?:required|missing)|(?:required|missing).*(?:two[- ]factor|2fa|totp)/i.test(
    error.message
  );
}

export class AuthService {
  static async checkAuth(): Promise<AuthResponse> {
    const { data } = await AxiosAPI.get<AuthResponse>('/tenants/me');
    return data;
  }

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await AxiosAPI.post<LoginResponse>(
      '/tenants/login',
      credentials
    );
    const accessToken = data.accessToken ?? data.data?.accessToken;
    const refreshToken = data.refreshToken ?? data.data?.refreshToken;
    if (accessToken) storeAuthTokens(accessToken, refreshToken);
    return data;
  }

  static async verifyTwoFactor(
    code: string
  ): Promise<TwoFactorVerificationResponse> {
    const { data } = await AxiosAPI.post<TwoFactorVerificationResponse>(
      '/tenants/login/2fa',
      { code }
    );
    const accessToken = data.accessToken ?? data.data?.accessToken;
    const refreshToken = data.refreshToken ?? data.data?.refreshToken;
    if (accessToken) storeAuthTokens(accessToken, refreshToken);
    return data;
  }

  static async logout(): Promise<AuthResponse> {
    try {
      const { data } = await AxiosAPI.post<AuthResponse>('/tenants/logout');
      return data;
    } finally {
      await AuthService.clearLocalSession().catch(() => undefined);
    }
  }

  static async forgotPassword(
    payload: ForgotPasswordPayload
  ): Promise<AuthMessageResponse> {
    const { data } = await AxiosAPI.post<AuthMessageResponse>(
      '/tenants/forgot-password',
      payload
    );
    return data;
  }

  static async resetPassword(
    credentials: ResetPasswordCredentials
  ): Promise<AuthMessageResponse> {
    const { data } = await AxiosAPI.post<AuthMessageResponse>(
      '/tenants/reset-password',
      credentials
    );
    return data;
  }

  static async changePassword(
    credentials: ChangePasswordCredentials
  ): Promise<AuthMessageResponse> {
    const { data } = await AxiosAPI.post<AuthMessageResponse>(
      '/tenants/me/change-password',
      credentials
    );
    return data;
  }

  static async clearLocalSession(): Promise<void> {
    clearAuthTokens();
  }
}
