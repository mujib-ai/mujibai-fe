import { AxiosAPI } from '@/shared/utils/axiosInstance';

interface TenantLogoResponse {
  data: {
    logoUrl: string;
  };
}

export type TenantTheme = 'light' | 'dark' | 'system';

export interface TenantPreferences {
  theme: TenantTheme;
  language: string;
}

export type TenantPreferencesUpdate = Partial<TenantPreferences>;

interface TenantPreferencesResponse {
  message: string;
  data: TenantPreferences;
}

export class TenantSettingsService {
  static async updatePreferences(
    preferences: TenantPreferencesUpdate
  ): Promise<TenantPreferences> {
    const { data } = await AxiosAPI.patch<TenantPreferencesResponse>(
      '/tenants/me/preferences',
      preferences
    );
    return data.data;
  }

  static async uploadLogo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('logo', file);

    const { data } = await AxiosAPI.put<TenantLogoResponse>(
      '/tenants/me/logo',
      formData
    );

    return data.data.logoUrl;
  }
}
