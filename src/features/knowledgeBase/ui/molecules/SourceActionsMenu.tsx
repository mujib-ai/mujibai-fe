'use client';

import { useTranslations } from 'next-intl';

import { Dropdown } from '@heroui/react';
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

const MENU_ITEM_CLASS =
  'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[hovered]:bg-[#06B6D40F] data-[hovered]:text-[#06B6D4] data-[focused]:bg-[#06B6D40F] data-[focused]:text-[#06B6D4] data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

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
    <Dropdown>
      <Dropdown.Trigger
        aria-label={t('viewDetails')}
        className="hover:bg-accent text-muted-foreground inline-flex size-8 cursor-pointer items-center justify-center rounded-md outline-none"
      >
        <MoreHorizontal className="size-4" />
      </Dropdown.Trigger>
      <Dropdown.Popover
        placement="bottom end"
        className="bg-popover text-popover-foreground z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-md"
      >
        <Dropdown.Menu aria-label={t('viewDetails')} className="outline-none">
          <Dropdown.Item
            id="view"
            className={MENU_ITEM_CLASS}
            onAction={() => onViewDetails(source)}
          >
            <Eye className="size-4" />
            {t('viewDetails')}
          </Dropdown.Item>

          {canRetry && (
            <Dropdown.Item
              id="retry"
              className={MENU_ITEM_CLASS}
              onAction={() => onRetry(source)}
            >
              <RefreshCw className="size-4" />
              {t('retry')}
            </Dropdown.Item>
          )}

          {canDownload && (
            <Dropdown.Item
              id="download"
              className={MENU_ITEM_CLASS}
              onAction={() => onDownload(source)}
            >
              <Download className="size-4" />
              {t('download')}
            </Dropdown.Item>
          )}

          {canUpdate && (
            <Dropdown.Item
              id="toggle"
              className={MENU_ITEM_CLASS}
              onAction={() => onToggleEnabled(source)}
            >
              {source.isEnabled ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
              {source.isEnabled ? t('disable') : t('enable')}
            </Dropdown.Item>
          )}

          {canDelete && (
            <Dropdown.Item
              id="delete"
              className={`${MENU_ITEM_CLASS} text-destructive`}
              onAction={() => onDelete(source)}
            >
              <Trash2 className="size-4" />
              {t('delete')}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
