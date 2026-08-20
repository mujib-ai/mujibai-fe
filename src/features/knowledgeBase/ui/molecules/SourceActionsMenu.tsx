'use client';

import { useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import {
  Download,
  Eye,
  EyeOff,
  MoreHorizontal,
  RefreshCw,
  Trash2,
} from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import type { KnowledgeSource } from '../../types';

const DOWNLOADABLE_SOURCE_TYPES = ['pdf', 'txt', 'csv', 'excel'];
const RETRYABLE_STATUSES = ['failed', 'cancelled'];

interface SourceActionsMenuProps {
  source: KnowledgeSource;
  can: (permission: string) => boolean;
  onViewDetails: (source: KnowledgeSource) => void;
  onRetry: (source: KnowledgeSource) => void;
  onToggleEnabled: (source: KnowledgeSource) => void;
  onDownload: (source: KnowledgeSource) => void;
  onDelete: (source: KnowledgeSource) => void;
}

export default function SourceActionsMenu({
  source,
  can,
  onViewDetails,
  onRetry,
  onToggleEnabled,
  onDownload,
  onDelete,
}: SourceActionsMenuProps) {
  const t = useTranslations('KnowledgeBase.actions');

  const canRetry =
    can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_RETRY) &&
    RETRYABLE_STATUSES.includes(source.status);
  const canDownload =
    can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_VIEW) &&
    DOWNLOADABLE_SOURCE_TYPES.includes(source.sourceType);
  const canUpdate = can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_UPDATE);
  const canDelete = can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_DELETE);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('viewDetails')}
        className="hover:bg-accent text-muted-foreground inline-flex size-8 cursor-pointer items-center justify-center rounded-md outline-none"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem onSelect={() => onViewDetails(source)}>
          <Eye className="size-4" />
          {t('viewDetails')}
        </DropdownMenuItem>

        {canRetry && (
          <DropdownMenuItem onSelect={() => onRetry(source)}>
            <RefreshCw className="size-4" />
            {t('retry')}
          </DropdownMenuItem>
        )}

        {canDownload && (
          <DropdownMenuItem onSelect={() => onDownload(source)}>
            <Download className="size-4" />
            {t('download')}
          </DropdownMenuItem>
        )}

        {canUpdate && (
          <DropdownMenuItem onSelect={() => onToggleEnabled(source)}>
            {source.isEnabled ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
            {source.isEnabled ? t('disable') : t('enable')}
          </DropdownMenuItem>
        )}

        {canDelete && (
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => onDelete(source)}
          >
            <Trash2 className="size-4" />
            {t('delete')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
