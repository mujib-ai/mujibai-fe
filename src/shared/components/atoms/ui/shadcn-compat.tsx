'use client';

/* Temporary API bridge for the former component-library call sites. Every primitive below
 * is backed by the project's shadcn/Radix components, so features can migrate
 * incrementally without retaining the removed dependency in the bundle. */
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  MoreHorizontal,
  X,
} from 'lucide-react';

import { Badge } from './badge';
import { Button as ShadcnButton } from './button';
import { CardContent, CardHeader, CardTitle, Card as ShadcnCard } from './card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Progress } from './progress';
import { Separator as ShadcnSeparator } from './separator';
import { Sheet, SheetClose, SheetContent, SheetTitle } from './sheet';

type LooseProps = Record<string, unknown> & {
  children?: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  onSelectionChange?: (key: string) => void;
  animationType?: string;
};
const clean = (props: LooseProps) => {
  const {
    isDisabled,
    isLoading,
    isRowHeader,
    onPress,
    onOpenChange,
    isOpen,
    placement,
    selectionMode,
    selectedKeys,
    onSelectionChange,
    variant,
    color,
    size,
    radius,
    label,
    value,
    ...dom
  } = props;
  return {
    dom,
    isDisabled,
    isLoading,
    isRowHeader,
    onPress,
    onOpenChange,
    isOpen,
    placement,
    selectionMode,
    selectedKeys,
    onSelectionChange,
    variant,
    color,
    size,
    radius,
    label,
    value,
  };
};

export function Spinner({ className, ...props }: LooseProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn('size-5 animate-spin', className)}
      {...clean(props).dom}
    />
  );
}

export function Skeleton({ className, animationType, ...props }: LooseProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-muted rounded-md',
        animationType !== 'none' && 'animate-pulse',
        className
      )}
      {...clean(props).dom}
    />
  );
}

export function Button(props: LooseProps) {
  const { dom, isDisabled, isLoading, onPress } = clean(props);
  return (
    <ShadcnButton
      {...dom}
      disabled={Boolean(isDisabled) || Boolean(isLoading)}
      onClick={
        onPress as React.MouseEventHandler<HTMLButtonElement> | undefined
      }
    >
      {isLoading ? <Spinner className="size-4" /> : null}
      {props.children}
    </ShadcnButton>
  );
}

export const Separator = ShadcnSeparator;

const CardRoot = (props: LooseProps) => <ShadcnCard {...clean(props).dom} />;
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Title: CardTitle,
});

const TableRoot = ({ children, ...props }: LooseProps) => (
  <div {...clean(props).dom}>{children}</div>
);
const TableScroll = ({ children, ...props }: LooseProps) => (
  <div {...clean(props).dom}>{children}</div>
);
const TableContent = ({ children, ...props }: LooseProps) => (
  <table {...clean(props).dom}>{children}</table>
);
const TableHeader = ({ children, ...props }: LooseProps) => (
  <thead {...clean(props).dom}>{children}</thead>
);
const TableBody = ({ children, ...props }: LooseProps) => (
  <tbody {...clean(props).dom}>{children}</tbody>
);
const TableRow = ({ children, ...props }: LooseProps) => (
  <tr {...clean(props).dom}>{children}</tr>
);
const TableColumn = ({ children, ...props }: LooseProps) => (
  <th {...clean(props).dom}>{children}</th>
);
const TableCell = ({ children, ...props }: LooseProps) => (
  <td {...clean(props).dom}>{children}</td>
);
export const Table = Object.assign(TableRoot, {
  ScrollContainer: TableScroll,
  Content: TableContent,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Column: TableColumn,
  Cell: TableCell,
});

const PaginationRoot = ({ children, ...props }: LooseProps) => (
  <nav {...clean(props).dom}>{children}</nav>
);
const PaginationContent = ({ children, ...props }: LooseProps) => (
  <ul {...clean(props).dom}>{children}</ul>
);
const PaginationItem = ({ children, ...props }: LooseProps) => (
  <li {...clean(props).dom}>{children}</li>
);
const PaginationLink = (props: LooseProps) => (
  <button type="button" {...clean(props).dom}>
    {props.children}
  </button>
);
const PaginationControl = (props: LooseProps) => (
  <button type="button" {...clean(props).dom}>
    {props.children}
  </button>
);
export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationControl,
  Next: PaginationControl,
  PreviousIcon: ChevronLeft,
  NextIcon: ChevronRight,
  Ellipsis: (props: LooseProps) => (
    <span {...clean(props).dom}>
      <MoreHorizontal className="size-4" />
    </span>
  ),
});

type OverlayContextValue = { open: boolean; close: () => void };
const OverlayContext = React.createContext<OverlayContextValue>({
  open: true,
  close: () => undefined,
});
const ModalRoot = ({ children, ...props }: LooseProps) => {
  const { isOpen = true, onOpenChange } = clean(props);
  const close = () =>
    (onOpenChange as ((open: boolean) => void) | undefined)?.(false);
  return (
    <OverlayContext.Provider value={{ open: Boolean(isOpen), close }}>
      {isOpen ? children : null}
    </OverlayContext.Provider>
  );
};
const ModalBackdrop = ({ children, ...props }: LooseProps) => (
  <ModalRoot {...props}>
    <div className={cn('fixed inset-0 z-50 bg-black/50', props.className)}>
      {children}
    </div>
  </ModalRoot>
);
const ModalContainer = ({ children, ...props }: LooseProps) => (
  <div
    className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      props.className
    )}
    {...clean(props).dom}
  >
    {children}
  </div>
);
const ModalDialog = ({ children, ...props }: LooseProps) => (
  <div role="dialog" aria-modal="true" {...clean(props).dom}>
    {children}
  </div>
);
const ModalClose = (props: LooseProps) => {
  const { close } = React.useContext(OverlayContext);
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={close}
      className={cn('absolute top-4 right-4', props.className)}
    >
      <X className="size-4" />
    </button>
  );
};
const Div = ({ children, ...props }: LooseProps) => (
  <div {...clean(props).dom}>{children}</div>
);
export const Modal = Object.assign(ModalRoot, {
  Backdrop: ModalBackdrop,
  Container: ModalContainer,
  Dialog: ModalDialog,
  CloseTrigger: ModalClose,
  Header: Div,
  Body: Div,
  Footer: Div,
  Icon: Div,
  Heading: ({ children, ...props }: LooseProps) => (
    <h2 {...clean(props).dom}>{children}</h2>
  ),
});

const DrawerRoot = ({ children, ...props }: LooseProps) => {
  const { isOpen, onOpenChange } = clean(props);
  return (
    <Sheet
      open={Boolean(isOpen)}
      onOpenChange={onOpenChange as ((open: boolean) => void) | undefined}
    >
      {children}
    </Sheet>
  );
};
const DrawerBackdrop = ({ children }: LooseProps) => <>{children}</>;
const DrawerContent = ({ children, ...props }: LooseProps) => (
  <SheetContent {...clean(props).dom}>{children}</SheetContent>
);
export const Drawer = Object.assign(DrawerRoot, {
  Backdrop: DrawerBackdrop,
  Content: DrawerContent,
  Dialog: Div,
  CloseTrigger: SheetClose,
  Header: Div,
  Heading: SheetTitle,
  Body: Div,
});

const DropdownRoot = DropdownMenu;
const DropdownPopover = ({ children, ...props }: LooseProps) => (
  <DropdownMenuContent {...clean(props).dom}>{children}</DropdownMenuContent>
);
const DropdownMenuBridge = ({ children }: LooseProps) => <>{children}</>;
const DropdownItemBridge = ({ children, ...props }: LooseProps) => {
  const { dom, isDisabled, onPress } = clean(props);
  const action = props.onAction as (() => void) | undefined;
  return (
    <DropdownMenuItem
      {...dom}
      disabled={Boolean(isDisabled)}
      onSelect={action ?? (onPress as (() => void) | undefined)}
    >
      {children}
    </DropdownMenuItem>
  );
};
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownMenuTrigger,
  Popover: DropdownPopover,
  Menu: DropdownMenuBridge,
  Item: DropdownItemBridge,
});

export const Chip = ({ children, ...props }: LooseProps) => (
  <Badge {...clean(props).dom}>{children}</Badge>
);
export const ProgressBar = Object.assign(
  ({ value = 0, ...props }: LooseProps) => (
    <Progress value={Number(value)} {...clean(props).dom} />
  ),
  { Track: Div, Fill: Div }
);

type SelectContextValue = { value?: string; change?: (value: string) => void };
const SelectContext = React.createContext<SelectContextValue>({});
const SelectRoot = ({ children, ...props }: LooseProps) => {
  const { selectedKeys, onSelectionChange, value } = clean(props);
  const selectedKey = props.selectedKey;
  const current = String(
    selectedKey ??
      Array.from(
        (selectedKeys as Iterable<string> | undefined) ?? [String(value ?? '')]
      )[0]
  );
  return (
    <SelectContext.Provider
      value={{
        value: current,
        change: next =>
          (onSelectionChange as ((key: string) => void) | undefined)?.(next),
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
const SelectTrigger = ({ children, ...props }: LooseProps) => (
  <button type="button" {...clean(props).dom}>
    {children}
  </button>
);
const SelectValue = ({ children, ...props }: LooseProps) => {
  const { value } = React.useContext(SelectContext);
  return <span {...clean(props).dom}>{children ?? value}</span>;
};
const SelectPopover = Div;
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Popover: SelectPopover,
});
export const ListBox = Div;
export function ListBoxItem({ children, ...props }: LooseProps) {
  const { change } = React.useContext(SelectContext);
  const key = String(props.id ?? props.value ?? '');
  return (
    <button type="button" onClick={() => change?.(key)} {...clean(props).dom}>
      {children}
    </button>
  );
}
