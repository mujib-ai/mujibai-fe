import type { QueryClient } from '@tanstack/react-query';

import { knowledgeKeys } from '../constants/query-keys';
import type { KnowledgeSourcesOverview } from '../types';

export function snapshotSourceQueries(queryClient: QueryClient) {
  return queryClient.getQueriesData<KnowledgeSourcesOverview>({
    queryKey: knowledgeKeys.sourcesRoot(),
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
  sourceId: string,
  patch: Partial<KnowledgeSourcesOverview['sources']['data'][number]>
) {
  queryClient.setQueriesData<KnowledgeSourcesOverview>(
    { queryKey: knowledgeKeys.sourcesRoot() },
    old =>
      old && {
        ...old,
        sources: {
          ...old.sources,
          data: old.sources.data.map(item =>
            item.id === sourceId ? { ...item, ...patch } : item
          ),
        },
      }
  );
}
