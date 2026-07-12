import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export function DocParagraph({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'my-4 leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4',
        className
      )}
      {...props}
    />
  );
}

export function DocList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn(
        'my-4 ml-6 list-disc space-y-2 text-muted-foreground marker:text-primary',
        className
      )}
      {...props}
    />
  );
}

export function DocOrderedList({
  className,
  ...props
}: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={cn(
        'my-4 ml-6 list-decimal space-y-2 text-muted-foreground marker:text-primary',
        className
      )}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground dark:bg-input/30',
        className
      )}
      {...props}
    />
  );
}

export function DocSection({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return <section className={cn('scroll-mt-24', className)} {...props} />;
}
