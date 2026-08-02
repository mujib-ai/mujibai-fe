'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { Edit, RotateCw, Trash2 } from 'lucide-react';

import type { ApiKeyPublic } from '../../types';

export default function ApiKeyRowActions({
  apiKey,
  onEdit,
  onRotate,
  onRevoke,
}: {
  apiKey: ApiKeyPublic;
  onEdit: (apiKey: ApiKeyPublic) => void;
  onRotate: (apiKey: ApiKeyPublic) => void;
  onRevoke: (apiKey: ApiKeyPublic) => void;
}) {
  const t = useTranslations('APIKeys');
  const disabled = apiKey.status !== 'active';

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary h-10 w-10 rounded-full"
            onClick={() => onEdit(apiKey)}
            disabled={disabled}
            aria-label={t('edit.title')}
          >
            <Edit name="edit" size={16} className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('edit.title')}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-700 hover:bg-amber-500/20 hover:text-amber-700"
            onClick={() => onRotate(apiKey)}
            disabled={disabled}
            aria-label={t('rotate.title')}
          >
            <RotateCw className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('rotate.title')}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full bg-red-500/20 text-red-700 hover:bg-red-500/20 hover:text-red-700"
            onClick={() => onRevoke(apiKey)}
            disabled={disabled}
            aria-label={t('revoke.title')}
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('revoke.title')}</TooltipContent>
      </Tooltip>
    </div>
  );
}
