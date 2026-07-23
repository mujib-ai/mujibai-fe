'use client';

import { useTranslations } from 'next-intl';

import { Button, Modal, Spinner } from '@heroui/react';
import { EyeOff } from 'lucide-react';

import type { ToggleSourceConfirmDialogProps } from '../../interfaces';

const BUTTON_OUTLINE_CLASS =
  'border-input hover:bg-accent inline-flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-transparent px-4 py-2 text-sm shadow-xs disabled:pointer-events-none disabled:opacity-50';
const BUTTON_PRIMARY_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-50';

export default function ToggleSourceConfirmDialog({
  source,
  onClose,
  onConfirm,
  isToggling,
}: ToggleSourceConfirmDialogProps) {
  const t = useTranslations('KnowledgeBase.confirm');

  return (
    <Modal.Backdrop
      isOpen={!!source}
      onOpenChange={isOpen => !isOpen && onClose()}
      isDismissable={!isToggling}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Modal.Container placement="center" className="w-full px-4 sm:max-w-md">
        <Modal.Dialog className="bg-background relative flex w-full flex-col gap-4 rounded-xl border p-6 shadow-lg outline-none">
          <Modal.CloseTrigger isDisabled={isToggling} />
          <Modal.Header className="flex flex-col items-center gap-3 text-center">
            <Modal.Icon className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
              <EyeOff className="size-6" />
            </Modal.Icon>
            <Modal.Heading className="text-lg font-semibold">
              {t('disableTitle')}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className="text-muted-foreground text-center text-sm">
            {t('disableMessage', { name: source?.name ?? '' })}
          </Modal.Body>
          <Modal.Footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              onPress={onClose}
              isDisabled={isToggling}
              className={BUTTON_OUTLINE_CLASS}
            >
              {t('disableCancel')}
            </Button>
            <Button
              isDisabled={isToggling}
              onPress={onConfirm}
              className={BUTTON_PRIMARY_CLASS}
            >
              {isToggling ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" color="current" />
                  {t('disableConfirm')}
                </span>
              ) : (
                t('disableConfirm')
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
