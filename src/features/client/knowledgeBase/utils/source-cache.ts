import type { QueryClient } from '@tanstack/react-query';

import { knowledgeBaseKeys } from '../constants/query-keys';
import type { KnowledgeSource, PaginatedResponse } from '../types';

type SourcesPage = PaginatedResponse<KnowledgeSource>;

export function snapshotSourceQueries(
  queryClient: QueryClient,
  knowledgeBaseId: string
) {
  return queryClient.getQueriesData<SourcesPage>({
    queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
  });
}

export function rollbackSourceQueries(
  queryClient: QueryClient,
  snapshot: ReturnType<typeof snapshotSourceQueries>
) {
  snapshot.forEach(([key, data]) => {
    queryClient.setQueryData(key, data);
  });
}

export function patchSourceInQueries(
  queryClient: QueryClient,
  knowledgeBaseId: string,
  sourceId: string,
  patch: Partial<KnowledgeSource>
) {
  queryClient.setQueriesData<SourcesPage>(
    { queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId) },
    old =>
      old && {
        ...old,
        items: old.items.map(item =>
          item.id === sourceId ? { ...item, ...patch } : item
        ),
      }
  );
}
