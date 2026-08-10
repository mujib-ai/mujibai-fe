'use client';

import type { ReactNode } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { cn } from '@/shared/lib/utils';
import {
  Copy,
  Maximize2,
  Minimize2,
  Plus,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react';

import { AiStarsIcon, SendArrowIcon } from './AiAssistantIcons';
import { useDashboardAiAssistantChat } from './useDashboardAiAssistantChat';

export function DashboardAiAssistantChat({
  onClose,
  closeLabel,
}: {
  onClose: () => void;
  closeLabel: string;
}) {
  const { expanded, header, messages, messagesEndRef, composer } =
    useDashboardAiAssistantChat();
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label={header.title}
      className={cn(
        'bg-background text-foreground border-primary/20 shadow-primary/15 flex h-128 w-[min(90vw,508px)] flex-col gap-3 rounded-2xl border p-3 shadow-xl sm:p-4',
        expanded && 'fixed inset-4 z-[10001] h-auto w-auto sm:inset-8'
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-2 p-1.5 sm:p-3">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <X />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={header.expandLabel}
            onClick={header.onExpand}
          >
            {expanded ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>
        <h2 className="text-sm font-normal sm:text-lg">{header.title}</h2>
      </header>
      <div
        className="flex flex-1 flex-col gap-4 overflow-y-auto"
        aria-live="polite"
      >
        {messages.map(message => (
          <div key={message.id} className="flex flex-col items-end">
            {message.role === 'user' ? (
              <div className="bg-primary/10 text-foreground max-w-[85%] rounded-t-xl rounded-bl-xl p-2">
                <p className="text-sm leading-6 font-medium sm:text-base">
                  {message.content}
                </p>
              </div>
            ) : (
              <div className="flex w-full items-start gap-3">
                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-xs leading-5 sm:text-sm sm:leading-6">
                    {message.content}
                  </p>
                  <div className="flex gap-3">
                    <ActionButton
                      label={message.copyLabel}
                      onClick={message.onCopy}
                    >
                      <Copy />
                    </ActionButton>
                    <ActionButton
                      label={message.dislikeLabel}
                      pressed={message.reaction === 'dislike'}
                      onClick={message.onDislike}
                    >
                      <ThumbsDown
                        fill={
                          message.reaction === 'dislike'
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </ActionButton>
                    <ActionButton
                      label={message.likeLabel}
                      pressed={message.reaction === 'like'}
                      onClick={message.onLike}
                    >
                      <ThumbsUp
                        fill={
                          message.reaction === 'like' ? 'currentColor' : 'none'
                        }
                      />
                    </ActionButton>
                  </div>
                </div>
                <div className="from-primary to-primary/70 flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b">
                  <AiStarsIcon className="text-primary-foreground size-5" />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          size="icon"
          aria-label={composer.sendLabel}
          onClick={composer.handleSend}
          disabled={!composer.canSend}
          className="from-primary to-primary/70 text-primary-foreground bg-linear-to-b"
        >
          <SendArrowIcon className="size-6" />
        </Button>
        <div className="border-primary/20 focus-within:border-primary flex flex-1 items-center gap-1 rounded-lg border p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={composer.attachLabel}
          >
            <Plus />
          </Button>
          <Label htmlFor={composer.inputId} className="sr-only">
            {composer.placeholder}
          </Label>
          <Input
            id={composer.inputId}
            value={composer.draft}
            onChange={event => composer.setDraft(event.target.value)}
            onKeyDown={composer.handleInputKeyDown}
            placeholder={composer.placeholder}
            className="h-8 flex-1 rounded-none bg-transparent p-0 text-xs sm:text-sm"
          />
        </div>
      </div>
    </section>
  );
}

function ActionButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'text-muted-foreground hover:text-primary [&_svg]:size-4 sm:[&_svg]:size-5',
        pressed && 'text-primary'
      )}
    >
      {children}
    </button>
  );
}
