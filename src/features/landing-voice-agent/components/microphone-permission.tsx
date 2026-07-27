import { Mic, MicOff, ShieldCheck } from 'lucide-react';

import type { MicrophonePermission as Permission } from '../types/landing-agent.types';

interface MicrophonePermissionProps {
  permission: Permission;
  prompt: string;
  granted: string;
  denied: string;
  unsupported: string;
}

export function MicrophonePermission({
  permission,
  prompt,
  granted,
  denied,
  unsupported,
}: MicrophonePermissionProps) {
  const message =
    permission === 'granted'
      ? granted
      : permission === 'denied'
        ? denied
        : permission === 'unsupported'
          ? unsupported
          : prompt;
  const Icon =
    permission === 'granted'
      ? ShieldCheck
      : permission === 'denied'
        ? MicOff
        : Mic;

  return (
    <div className="border-border/60 bg-background/70 flex items-start gap-3 rounded-2xl border p-3 text-sm">
      <Icon
        className="mt-0.5 size-4 shrink-0 text-cyan-600"
        aria-hidden="true"
      />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
