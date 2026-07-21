import type { KnowledgeBasePageController } from '../../hooks/useKnowledgeBasePageController';
import DeleteSourceDialog from './DeleteSourceDialog';
import ManualTextSourceDialog from './ManualTextSourceDialog';
import SourceDetailsSheet from './SourceDetailsSheet';
import ToggleSourceConfirmDialog from './ToggleSourceConfirmDialog';
import UploadSourceDialog from './UploadSourceDialog';

interface KnowledgeBaseDialogsProps {
  controller: KnowledgeBasePageController;
}

export function KnowledgeBaseDialogs({
  controller,
}: KnowledgeBaseDialogsProps) {
  const {
    knowledgeBase,
    can,
    uploadState,
    manualTextState,
    retryState,
    toggleState,
    deleteState,
    dialogs,
    actions,
  } = controller;

  return (
    <>
      <UploadSourceDialog
        open={dialogs.isUploadDialogOpen}
        onClose={() => actions.setUploadDialogOpen(false)}
        onSubmit={actions.handleUploadSubmit}
        isUploading={uploadState.isUploading}
        uploadProgress={uploadState.uploadProgress}
        maxFileSizeBytes={
          knowledgeBase?.capabilities.maxFileSizeBytes ?? 25 * 1024 * 1024
        }
        duplicateInfo={uploadState.duplicateInfo}
        onClearDuplicateInfo={uploadState.clearDuplicateInfo}
        onViewExistingSource={actions.handleViewExistingSource}
      />

      <ManualTextSourceDialog
        open={dialogs.isManualTextDialogOpen}
        onClose={() => actions.setManualTextDialogOpen(false)}
        onSubmit={actions.handleManualTextSubmit}
        isUploading={manualTextState.isUploading}
      />

      <SourceDetailsSheet
        source={dialogs.selectedSource}
        onClose={() => actions.setSelectedSourceId(null)}
        can={can}
        isRetrying={retryState.isRetrying}
        onRetry={actions.handleRetry}
        onDelete={source => actions.setSourceIdToDelete(source.id)}
      />

      <ToggleSourceConfirmDialog
        source={dialogs.sourceToDisable}
        onClose={() => actions.setSourceIdToDisable(null)}
        onConfirm={actions.handleConfirmDisable}
        isToggling={toggleState.isToggling}
      />

      <DeleteSourceDialog
        source={dialogs.sourceToDelete}
        onClose={() => actions.setSourceIdToDelete(null)}
        onConfirm={actions.handleConfirmDelete}
        isDeleting={deleteState.isDeleting}
      />
    </>
  );
}
