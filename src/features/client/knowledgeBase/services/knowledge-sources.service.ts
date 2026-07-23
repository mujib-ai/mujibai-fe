import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  ApiEnvelope,
  KnowledgeSource,
  KnowledgeSourceFilters,
  KnowledgeSourcesOverview,
  UploadManualTextSourceDto,
} from '../types';

export class KnowledgeSourcesService {
  static async list(
    filters: KnowledgeSourceFilters
  ): Promise<KnowledgeSourcesOverview> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeSourcesOverview>>(
      '/knowledge-base/sources',
      {
        params: {
          page: filters.page,
          limit: filters.pageSize,
          status: filters.status,
          source_type: filters.sourceType,
          is_enabled: filters.isEnabled,
          search: filters.search || undefined,
          sort_by: filters.sortBy,
          sort_order: filters.sortOrder,
        },
      }
    );
    return data.data;
  }

  static async get(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-base/sources/${sourceId}`
    );
    return data.data;
  }

  static async getStatus(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-base/sources/${sourceId}/status`
    );
    return data.data;
  }

  static async upload(
    formData: FormData,
    onUploadProgress?: (percent: number) => void
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      '/knowledge-base/sources/upload',
      formData,
      {
        onUploadProgress: event => {
          if (onUploadProgress && event.total) {
            onUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        },
      }
    );
    return data.data;
  }

  static async uploadManualText(
    payload: UploadManualTextSourceDto
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      '/knowledge-base/sources/manual-text',
      payload
    );
    return data.data;
  }

  static async retry(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-base/sources/${sourceId}/retry`
    );
    return data.data;
  }

  static async setEnabled(
    sourceId: string,
    isEnabled: boolean
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-base/sources/${sourceId}`,
      { isEnabled }
    );
    return data.data;
  }

  static async remove(sourceId: string): Promise<void> {
    await AxiosAPI.delete(`/knowledge-base/sources/${sourceId}`);
  }

  static getDownloadUrl(sourceId: string): string {
    const baseURL = AxiosAPI.defaults.baseURL ?? '';
    return `${baseURL}/knowledge-base/sources/${sourceId}/download`;
  }
}
