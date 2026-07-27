import type { AgentState } from '../types/landing-agent.types';

interface LandingAgentStatusProps {
  state: AgentState;
  label: string;
}

export function LandingAgentStatus({ state, label }: LandingAgentStatusProps) {
  const live = [
    'connecting',
    'reconnecting',
    'listening',
    'thinking',
    'speaking',
  ].includes(state);
  return (
    <div
      className="text-muted-foreground flex items-center gap-2 text-sm"
      aria-live="polite"
    >
      <span
        className={`size-2 rounded-full ${live ? 'animate-pulse bg-emerald-500 motion-reduce:animate-none' : state === 'error' ? 'bg-destructive' : 'bg-muted-foreground/40'}`}
      />
      <span>{label}</span>
    </div>
  );
}
