'use client';

import type { ElementType, ReactNode, Ref } from 'react';
import { useRef } from 'react';

import { gsap, useGSAP } from '@/shared/lib/gsap';
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

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const targets = stagger
        ? Array.from(containerRef.current.children)
        : containerRef.current;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
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
