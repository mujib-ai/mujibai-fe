import { QueryClient } from '@tanstack/react-query';

import { knowledgeBaseKeys } from '../constants/query-keys';
import type { KnowledgeSource, PaginatedResponse } from '../types';
import {
  patchSourceInQueries,
  rollbackSourceQueries,
  snapshotSourceQueries,
} from './source-cache';

function makeSource(overrides: Partial<KnowledgeSource> = {}): KnowledgeSource {
  return {
    id: 'src_1',
    knowledgeBaseId: 'kb_1',
    name: 'Refund Policy',
    sourceType: 'pdf',
    originalFileName: 'refund.pdf',
    mimeType: 'application/pdf',
    fileSize: 1024,
    status: 'completed',
    progress: 100,
    currentStage: null,
    errorMessage: null,
    isEnabled: true,
    documentCount: 3,
    chunkCount: 12,
    language: 'en',
    category: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    startedAt: '2026-01-01T00:00:00.000Z',
    completedAt: '2026-01-01T00:00:05.000Z',
    ...overrides,
  };
}

describe('source-cache helpers', () => {
  it('patches a source across every cached filter variant of a knowledge base', () => {
    const queryClient = new QueryClient();
    const page: PaginatedResponse<KnowledgeSource> = {
      items: [makeSource(), makeSource({ id: 'src_2', name: 'FAQ' })],
      page: 1,
      pageSize: 20,
      totalItems: 2,
      totalPages: 1,
    };

    queryClient.setQueryData(
      knowledgeBaseKeys.sources('kb_1', { page: 1, pageSize: 20 }),
      page
    );
    queryClient.setQueryData(
      knowledgeBaseKeys.sources('kb_1', {
        page: 1,
        pageSize: 20,
        status: 'completed',
      }),
      page
    );

    patchSourceInQueries(queryClient, 'kb_1', 'src_1', { isEnabled: false });

    const unfiltered = queryClient.getQueryData<
      PaginatedResponse<KnowledgeSource>
    >(knowledgeBaseKeys.sources('kb_1', { page: 1, pageSize: 20 }));
    const filtered = queryClient.getQueryData<
      PaginatedResponse<KnowledgeSource>
    >(
      knowledgeBaseKeys.sources('kb_1', {
        page: 1,
        pageSize: 20,
        status: 'completed',
      })
    );

    expect(unfiltered?.items.find(item => item.id === 'src_1')?.isEnabled).toBe(
      false
    );
    expect(filtered?.items.find(item => item.id === 'src_1')?.isEnabled).toBe(
      false
    );
    // unrelated rows are left untouched
    expect(unfiltered?.items.find(item => item.id === 'src_2')?.isEnabled).toBe(
      true
    );
  });

  it('rolls back to the snapshot taken before the optimistic patch', () => {
    const queryClient = new QueryClient();
    const key = knowledgeBaseKeys.sources('kb_1', { page: 1, pageSize: 20 });
    const original: PaginatedResponse<KnowledgeSource> = {
      items: [makeSource()],
      page: 1,
      pageSize: 20,
      totalItems: 1,
      totalPages: 1,
    };
    queryClient.setQueryData(key, original);

    const snapshot = snapshotSourceQueries(queryClient, 'kb_1');
    patchSourceInQueries(queryClient, 'kb_1', 'src_1', { isEnabled: false });
    expect(
      queryClient.getQueryData<PaginatedResponse<KnowledgeSource>>(key)
        ?.items[0].isEnabled
    ).toBe(false);

    rollbackSourceQueries(queryClient, snapshot);
    expect(
      queryClient.getQueryData<PaginatedResponse<KnowledgeSource>>(key)
        ?.items[0].isEnabled
    ).toBe(true);
  });
});
