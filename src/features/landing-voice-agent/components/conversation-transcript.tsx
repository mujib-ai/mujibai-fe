import type { TranscriptEntry } from '../types/landing-agent.types';

interface ConversationTranscriptProps {
  entries: TranscriptEntry[];
  emptyLabel: string;
  userLabel: string;
  agentLabel: string;
}

export function ConversationTranscript({
  entries,
  emptyLabel,
  userLabel,
  agentLabel,
}: ConversationTranscriptProps) {
  return (
    <div
      className="bg-muted/50 h-44 space-y-3 overflow-y-auto rounded-2xl p-4"
      aria-live="polite"
      aria-label="Conversation transcript"
    >
      {entries.length === 0 ? (
        <p className="text-muted-foreground flex h-full items-center justify-center text-center text-sm">
          {emptyLabel}
        </p>
      ) : (
        entries.map(entry => (
          <div
            key={entry.id}
            className={entry.speaker === 'user' ? 'text-end' : 'text-start'}
          >
            <span className="text-muted-foreground mb-1 block text-xs">
              {entry.speaker === 'user' ? userLabel : agentLabel}
            </span>
            <p className="bg-background inline-block max-w-[90%] rounded-2xl px-3 py-2 text-sm shadow-sm">
              {entry.text}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
