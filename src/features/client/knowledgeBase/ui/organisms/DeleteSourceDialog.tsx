'use client';

import { useTranslations } from 'next-intl';

import { Button, Modal } from '@heroui/react';
import { AlertTriangle, Loader2 } from 'lucide-react';

import type { DeleteSourceDialogProps } from '../../interfaces';

const BUTTON_OUTLINE_CLASS =
  'border-input hover:bg-accent inline-flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-transparent px-4 py-2 text-sm shadow-xs disabled:pointer-events-none disabled:opacity-50';
const BUTTON_DESTRUCTIVE_CLASS =
  'bg-destructive text-white hover:bg-destructive/90 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-50';

export default function DeleteSourceDialog({
  source,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteSourceDialogProps) {
  const t = useTranslations('KnowledgeBase.confirm');

  return (
    <Modal.Backdrop
      isOpen={!!source}
      onOpenChange={isOpen => !isOpen && onClose()}
      isDismissable={!isDeleting}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Modal.Container placement="center" className="w-full px-4 sm:max-w-md">
        <Modal.Dialog className="bg-background relative flex w-full flex-col gap-4 rounded-xl border p-6 shadow-lg outline-none">
          <Modal.CloseTrigger isDisabled={isDeleting} />
          <Modal.Header className="flex flex-col items-center gap-3 text-center">
            <Modal.Icon className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500">
              <AlertTriangle className="size-6" />
            </Modal.Icon>
            <Modal.Heading className="text-lg font-semibold">
              {t('deleteTitle')}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className="text-muted-foreground text-center text-sm">
            {t('deleteMessage', { name: source?.name ?? '' })}
          </Modal.Body>
          <Modal.Footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              onPress={onClose}
              isDisabled={isDeleting}
              className={BUTTON_OUTLINE_CLASS}
            >
              {t('deleteCancel')}
            </Button>
            <Button
              isDisabled={isDeleting}
              onPress={onConfirm}
              className={BUTTON_DESTRUCTIVE_CLASS}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {t('deleteConfirm')}
                </span>
              ) : (
                t('deleteConfirm')
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
