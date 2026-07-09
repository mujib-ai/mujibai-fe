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
}

export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    tenant: Tenant;
  };
}

export interface ResetPasswordCredentials {
  userId: string;
  token: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
