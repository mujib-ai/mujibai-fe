import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordCredentials,
} from '../types';

function getAppOrigin(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return process.env.NEXT_PUBLIC_APP_URL ?? '';
}

export class AuthService {
  static async checkAuth(): Promise<AuthResponse> {
    const { data } = await AxiosAPI.get<AuthResponse>('/auth/check-auth');
    return data;
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const origin = getAppOrigin();
    if (!origin) {
      const { data } = await AxiosAPI.post<AuthResponse>('/auth/login', credentials);
      return data;
    }
    const res = await fetch(`${origin}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? 'Login failed');
    return data;
  }

  static async logout(): Promise<AuthResponse> {
    const { data } = await AxiosAPI.post<AuthResponse>('/auth/logout');
    const origin = getAppOrigin();
    if (origin) {
      try {
        await fetch(`${origin}/api/auth/logout`, { method: 'POST', credentials: 'include' });
      } catch {
        // ignore
      }
    }
    return data;
  }

  static async forgotPassword(
    payload: ForgotPasswordPayload
  ): Promise<AuthResponse> {
    const { data } = await AxiosAPI.post<AuthResponse>(
      '/auth/forget-password',
      payload
    );
    return data;
  }

  static async resetPassword(
    credentials: ResetPasswordCredentials
  ): Promise<AuthResponse> {
    const { data } = await AxiosAPI.post<AuthResponse>(
      '/auth/reset-password',
      credentials
    );
    return data;
  }
}
