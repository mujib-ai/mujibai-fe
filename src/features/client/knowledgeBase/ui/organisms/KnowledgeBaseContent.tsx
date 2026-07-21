import type { KnowledgeBasePageController } from '../../hooks/useKnowledgeBasePageController';
import SourceFilterBar from '../molecules/SourceFilterBar';
import KnowledgeBaseStats from './KnowledgeBaseStats';
import KnowledgeSourcesTable from './KnowledgeSourcesTable';
import TestKnowledgePanel from './TestKnowledgePanel';

interface KnowledgeBaseContentProps {
  controller: KnowledgeBasePageController;
}

export function KnowledgeBaseContent({
  controller,
}: KnowledgeBaseContentProps) {
  const {
    locale,
    knowledgeBase,
    knowledgeBaseId,
    knowledgeBaseError,
    stats,
    sources,
    totalItems,
    totalPages,
    sourcesError,
    can,
    isKnowledgeBaseLoading,
    isStatsLoading,
    isSourcesLoading,
    sourceFilters,
    actions,
  } = controller;

  if (knowledgeBaseError) {
    return (
      <div className="border-destructive/30 bg-destructive/5 rounded-lg border p-8 text-center">
        <p className="text-destructive text-sm">{knowledgeBaseError}</p>
      </div>
    );
  }

  return (
    <>
      <KnowledgeBaseStats
        stats={stats}
        isLoading={isKnowledgeBaseLoading || isStatsLoading}
      />

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
        isLoading={isKnowledgeBaseLoading || isSourcesLoading}
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

      {knowledgeBaseId && knowledgeBase?.capabilities.retrievalTesting && (
        <TestKnowledgePanel knowledgeBaseId={knowledgeBaseId} />
      )}
    </>
  );
}
