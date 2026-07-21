import { render, screen } from '@testing-library/react';

import type { KnowledgeSource } from '../../types';
import KnowledgeSourcesTable from './KnowledgeSourcesTable';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock('@/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

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

const baseProps = {
  isLoading: false,
  error: null,
  hasActiveFilters: false,
  page: 1,
  totalPages: 1,
  totalItems: 0,
  onPageChange: jest.fn(),
  locale: 'en',
  can: () => true,
  onViewDetails: jest.fn(),
  onRetry: jest.fn(),
  onToggleEnabled: jest.fn(),
  onDownload: jest.fn(),
  onDelete: jest.fn(),
  onResetFilters: jest.fn(),
  onUpload: jest.fn(),
};

describe('KnowledgeSourcesTable', () => {
  it('shows the "no sources yet" empty state when there are no filters applied', () => {
    render(<KnowledgeSourcesTable {...baseProps} sources={[]} />);
    expect(screen.getByText('emptyStates.noSourcesTitle')).toBeInTheDocument();
  });

  it('shows the "no results" empty state when filters are active', () => {
    render(
      <KnowledgeSourcesTable {...baseProps} sources={[]} hasActiveFilters />
    );
    expect(screen.getByText('emptyStates.noResultsTitle')).toBeInTheDocument();
    expect(
      screen.queryByText('emptyStates.noSourcesTitle')
    ).not.toBeInTheDocument();
  });

  it('renders rows and hides pagination controls when there is only one page', () => {
    render(
      <KnowledgeSourcesTable
        {...baseProps}
        sources={[makeSource()]}
        totalItems={1}
        totalPages={1}
      />
    );
    expect(screen.getByText('Refund Policy')).toBeInTheDocument();
    expect(screen.queryByText('pagination.next')).not.toBeInTheDocument();
    expect(screen.queryByText('pagination.previous')).not.toBeInTheDocument();
    // total-count line still shows
    expect(screen.getByText(/pagination.results/)).toBeInTheDocument();
  });

  it('renders pagination controls when there is more than one page', () => {
    render(
      <KnowledgeSourcesTable
        {...baseProps}
        sources={[makeSource()]}
        totalItems={40}
        totalPages={2}
        page={1}
      />
    );
    expect(screen.getByText('pagination.next')).toBeInTheDocument();
    expect(
      screen.getByText('pagination.previous').closest('button')
    ).toBeDisabled();
  });
});
