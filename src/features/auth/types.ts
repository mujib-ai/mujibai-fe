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

export type TenantTheme = 'light' | 'dark' | 'system';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: string;
  isActive: boolean;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  size: string;
  industry: string;
  commercialRegister: string;
  taxId: string;
  domain: string;
  subscriptionId: string;
  createdAt: string;
  updatedAt: string;
  theme: TenantTheme;
  language: string;
  isTwoFactorEnabled: boolean;
}

export interface LoginResponse {
  message?: string;
  requires2FA?: boolean;
  accessToken?: string;
  refreshToken?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    tenant?: Tenant;
  } | null;
}

export interface TwoFactorVerificationResponse {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  data?: AuthResponse['data'] | null;
  redirectTo?: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

export interface AuthMessageResponse {
  message: string;
  data: null;
}

export interface ForgotPasswordPayload {
  email: string;
}
