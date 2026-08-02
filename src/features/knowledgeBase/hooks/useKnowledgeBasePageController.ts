'use client';

import { useState } from 'react';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { KnowledgeSource } from '../types';
import useDeleteKnowledgeSource from './useDeleteKnowledgeSource';
import useKnowledgeBasePermissions from './useKnowledgeBasePermissions';
import useKnowledgeSourceEvents from './useKnowledgeSourceEvents';
import useKnowledgeSourceFilters from './useKnowledgeSourceFilters';
import useKnowledgeSources from './useKnowledgeSources';
import useRetryKnowledgeSource from './useRetryKnowledgeSource';
import useToggleKnowledgeSource from './useToggleKnowledgeSource';
import useUploadKnowledgeSource from './useUploadKnowledgeSource';
import useUploadManualTextSource from './useUploadManualTextSource';

export function useKnowledgeBasePageController() {
  const locale = useLocale();
  const router = useRouter();

  const sourceFilters = useKnowledgeSourceFilters();
  const { filters, page, setPage } = sourceFilters;

  const {
    sources,
    stats,
    totalItems,
    totalPages,
    isLoading: isSourcesLoading,
    error: sourcesError,
  } = useKnowledgeSources(filters);

  useKnowledgeSourceEvents(sources);

  const { can } = useKnowledgeBasePermissions();
  const uploadState = useUploadKnowledgeSource();
  const manualTextState = useUploadManualTextSource();
  const retryState = useRetryKnowledgeSource();
  const toggleState = useToggleKnowledgeSource();
  const deleteState = useDeleteKnowledgeSource({
    page,
    onPageChange: setPage,
  });

  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isManualTextDialogOpen, setManualTextDialogOpen] = useState(false);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [sourceIdToDelete, setSourceIdToDelete] = useState<string | null>(null);
  const [sourceIdToDisable, setSourceIdToDisable] = useState<string | null>(
    null
  );

  const selectedSource =
    sources.find(source => source.id === selectedSourceId) ?? null;
  const sourceToDelete =
    sources.find(source => source.id === sourceIdToDelete) ?? null;
  const sourceToDisable =
    sources.find(source => source.id === sourceIdToDisable) ?? null;

  const handleUploadSubmit = async (values: {
    file: File;
    name?: string;
    chunkingStrategy?: string;
  }) => {
    try {
      await uploadState.upload(values);
      setUploadDialogOpen(false);
    } catch {}
  };

  const handleManualTextSubmit = async (values: {
    title: string;
    content: string;
    category?: string;
    language?: string;
  }) => {
    try {
      await manualTextState.uploadManualText(values);
      setManualTextDialogOpen(false);
    } catch {}
  };

  const handleRetry = (source: KnowledgeSource) => {
    retryState.retry(source.id).catch(() => undefined);
  };

  const handleToggleEnabled = (source: KnowledgeSource) => {
    if (source.isEnabled) {
      setSourceIdToDisable(source.id);
      return;
    }

    toggleState
      .toggleEnabled({ sourceId: source.id, isEnabled: true })
      .catch(() => undefined);
  };

  const handleConfirmDisable = () => {
    if (!sourceToDisable) return;

    toggleState
      .toggleEnabled({ sourceId: sourceToDisable.id, isEnabled: false })
      .then(() => setSourceIdToDisable(null))
      .catch(() => undefined);
  };

  const handleDownload = (source: KnowledgeSource) => {
    window.open(KnowledgeSourcesService.getDownloadUrl(source.id), '_blank');
  };

  const handleConfirmDelete = async () => {
    if (!sourceToDelete) return;

    try {
      await deleteState.remove(sourceToDelete.id);
      setSourceIdToDelete(null);
    } catch {}
  };

  const handleViewExistingSource = (sourceId: string) => {
    setUploadDialogOpen(false);
    router.push(`/dashboard/knowledge-base/sources/${sourceId}`);
  };

  return {
    locale,
    stats,
    sources,
    totalItems,
    totalPages,
    sourcesError,
    can,
    isSourcesLoading,
    sourceFilters,
    uploadState,
    manualTextState,
    retryState,
    toggleState,
    deleteState,
    dialogs: {
      isUploadDialogOpen,
      isManualTextDialogOpen,
      selectedSource,
      sourceToDelete,
      sourceToDisable,
    },
    actions: {
      setUploadDialogOpen,
      setManualTextDialogOpen,
      setSelectedSourceId,
      setSourceIdToDelete,
      setSourceIdToDisable,
      handleUploadSubmit,
      handleManualTextSubmit,
      handleRetry,
      handleToggleEnabled,
      handleConfirmDisable,
      handleDownload,
      handleConfirmDelete,
      handleViewExistingSource,
    },
  };
}

export type KnowledgeBasePageController = ReturnType<
  typeof useKnowledgeBasePageController
>;
