'use client';

import { useLocale } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { Bot, Mic, MicOff, PhoneOff, Radio, RotateCcw } from 'lucide-react';

import { useLandingAgent } from '../hooks/use-landing-agent';
import { getLandingAgentMessages } from '../lib/messages';
import type { LandingAgentLanguage } from '../types/landing-agent.types';
import { AudioVisualizer } from './audio-visualizer';
import { ConversationTranscript } from './conversation-transcript';
import { LandingAgentStatus } from './landing-agent-status';
import { MicrophonePermission } from './microphone-permission';

interface LandingAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LandingAgentDialog({
  open,
  onOpenChange,
}: LandingAgentDialogProps) {
  const locale = useLocale();
  const t = getLandingAgentMessages(locale);
  const agent = useLandingAgent(
    (locale.startsWith('ar') ? 'ar' : 'en') as LandingAgentLanguage
  );
  const active = !['idle', 'ended', 'error'].includes(agent.state);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) agent.reset();
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[calc(100dvh-1rem)] gap-4 overflow-y-auto rounded-b-none p-4 sm:max-w-xl sm:rounded-3xl sm:p-6"
        aria-label={t.title}
      >
        <DialogHeader className="pe-8 text-start">
          <div className="flex items-center gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Bot className="size-6" aria-hidden="true" />
            </div>
            <div>
              <DialogTitle>{t.title}</DialogTitle>
              <LandingAgentStatus
                state={agent.state}
                label={t.states[agent.state]}
              />
            </div>
          </div>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <MicrophonePermission
          permission={agent.microphone.permission}
          prompt={t.permission.prompt}
          granted={t.permission.granted}
          denied={t.permission.denied}
          unsupported={t.permission.unsupported}
        />
        {agent.error && (
          <div
            role="alert"
            className="bg-destructive/10 text-destructive rounded-2xl px-4 py-3 text-sm"
          >
            {t.errors[agent.error]}
          </div>
        )}
        <button
          type="button"
          onClick={agent.bargeIn}
          disabled={agent.state !== 'speaking'}
          className="rounded-3xl bg-gradient-to-b from-cyan-500/10 to-transparent disabled:cursor-default"
          aria-label={agent.state === 'speaking' ? t.interrupt : t.visualizer}
        >
          <AudioVisualizer
            active={active}
            level={agent.microphone.level}
            speaking={agent.state === 'speaking'}
          />
          {agent.state === 'speaking' && (
            <span className="text-muted-foreground mb-3 block text-xs">
              {t.interrupt}
            </span>
          )}
        </button>
        <ConversationTranscript
          entries={agent.transcript}
          emptyLabel={t.transcript.empty}
          userLabel={t.transcript.you}
          agentLabel={t.transcript.agent}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['idle', 'ended', 'error'].includes(agent.state) ? (
            <Button
              type="button"
              onClick={agent.start}
              disabled={agent.microphone.permission === 'requesting'}
              className="min-w-44"
            >
              {agent.state === 'idle' ? <Radio /> : <RotateCcw />}
              {agent.state === 'idle' ? t.start : t.startAgain}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon-lg"
                onClick={agent.microphone.toggleMute}
                aria-label={agent.microphone.muted ? t.unmute : t.mute}
              >
                {agent.microphone.muted ? <MicOff /> : <Mic />}
              </Button>
              <Button type="button" variant="destructive" onClick={agent.end}>
                <PhoneOff />
                {t.end}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
