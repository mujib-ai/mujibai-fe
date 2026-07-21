'use client';

import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Modal } from '@heroui/react';

import type { ResponsiveFormDialogProps } from '../../interfaces';

export function ResponsiveFormDialog({
  open,
  onClose,
  title,
  description,
  children,
}: ResponsiveFormDialogProps) {
  const isMobile = useIsMobile();

  return (
    <Modal.Backdrop
      isOpen={open}
      onOpenChange={isOpen => !isOpen && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Modal.Container
        placement={isMobile ? 'bottom' : 'center'}
        scroll="inside"
        className="w-full px-4 sm:max-w-lg sm:px-0"
      >
        <Modal.Dialog className="bg-background relative flex max-h-[90vh] w-full flex-col rounded-xl border shadow-lg outline-none">
          <Modal.CloseTrigger />
          <Modal.Header className="flex flex-col gap-1 px-6 pt-6">
            <Modal.Heading className="text-lg leading-none font-semibold">
              {title}
            </Modal.Heading>
            <p className="text-muted-foreground text-sm">{description}</p>
          </Modal.Header>
          <Modal.Body className="overflow-y-auto px-6 py-5">
            {children}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
