import type { User } from '@/shared/types';

export type { User };

export interface AuthResponse {
  data: User & {
    accessToken?: string;
    refreshToken?: string;
  };
  message?: string;
  statusCode?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  userId: string;
  token: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
