'use client';

import { useTranslations } from 'next-intl';

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/shared/components/atoms/ui/sheet';

import type { SourceDetailsSheetProps } from '../../interfaces';
import SourceDetailsContent from './SourceDetailsContent';

export default function SourceDetailsSheet({
  source,
  onClose,
  can,
  isRetrying,
  onRetry,
  onDelete,
}: SourceDetailsSheetProps) {
  const t = useTranslations('KnowledgeBase');

  return (
    <Sheet open={!!source} onOpenChange={isOpen => !isOpen && onClose()}>
      <SheetContent
        side="left"
        className="flex h-full flex-col gap-4 overflow-y-auto sm:max-w-md"
      >
        <div className="flex flex-col gap-1 p-4 pb-0">
          <SheetTitle>{t('details.title')}</SheetTitle>
        </div>
        {source && (
          <div className="px-4 pb-4">
            <SourceDetailsContent
              source={source}
              can={can}
              isRetrying={isRetrying}
              onRetry={() => onRetry(source)}
              onDelete={() => onDelete(source)}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
