'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Modal } from '@heroui/react';
import { XIcon } from 'lucide-react';

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog subcomponents must be used within a <Dialog>');
  }
  return context;
}

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({ open, onOpenChange }),
    [open, onOpenChange]
  );
  return <DialogContext value={value}>{children}</DialogContext>;
}

function withCloseHandler(
  onOpenChange: (open: boolean) => void,
  nextOpen: boolean,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
) {
  return (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    onOpenChange(nextOpen);
  };
}

function DialogTrigger({
  asChild,
  onClick,
  children,
  ...props
}: {
  asChild?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.ComponentProps<'button'>, 'onClick'>) {
  const { onOpenChange } = useDialogContext();
  const handleClick = withCloseHandler(onOpenChange, true, onClick);

  if (
    asChild &&
    React.isValidElement<{
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }>(children)
  ) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button
      type="button"
      data-slot="dialog-trigger"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogClose({
  asChild,
  onClick,
  children,
  ...props
}: {
  asChild?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.ComponentProps<'button'>, 'onClick'>) {
  const { onOpenChange } = useDialogContext();
  const handleClick = withCloseHandler(onOpenChange, false, onClick);

  if (
    asChild &&
    React.isValidElement<{
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }>(children)
  ) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button
      type="button"
      data-slot="dialog-close"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
} & Omit<React.ComponentProps<typeof Modal.Dialog>, 'className' | 'children'>) {
  const { open, onOpenChange } = useDialogContext();

  return (
    <Modal.Backdrop
      isOpen={open}
      onOpenChange={onOpenChange}
      data-slot="dialog-portal"
      className="data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Modal.Container
        data-slot="dialog-overlay"
        className="data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95 w-full max-w-[calc(100%-2rem)] duration-200 sm:max-w-lg"
      >
        <Modal.Dialog
          data-slot="dialog-content"
          className={cn(
            'bg-background relative grid w-full gap-4 rounded-lg border p-6 shadow-lg outline-none',
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <button
              type="button"
              data-slot="dialog-close"
              onClick={() => onOpenChange(false)}
              className="ring-offset-background focus:ring-ring absolute top-4 right-4 cursor-pointer rounded-sm bg-red-500 p-1 text-white transition-opacity hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </button>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Modal.Heading>) {
  return (
    <Modal.Heading
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
