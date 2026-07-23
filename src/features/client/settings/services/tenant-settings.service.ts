import { AxiosAPI } from '@/shared/utils/axiosInstance';

interface TenantLogoResponse {
  data: {
    logoUrl: string;
  };
}

export class TenantSettingsService {
  static async uploadLogo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('logo', file);

    const { data } = await AxiosAPI.post<TenantLogoResponse>(
      '/tenants/me/logo',
      formData
    );

    return data.data.logoUrl;
  }
}
