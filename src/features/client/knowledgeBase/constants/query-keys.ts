import type { KnowledgeSourceFilters } from '../types';

export const knowledgeKeys = {
  all: ['knowledge-base'] as const,

  stats: () => [...knowledgeKeys.all, 'stats'] as const,

  sourcesRoot: () => [...knowledgeKeys.all, 'sources'] as const,

  sources: (filters: KnowledgeSourceFilters) =>
    [...knowledgeKeys.sourcesRoot(), filters] as const,

  status: (sourceId: string) =>
    [...knowledgeKeys.all, 'status', sourceId] as const,

  source: (sourceId: string) =>
    [...knowledgeKeys.all, 'source', sourceId] as const,
};
