'use client';

import { useState } from 'react';

import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

import { Mic } from 'lucide-react';

import { getLandingAgentMessages } from '../lib/messages';

const LandingAgentDialog = dynamic(
  () =>
    import('./landing-agent-dialog').then(module => module.LandingAgentDialog),
  { ssr: false }
);

export function LandingAgentTrigger() {
  const [open, setOpen] = useState(false);
  const t = getLandingAgentMessages(useLocale());
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none sm:end-6 sm:bottom-6 sm:size-16"
        aria-label={t.open}
        aria-haspopup="dialog"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20 motion-reduce:animate-none" />
        <Mic className="relative size-6 sm:size-7" aria-hidden="true" />
      </button>
      {open && <LandingAgentDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}
