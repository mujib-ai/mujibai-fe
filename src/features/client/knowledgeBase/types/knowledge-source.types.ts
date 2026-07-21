import type { IngestionStatus } from './ingestion-status.types';

export type KnowledgeSourceType =
  | 'pdf'
  | 'txt'
  | 'csv'
  | 'excel'
  | 'manual_text'
  | 'faq'
  | 'website'
  | 'api';

export interface KnowledgeSource {
  id: string;
  knowledgeBaseId: string;
  name: string;
  sourceType: KnowledgeSourceType;
  originalFileName: string | null;
  mimeType: string | null;
  fileSize: number | null;
  status: IngestionStatus;
  progress: number;
  currentStage: string | null;
  errorMessage: string | null;
  isEnabled: boolean;
  documentCount: number;
  chunkCount: number;
  language: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

export type KnowledgeSourceSortField =
  | 'created_at'
  | 'updated_at'
  | 'name'
  | 'status';

export type SortOrder = 'asc' | 'desc';

export interface KnowledgeSourceFilters {
  page: number;
  pageSize: number;
  status?: IngestionStatus;
  sourceType?: KnowledgeSourceType;
  isEnabled?: boolean;
  search?: string;
  sortBy?: KnowledgeSourceSortField;
  sortOrder?: SortOrder;
}

export interface UploadKnowledgeSourceDto {
  file: File;
  name?: string;
  chunkingStrategy?: string;
}

export interface UploadManualTextSourceDto {
  title: string;
  content: string;
  category?: string;
  language?: string;
}

export interface DuplicateSourceErrorData {
  code: 'DUPLICATE_SOURCE';
  message: string;
  existingSourceId?: string;
  existingSourceName?: string;
}
