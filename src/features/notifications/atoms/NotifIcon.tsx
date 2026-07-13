import { type ReactElement, type ReactNode } from 'react';

export type NotifIconName =
  | 'check'
  | 'inbox'
  | 'shield'
  | 'bolt'
  | 'plug'
  | 'key'
  | 'log'
  | 'cog'
  | 'x';

const PATHS: Record<NotifIconName, ReactNode> = {
  check: <path d="m5 12 5 5L20 7" />,
  inbox: (
    <>
      <path d="M3 12h5l2 3h4l2-3h5" />
      <path d="M3 12V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  plug: (
    <>
      <path d="M9 4v4M15 4v4" />
      <path d="M7 8h10v4a5 5 0 0 1-10 0z" />
      <path d="M12 17v3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14" r="3" />
      <path d="M11 13l8-8" />
      <path d="m17 7 2 2" />
      <path d="m15 9 2 2" />
    </>
  ),
  log: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
};

type NotifIconProps = {
  name: string;
  size?: number;
};

/**
 * Small SVG set for the notifications UI (subset of line icons).
 */
export function NotifIcon({ name, size = 14 }: NotifIconProps): ReactElement {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const node = PATHS[name as NotifIconName];
  return <svg {...props}>{node ?? null}</svg>;
}
