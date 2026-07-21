import type { IngestionStatus, IngestionStatusConfig } from '../types';

export const INGESTION_STATUSES: IngestionStatus[] = [
  'pending',
  'queued',
  'processing',
  'extracting',
  'cleaning',
  'ai_classifying',
  'creating_documents',
  'chunking',
  'embedding',
  'indexing',
  'completed',
  'failed',
  'cancelled',
];

export const INGESTION_STATUS_CONFIG: Record<
  IngestionStatus,
  IngestionStatusConfig
> = {
  pending: { color: 'default', isProcessing: false },
  queued: { color: 'default', isProcessing: false },
  processing: { color: 'accent', isProcessing: true },
  extracting: { color: 'accent', isProcessing: true },
  cleaning: { color: 'accent', isProcessing: true },
  ai_classifying: { color: 'accent', isProcessing: true },
  creating_documents: { color: 'accent', isProcessing: true },
  chunking: { color: 'accent', isProcessing: true },
  embedding: { color: 'accent', isProcessing: true },
  indexing: { color: 'accent', isProcessing: true },
  completed: { color: 'success', isProcessing: false },
  failed: { color: 'danger', isProcessing: false },
  cancelled: { color: 'default', isProcessing: false },
};

export const FINAL_INGESTION_STATUSES: IngestionStatus[] = [
  'completed',
  'failed',
  'cancelled',
];

export function isFinalIngestionStatus(status: IngestionStatus): boolean {
  return FINAL_INGESTION_STATUSES.includes(status);
}
