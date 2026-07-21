import type { KnowledgeSourceFilters } from '../types';

export const knowledgeBaseKeys = {
  all: ['knowledge-base'] as const,

  active: () => [...knowledgeBaseKeys.all, 'active'] as const,

  stats: (knowledgeBaseId: string) =>
    [...knowledgeBaseKeys.all, 'stats', knowledgeBaseId] as const,

  sourcesRoot: (knowledgeBaseId: string) =>
    [...knowledgeBaseKeys.all, 'sources', knowledgeBaseId] as const,

  sources: (knowledgeBaseId: string, filters: KnowledgeSourceFilters) =>
    [...knowledgeBaseKeys.sourcesRoot(knowledgeBaseId), filters] as const,

  sourceStatus: (sourceId: string) =>
    [...knowledgeBaseKeys.all, 'source-status', sourceId] as const,

  sourceDetail: (sourceId: string) =>
    [...knowledgeBaseKeys.all, 'source-detail', sourceId] as const,
};
