import type { ReactNode } from 'react';
import React from 'react';

/**
 * Manual Jest mock for `@heroui/react`.
 *
 * The real package is ESM-only (react-aria-components-based) and ships no
 * CJS entry, which Jest's default resolver/transformer can't handle. Rather
 * than fighting Jest's ESM interop for a UI kit whose visual output in this
 * project comes entirely from explicit Tailwind classNames anyway (HeroUI's
 * own stylesheet isn't loaded), this mock renders plain semantic HTML that
 * preserves the props our components rely on (children, className,
 * isOpen/onOpenChange, isDisabled, onPress) so unit tests can render and
 * assert on real content without needing HeroUI's actual implementation.
 */

type AnyProps = Record<string, unknown> & {
  children?: ReactNode;
  className?: string;
};

function passthrough(Tag: keyof React.JSX.IntrinsicElements) {
  return function Passthrough({ children, ...props }: AnyProps) {
    return React.createElement(Tag, props, children);
  };
}

function makeButton() {
  return function MockButton({
    children,
    onPress,
    onClick,
    isDisabled,
    disabled,
    ...props
  }: AnyProps & {
    onPress?: () => void;
    onClick?: () => void;
    isDisabled?: boolean;
    disabled?: boolean;
  }) {
    return (
      <button
        type={(props.type as 'button' | 'submit') ?? 'button'}
        disabled={isDisabled ?? disabled}
        onClick={() => {
          onPress?.();
          onClick?.();
        }}
        {...props}
      >
        {children}
      </button>
    );
  };
}

function makeOverlay() {
  return function MockOverlay({
    children,
    isOpen,
  }: AnyProps & { isOpen?: boolean }) {
    if (!isOpen) return null;
    return <>{children}</>;
  };
}

export const Button = Object.assign(makeButton(), { Root: makeButton() });

export const Card = Object.assign(passthrough('div'), {
  Header: passthrough('div'),
  Title: passthrough('h3'),
  Description: passthrough('p'),
  Content: passthrough('div'),
  Footer: passthrough('div'),
});

export const Chip = Object.assign(passthrough('span'), {
  Label: passthrough('span'),
});

export const Separator = passthrough('hr');

export const Skeleton = passthrough('div');

export const ProgressBar = Object.assign(passthrough('div'), {
  Output: passthrough('span'),
  Track: passthrough('div'),
  Fill: passthrough('div'),
});

export const ListBox = passthrough('ul');
export const ListBoxItem = passthrough('li');

export const Dropdown = Object.assign(passthrough('div'), {
  Trigger: passthrough('button'),
  Popover: passthrough('div'),
  Menu: passthrough('div'),
  Item: function MockDropdownItem({
    children,
    onAction,
    ...props
  }: AnyProps & { onAction?: () => void }) {
    return (
      <div role="menuitem" onClick={() => onAction?.()} {...props}>
        {children}
      </div>
    );
  },
});

export const Select = Object.assign(passthrough('div'), {
  Trigger: passthrough('button'),
  Value: passthrough('span'),
  Popover: passthrough('div'),
});

export const Modal = Object.assign(passthrough('div'), {
  Backdrop: makeOverlay(),
  Container: passthrough('div'),
  Dialog: passthrough('div'),
  Header: passthrough('div'),
  Body: passthrough('div'),
  Footer: passthrough('div'),
  Heading: passthrough('h2'),
  Icon: passthrough('div'),
  CloseTrigger: passthrough('button'),
});

export const Drawer = Object.assign(passthrough('div'), {
  Backdrop: makeOverlay(),
  Content: passthrough('div'),
  Dialog: passthrough('div'),
  Header: passthrough('div'),
  Body: passthrough('div'),
  Footer: passthrough('div'),
  Heading: passthrough('h2'),
  Handle: passthrough('div'),
  CloseTrigger: passthrough('button'),
});

export const Table = Object.assign(passthrough('table'), {
  ScrollContainer: passthrough('div'),
  Content: passthrough('table'),
  Header: passthrough('thead'),
  Column: passthrough('th'),
  Body: passthrough('tbody'),
  Row: passthrough('tr'),
  Cell: passthrough('td'),
  Footer: passthrough('tfoot'),
});
