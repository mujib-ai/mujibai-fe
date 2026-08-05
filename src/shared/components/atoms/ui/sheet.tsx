'use client';

import * as React from 'react';

import { fadeIn, fadeOut, sheetEnter, sheetExit } from '@/shared/lib/motion';
import { useGsapPresence } from '@/shared/lib/motion/usePresence';
import { cn } from '@/shared/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

const SheetOpenContext = React.createContext(false);

function Sheet({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetOpenContext value={currentOpen}>
      <SheetPrimitive.Root
        data-slot="sheet"
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </SheetOpenContext>
  );
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  open,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay> & { open: boolean }) {
  const { ref, rendered } = useGsapPresence<HTMLDivElement>(
    open,
    (el, ctx) => fadeIn(el, { ...ctx, duration: 0.2 }),
    (el, ctx) => fadeOut(el, ctx)
  );

  if (!rendered) return null;

  return (
    <SheetPrimitive.Overlay
      ref={ref}
      forceMount
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-100 bg-black/50', className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  const open = React.useContext(SheetOpenContext);
  const { ref, rendered } = useGsapPresence<HTMLDivElement>(
    open,
    sheetEnter(side),
    sheetExit(side)
  );

  if (!rendered) return null;

  return (
    <SheetPortal>
      <SheetOverlay open={open} />
      <SheetPrimitive.Content
        ref={ref}
        forceMount
        data-slot="sheet-content"
        className={cn(
          'bg-popover fixed z-100 flex flex-col gap-4 shadow-none',
          side === 'right' &&
            'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' && 'inset-x-0 top-0 h-auto border-b',
          side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        <SheetPrimitive.Title className="sr-only">Menu</SheetPrimitive.Title>
        <SheetPrimitive.Description className="sr-only">
          Navigation menu
        </SheetPrimitive.Description>
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring bg-destructive hover:bg-destructive/90 absolute top-4 right-4 cursor-pointer rounded-full p-2 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
};
