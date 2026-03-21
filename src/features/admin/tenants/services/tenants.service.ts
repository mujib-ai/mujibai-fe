import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  ClientResponse,
  ClientsListResponse,
  CreateClientPayload,
  TenantListParams,
  UpdateClientPayload,
} from '../types';

export class TenantsService {
  static async createTenant(
    payload: CreateClientPayload
  ): Promise<ClientResponse> {
    const { data } = await AxiosAPI.post<ClientResponse>('/tenants', payload);
    return data;
  }

  static async getTenants(
    params?: TenantListParams
  ): Promise<ClientsListResponse> {
    const { data } = await AxiosAPI.get<ClientsListResponse>('/tenants', {
      params,
    });
    return data;
  }

  static async getTenant(id: string) {
    const { data } = await AxiosAPI.get<ClientResponse>(`/tenants/${id}`);
    return data?.data;
  }

  static async updateTenant(id: string, payload: UpdateClientPayload) {
    const { data } = await AxiosAPI.patch<ClientResponse>(
      `/tenants/${id}`,
      payload
    );
    return data;
  }

  static async deleteTenant(id: string) {
    const { data } = await AxiosAPI.delete<ClientResponse>(`/tenants/${id}`);
    return data;
  }
}
