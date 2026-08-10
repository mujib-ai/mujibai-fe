'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { cn } from '@/shared/lib/utils';
import { createPortal } from 'react-dom';

import { DashboardAiAssistantChat } from './DashboardAiAssistantChat';
import { useDashboard } from './DashboardProvider';

export function DashboardFloatingAiAssistantButton() {
  const t = useTranslations('aiAssistant');
  const pathname = usePathname();
  const { assistantOpen, toggleAssistant, closeAssistant } = useDashboard();
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!assistantOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAssistant();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [assistantOpen, closeAssistant]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const backdrop = backdropRef.current;
      const chat = chatRef.current;
      if (!overlay || !backdrop || !chat) return;

      gsap.killTweensOf([overlay, backdrop, chat]);
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const duration = reduceMotion ? 0 : 0.32;

      if (assistantOpen) {
        gsap.set(overlay, { display: 'block' });
        gsap
          .timeline()
          .fromTo(
            backdrop,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: duration * 0.75, ease: 'power2.out' }
          )
          .fromTo(
            chat,
            { autoAlpha: 0, y: 28, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration,
              ease: 'power3.out',
              transformOrigin: 'bottom left',
              clearProps: 'transform',
            },
            0
          );
        return;
      }

      gsap
        .timeline({
          onComplete: () => gsap.set(overlay, { display: 'none' }),
        })
        .to(chat, {
          autoAlpha: 0,
          y: 20,
          scale: 0.97,
          duration: duration * 0.75,
          ease: 'power2.in',
        })
        .to(
          backdrop,
          {
            autoAlpha: 0,
            duration: duration * 0.6,
            ease: 'power2.inOut',
          },
          0
        );
    },
    { dependencies: [assistantOpen] }
  );

  if (!mounted || pathname === '/dashboard/studio') return null;

  return createPortal(
    <>
      <div
        ref={overlayRef}
        aria-hidden={!assistantOpen}
        className="pointer-events-none fixed inset-0 z-[9999] hidden"
      >
        <button
          ref={backdropRef}
          type="button"
          tabIndex={assistantOpen ? 0 : -1}
          aria-label={t('close')}
          onClick={closeAssistant}
          className="pointer-events-auto absolute inset-0 bg-[rgba(21,22,30,0.5)] backdrop-blur-sm"
        />
        <div
          ref={chatRef}
          className="pointer-events-auto fixed bottom-24 left-4 sm:left-6 md:left-10"
        >
          <DashboardAiAssistantChat
            onClose={closeAssistant}
            closeLabel={t('close')}
          />
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            aria-label={assistantOpen ? t('close') : t('tooltip')}
            aria-expanded={assistantOpen}
            onClick={toggleAssistant}
            className={cn(
              'from-primary to-primary/70 fixed bottom-[calc(88px_+_env(safe-area-inset-bottom))] left-4 z-[10000] size-14 bg-linear-to-b text-white shadow-xl sm:left-6 sm:size-14 md:bottom-10 md:left-10',
              assistantOpen && 'brightness-110'
            )}
          >
            <Image
              src="/ai-stars.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
              className="size-7 sm:size-8"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={10} className="z-10001">
          {assistantOpen ? t('close') : t('tooltip')}
        </TooltipContent>
      </Tooltip>
    </>,
    document.body
  );
}
