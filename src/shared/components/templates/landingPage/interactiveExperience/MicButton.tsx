'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/shared/lib/gsap';
import { cn } from '@/shared/lib/utils';
import { Mic } from 'lucide-react';

export function MicButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active) {
        gsap.killTweensOf(ringRef.current);
        gsap.set(ringRef.current, { opacity: 0.5, scale: 1 });
        return;
      }

      gsap.to(ringRef.current, {
        scale: 1.35,
        opacity: 0,
        duration: 1.1,
        ease: 'power1.out',
        repeat: -1,
      });
    },
    { dependencies: [active], scope: ringRef }
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className="group relative flex size-24 items-center justify-center"
    >
      <div
        ref={ringRef}
        className="bg-primary/30 absolute inset-0 rounded-full"
      />
      <div className="bg-primary/15 absolute inset-2 rounded-full" />
      <div
        className={cn(
          'bg-primary relative flex size-14 items-center justify-center rounded-full shadow-lg transition-transform',
          active && 'scale-105'
        )}
      >
        <Mic className="size-6 text-white" strokeWidth={1.75} />
      </div>
    </button>
  );
}

export default MicButton;
