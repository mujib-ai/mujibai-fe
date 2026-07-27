'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

import { gsap, useGSAP } from '@/shared/lib/gsap';

export function AnimatedTabPanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

export default AnimatedTabPanel;
