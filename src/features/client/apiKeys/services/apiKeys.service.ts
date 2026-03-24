import { AxiosAPI } from '@/shared/utils/axiosInstance';
import type { ApiKey, PaginatedApiKeysResponse, CreateApiKeyDto, UpdateApiKeyDto } from '../types';

export const ApiKeysService = {
  getAll: async () => {
    const { data } = await AxiosAPI.get<PaginatedApiKeysResponse>('/api-keys');
    return data.data;
  },

  create: async (dto: CreateApiKeyDto) => {
    const { data } = await AxiosAPI.post<ApiKey>('/api-keys', dto);
    return data;
  },

  update: async (id: string, dto: UpdateApiKeyDto) => {
    const { data } = await AxiosAPI.patch<ApiKey>(`/api-keys/${id}`, dto);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await AxiosAPI.delete(`/api-keys/${id}`);
    return data;
  },
  revoke: async (id: string) => {
    const { data } = await AxiosAPI.post(`/api-keys/${id}/revoke`);
    return data;
  },
};
