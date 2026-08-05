'use client';

import { useRef, useState } from 'react';

import { gsap, useGSAP } from '@/shared/lib/gsap';

import { useReducedMotion } from './reducedMotion';
import type { MotionCtx } from './tokens';

type PresenceAnimator<T extends Element> = (
  el: T,
  ctx: MotionCtx
) => gsap.core.Tween | gsap.core.Timeline;

/**
 * Drives GSAP enter/exit animations for elements whose host library (Radix, etc.)
 * would otherwise unmount them immediately on close. Consumers must render the
 * element unconditionally (e.g. via `forceMount`) while `rendered` is true, and
 * render nothing once it flips to false.
 */
export function useGsapPresence<T extends HTMLElement = HTMLElement>(
  open: boolean,
  enter: PresenceAnimator<T>,
  exit: PresenceAnimator<T>
) {
  const ref = useRef<T>(null);
  const [rendered, setRendered] = useState(open);
  const reduced = useReducedMotion();

  // Mount synchronously so the enter animation can start from the very first
  // paint — no flash of unanimated content.
  if (open && !rendered) setRendered(true);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (open) {
        enter(ref.current, { reduced });
        return;
      }

      if (rendered) {
        const animation = exit(ref.current, { reduced });
        animation.eventCallback('onComplete', () => setRendered(false));
        return () => {
          animation.eventCallback('onComplete', null);
        };
      }
    },
    { dependencies: [open, rendered], scope: ref }
  );

  return { ref, rendered };
}
