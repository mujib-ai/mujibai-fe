export type KnowledgeBaseOverallStatus =
  | 'ready'
  | 'processing'
  | 'attention_needed';

export interface KnowledgeBaseStats {
  totalSources: number;
  completedSources: number;
  processingSources: number;
  failedSources: number;
  totalDocuments: number;
  totalChunks: number;
}
