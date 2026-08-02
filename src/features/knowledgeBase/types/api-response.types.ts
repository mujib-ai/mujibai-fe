import type { KnowledgeBaseStats } from './knowledge-base.types';
import type { KnowledgeSource } from './knowledge-source.types';

export interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface KnowledgeSourcesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface KnowledgeSourcesOverview {
  stats: KnowledgeBaseStats;
  sources: {
    data: KnowledgeSource[];
    pagination: KnowledgeSourcesPagination;
  };
}

export interface ApiErrorData {
  message?: string;
  code?: string;
  existingSourceId?: string;
  existingSourceName?: string;
}
