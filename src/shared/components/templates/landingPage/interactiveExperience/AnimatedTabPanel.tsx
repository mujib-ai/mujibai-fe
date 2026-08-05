'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useGSAP } from '@/shared/lib/gsap';
import { fadeUp } from '@/shared/lib/motion/presets';
import { useReducedMotion } from '@/shared/lib/motion/reducedMotion';

export function AnimatedTabPanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      fadeUp(ref.current, { reduced, y: 16, duration: 0.45 });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return <div ref={ref}>{children}</div>;
}

export default AnimatedTabPanel;
