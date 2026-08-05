'use client';

import { useEffect, useState } from 'react';

export type MotionDirection = 'ltr' | 'rtl';

export function getDocumentDirection(): MotionDirection {
  if (typeof document === 'undefined') return 'ltr';
  return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
}

/** Tracks `<html dir>` so entrance directions stay correct if the locale changes. */
export function useMotionDirection(): MotionDirection {
  const [dir, setDir] = useState<MotionDirection>(getDocumentDirection);

  useEffect(() => {
    const observer = new MutationObserver(() => setDir(getDocumentDirection()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });
    return () => observer.disconnect();
  }, []);

  return dir;
}

/** Signed x offset for an entrance sliding in from the inline-start edge. */
export function inlineStartOffset(
  distance: number,
  dir: MotionDirection
): number {
  return dir === 'rtl' ? distance : -distance;
}

/** Signed x offset for an entrance sliding in from the inline-end edge. */
export function inlineEndOffset(
  distance: number,
  dir: MotionDirection
): number {
  return dir === 'rtl' ? -distance : distance;
}
