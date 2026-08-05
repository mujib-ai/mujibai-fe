'use client';

import * as React from 'react';

import { gsap, useGSAP } from '@/shared/lib/gsap';
import { activeIndicatorMove } from '@/shared/lib/motion';
import { useReducedMotion } from '@/shared/lib/motion/reducedMotion';
import { cn } from '@/shared/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const hasPositioned = React.useRef(false);

  const moveIndicator = React.useCallback(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const active = list.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]'
    );
    if (!active) {
      gsap.set(indicator, { autoAlpha: 0 });
      return;
    }

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const x = activeRect.left - listRect.left;
    const width = activeRect.width;

    if (!hasPositioned.current) {
      gsap.set(indicator, { x, width, autoAlpha: 1 });
      hasPositioned.current = true;
      return;
    }

    gsap.set(indicator, { autoAlpha: 1 });
    activeIndicatorMove(indicator, { x, width, reduced });
  }, [reduced]);

  useGSAP(
    () => {
      moveIndicator();
      const list = listRef.current;
      if (!list) return;

      const attributeObserver = new MutationObserver(moveIndicator);
      attributeObserver.observe(list, {
        attributes: true,
        attributeFilter: ['data-state'],
        subtree: true,
      });

      const resizeObserver = new ResizeObserver(moveIndicator);
      resizeObserver.observe(list);

      return () => {
        attributeObserver.disconnect();
        resizeObserver.disconnect();
      };
    },
    { scope: listRef, dependencies: [moveIndicator] }
  );

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        'bg-control text-muted-foreground relative inline-flex h-12 w-fit items-center justify-center rounded-full p-1',
        className
      )}
      {...props}
    >
      <span
        ref={indicatorRef}
        data-slot="tabs-indicator"
        aria-hidden="true"
        className="bg-background pointer-events-none absolute inset-y-1 start-0 rounded-full shadow-none"
        style={{ visibility: 'hidden' }}
      />
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "text-muted-foreground data-[state=active]:text-foreground relative z-10 inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-full border-0 px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
