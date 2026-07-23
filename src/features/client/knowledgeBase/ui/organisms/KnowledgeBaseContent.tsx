import type { KnowledgeBasePageController } from '../../hooks/useKnowledgeBasePageController';
import SourceFilterBar from '../molecules/SourceFilterBar';
import KnowledgeBaseStats from './KnowledgeBaseStats';
import KnowledgeSourcesTable from './KnowledgeSourcesTable';

interface KnowledgeBaseContentProps {
  controller: KnowledgeBasePageController;
}

export function KnowledgeBaseContent({
  controller,
}: KnowledgeBaseContentProps) {
  const {
    locale,
    stats,
    sources,
    totalItems,
    totalPages,
    sourcesError,
    can,
    isSourcesLoading,
    sourceFilters,
    actions,
  } = controller;

  return (
    <>
      <KnowledgeBaseStats stats={stats} isLoading={isSourcesLoading} />

      <SourceFilterBar
        filters={sourceFilters.filters}
        searchInput={sourceFilters.searchInput}
        onSearchChange={sourceFilters.setSearchInput}
        onStatusChange={sourceFilters.setStatusFilter}
        onSourceTypeChange={sourceFilters.setSourceTypeFilter}
        onEnabledChange={sourceFilters.setEnabledFilter}
        hasActiveFilters={sourceFilters.hasActiveFilters}
        onReset={sourceFilters.resetFilters}
      />

      <KnowledgeSourcesTable
        sources={sources}
        isLoading={isSourcesLoading}
        error={sourcesError}
        hasActiveFilters={sourceFilters.hasActiveFilters}
        page={sourceFilters.page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={sourceFilters.setPage}
        locale={locale}
        can={can}
        onViewDetails={source => actions.setSelectedSourceId(source.id)}
        onRetry={actions.handleRetry}
        onToggleEnabled={actions.handleToggleEnabled}
        onDownload={actions.handleDownload}
        onDelete={source => actions.setSourceIdToDelete(source.id)}
        onResetFilters={sourceFilters.resetFilters}
        onUpload={() => actions.setUploadDialogOpen(true)}
      />
    </>
  );
}
