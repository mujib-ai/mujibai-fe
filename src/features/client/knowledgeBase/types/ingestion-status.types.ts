export type IngestionStatus =
  | 'pending'
  | 'queued'
  | 'processing'
  | 'extracting'
  | 'cleaning'
  | 'ai_classifying'
  | 'creating_documents'
  | 'chunking'
  | 'embedding'
  | 'indexing'
  | 'completed'
  | 'failed'
  | 'cancelled';

/** Matches HeroUI's shared semantic color enum (Chip/ProgressBar/Badge), so
 * one status→color mapping drives every status-aware visual. */
export type StatusColor =
  | 'default'
  | 'accent'
  | 'success'
  | 'danger'
  | 'warning';

export interface IngestionStatusConfig {
  color: StatusColor;
  isProcessing: boolean;
}
