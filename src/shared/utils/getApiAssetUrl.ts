import { AxiosAPI } from './axiosInstance';

export function getApiAssetUrl(url?: string): string | undefined {
  if (!url || /^(?:https?:|blob:|data:)/.test(url)) return url;

  const baseUrl = AxiosAPI.defaults.baseURL;
  if (!baseUrl) return url;

  return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
