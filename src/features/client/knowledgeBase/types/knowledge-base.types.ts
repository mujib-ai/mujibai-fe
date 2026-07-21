export interface KnowledgeBaseCapabilities {
  manualText: boolean;
  retrievalTesting: boolean;
  maxFileSizeBytes: number;
  supportedSourceTypes: string[];
}

export interface KnowledgeBase {
  id: string;
  name: string;
  overallStatus: 'ready' | 'processing' | 'attention_needed';
  lastSyncAt: string | null;
  capabilities: KnowledgeBaseCapabilities;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeBaseStats {
  totalSources: number;
  readySources: number;
  processingSources: number;
  failedSources: number;
  totalDocuments: number;
  totalChunks: number;
  lastSuccessfulIngestionAt: string | null;
}

export interface TestKnowledgeResult {
  answer: string;
  sources: {
    sourceId: string;
    sourceName: string;
    excerpt: string;
    relevance: number | null;
    reference: string | null;
  }[];
  hasRelevantInformation: boolean;
}
