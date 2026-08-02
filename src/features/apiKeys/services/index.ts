import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  ApiKeyCreatedResponse,
  ApiKeyPublic,
  CreateApiKeyDto,
  UpdateApiKeyExpirationDto,
  UpdateApiKeyNameDto,
  UpdateApiKeyScopesDto,
} from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class ApiKeyService {
  static async list(): Promise<ApiKeyPublic[]> {
    const { data } =
      await AxiosAPI.get<ApiEnvelope<ApiKeyPublic[]>>('/api-keys');
    return data.data;
  }

  static async get(apiKeyId: string): Promise<ApiKeyPublic> {
    const { data } = await AxiosAPI.get<ApiEnvelope<ApiKeyPublic>>(
      `/api-keys/${apiKeyId}`
    );
    return data.data;
  }

  static async create(
    payload: CreateApiKeyDto
  ): Promise<ApiKeyCreatedResponse> {
    const { data } = await AxiosAPI.post<ApiEnvelope<ApiKeyCreatedResponse>>(
      '/api-keys',
      payload
    );
    return data.data;
  }

  static async updateName(
    apiKeyId: string,
    payload: UpdateApiKeyNameDto
  ): Promise<ApiKeyPublic> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<ApiKeyPublic>>(
      `/api-keys/${apiKeyId}/name`,
      payload
    );
    return data.data;
  }

  static async updateScopes(
    apiKeyId: string,
    payload: UpdateApiKeyScopesDto
  ): Promise<ApiKeyPublic> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<ApiKeyPublic>>(
      `/api-keys/${apiKeyId}/scopes`,
      payload
    );
    return data.data;
  }

  static async updateExpiration(
    apiKeyId: string,
    payload: UpdateApiKeyExpirationDto
  ): Promise<ApiKeyPublic> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<ApiKeyPublic>>(
      `/api-keys/${apiKeyId}/expiration`,
      payload
    );
    return data.data;
  }

  static async rotate(apiKeyId: string): Promise<ApiKeyCreatedResponse> {
    const { data } = await AxiosAPI.post<ApiEnvelope<ApiKeyCreatedResponse>>(
      `/api-keys/${apiKeyId}/rotate`
    );
    return data.data;
  }

  static async revoke(apiKeyId: string): Promise<ApiKeyPublic> {
    const { data } = await AxiosAPI.post<ApiEnvelope<ApiKeyPublic>>(
      `/api-keys/${apiKeyId}/revoke`
    );
    return data.data;
  }
}
