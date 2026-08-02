import type { ReactNode } from 'react';

import type { KnowledgeSource } from '../types';

export interface DuplicateSourceInfo {
  existingSourceId?: string;
  existingSourceName?: string;
}

export interface UploadSourceValues {
  file: File;
  name?: string;
  chunkingStrategy?: string;
}

export interface ManualTextSourceValues {
  title: string;
  content: string;
  category?: string;
  language?: string;
}

export interface UploadSourceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: UploadSourceValues) => Promise<void>;
  isUploading: boolean;
  uploadProgress: number;
  maxFileSizeBytes: number;
  duplicateInfo: DuplicateSourceInfo | null;
  onClearDuplicateInfo: () => void;
  onViewExistingSource: (sourceId: string) => void;
}

export interface ManualTextSourceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ManualTextSourceValues) => Promise<void>;
  isUploading: boolean;
}

export interface DeleteSourceDialogProps {
  source: KnowledgeSource | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export interface ToggleSourceConfirmDialogProps {
  source: KnowledgeSource | null;
  onClose: () => void;
  onConfirm: () => void;
  isToggling: boolean;
}

export interface SourceDetailsSheetProps {
  source: KnowledgeSource | null;
  onClose: () => void;
  can: (permission: string) => boolean;
  isRetrying: boolean;
  onRetry: (source: KnowledgeSource) => void;
  onDelete: (source: KnowledgeSource) => void;
}

export interface ResponsiveFormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}
