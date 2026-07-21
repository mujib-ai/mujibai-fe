import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  ApiEnvelope,
  KnowledgeSource,
  KnowledgeSourceFilters,
  PaginatedResponse,
  UploadManualTextSourceDto,
} from '../types';

export class KnowledgeSourcesService {
  static async list(
    knowledgeBaseId: string,
    filters: KnowledgeSourceFilters
  ): Promise<PaginatedResponse<KnowledgeSource>> {
    const { data } = await AxiosAPI.get<
      ApiEnvelope<PaginatedResponse<KnowledgeSource>>
    >(`/knowledge-bases/${knowledgeBaseId}/sources`, {
      params: {
        page: filters.page,
        page_size: filters.pageSize,
        status: filters.status,
        source_type: filters.sourceType,
        is_enabled: filters.isEnabled,
        search: filters.search || undefined,
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder,
      },
    });
    return data.data;
  }

  static async get(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-sources/${sourceId}`
    );
    return data.data;
  }

  static async getStatus(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-sources/${sourceId}/status`
    );
    return data.data;
  }

  static async upload(
    knowledgeBaseId: string,
    formData: FormData,
    onUploadProgress?: (percent: number) => void
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-bases/${knowledgeBaseId}/sources/upload`,
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
    knowledgeBaseId: string,
    payload: UploadManualTextSourceDto
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-bases/${knowledgeBaseId}/sources/manual-text`,
      payload
    );
    return data.data;
  }

  static async retry(sourceId: string): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.post<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-sources/${sourceId}/retry`
    );
    return data.data;
  }

  static async setEnabled(
    sourceId: string,
    isEnabled: boolean
  ): Promise<KnowledgeSource> {
    const { data } = await AxiosAPI.patch<ApiEnvelope<KnowledgeSource>>(
      `/knowledge-sources/${sourceId}/enabled`,
      { isEnabled }
    );
    return data.data;
  }

  static async remove(sourceId: string): Promise<void> {
    await AxiosAPI.delete(`/knowledge-sources/${sourceId}`);
  }

  static getDownloadUrl(sourceId: string): string {
    const baseURL = AxiosAPI.defaults.baseURL ?? '';
    return `${baseURL}/knowledge-sources/${sourceId}/download`;
  }
}
