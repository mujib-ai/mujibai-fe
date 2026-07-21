import { renderHook } from '@testing-library/react';
import { toast } from 'sonner';

import type { KnowledgeSource } from '../types';
import { createQueryTestWrapper } from './queryTestWrapper';
import useKnowledgeSourceEvents from './useKnowledgeSourceEvents';

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

function makeSource(status: KnowledgeSource['status']): KnowledgeSource {
  return {
    id: 'src_1',
    knowledgeBaseId: 'kb_1',
    name: 'Refund Policy',
    sourceType: 'pdf',
    originalFileName: 'refund.pdf',
    mimeType: 'application/pdf',
    fileSize: 1024,
    status,
    progress: status === 'completed' ? 100 : 40,
    currentStage: null,
    errorMessage: null,
    isEnabled: true,
    documentCount: 0,
    chunkCount: 0,
    language: null,
    category: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    startedAt: '2026-01-01T00:00:00.000Z',
    completedAt: null,
  };
}

describe('useKnowledgeSourceEvents', () => {
  beforeEach(() => {
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  it('fires exactly one completion toast on the status transition, never again on re-renders', () => {
    const { Wrapper } = createQueryTestWrapper();
    const { rerender } = renderHook(
      ({ sources }) => useKnowledgeSourceEvents('kb_1', sources),
      { wrapper: Wrapper, initialProps: { sources: [makeSource('embedding')] } }
    );

    expect(toast.success).not.toHaveBeenCalled();

    rerender({ sources: [makeSource('completed')] });
    expect(toast.success).toHaveBeenCalledTimes(1);

    // Same final status refetched again (e.g. a subsequent poll tick) — no repeat toast.
    rerender({ sources: [makeSource('completed')] });
    expect(toast.success).toHaveBeenCalledTimes(1);
  });

  it('fires a failure toast on transition into failed', () => {
    const { Wrapper } = createQueryTestWrapper();
    const { rerender } = renderHook(
      ({ sources }) => useKnowledgeSourceEvents('kb_1', sources),
      {
        wrapper: Wrapper,
        initialProps: { sources: [makeSource('processing')] },
      }
    );

    rerender({ sources: [makeSource('failed')] });
    expect(toast.error).toHaveBeenCalledTimes(1);

    rerender({ sources: [makeSource('failed')] });
    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});
