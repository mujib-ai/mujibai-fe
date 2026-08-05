'use client';

import type { ElementType, ReactNode, Ref } from 'react';
import { useRef } from 'react';

import { ScrollTrigger, useGSAP } from '@/shared/lib/gsap';
import { fadeUp, staggerChildren } from '@/shared/lib/motion/presets';
import { useReducedMotion } from '@/shared/lib/motion/reducedMotion';
import { cn } from '@/shared/lib/utils';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay (seconds) applied between direct children. Omit to animate the container as one block. */
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  [prop: string]: unknown;
};

/** Scroll-triggered entrance used across the landing page. Plays once, on first approach. */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  stagger,
  delay = 0,
  y = 32,
  duration = 0.7,
  ...rest
}: RevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const animation = stagger
        ? staggerChildren(container, { reduced, y, duration, stagger, delay })
        : fadeUp(container, { reduced, y, duration, delay });

      // Gate the tween itself behind ScrollTrigger instead of letting the
      // preset run immediately — keeps the single source of truth for
      // easing/duration in the presets module.
      animation.pause();
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => animation.play(),
      });
    },
    {
      scope: containerRef,
      dependencies: [reduced, stagger, y, duration, delay],
    }
  );

  return (
    <Tag
      ref={containerRef as Ref<HTMLElement>}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
