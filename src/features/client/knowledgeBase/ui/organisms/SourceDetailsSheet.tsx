'use client';

import { useTranslations } from 'next-intl';

import { Drawer } from '@heroui/react';

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
    <Drawer.Backdrop
      isOpen={!!source}
      onOpenChange={isOpen => !isOpen && onClose()}
      className="fixed inset-0 z-50 bg-black/50"
    >
      <Drawer.Content
        placement="right"
        className="bg-background fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-4 border-l shadow-lg outline-none sm:max-w-md"
      >
        <Drawer.Dialog className="flex h-full flex-col overflow-y-auto outline-none">
          <Drawer.CloseTrigger className="ring-offset-background focus:ring-ring absolute top-4 right-4 cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden" />
          <Drawer.Header className="flex flex-col gap-1 p-4 pb-0">
            <Drawer.Heading className="text-foreground font-semibold">
              {t('details.title')}
            </Drawer.Heading>
          </Drawer.Header>
          {source && (
            <Drawer.Body className="px-4 pb-4">
              <SourceDetailsContent
                source={source}
                can={can}
                isRetrying={isRetrying}
                onRetry={() => onRetry(source)}
                onDelete={() => onDelete(source)}
              />
            </Drawer.Body>
          )}
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
