import { BookOpen, type LucideIcon, Mail, MessageSquare } from 'lucide-react';

export type ContactReason = 'support' | 'sales' | 'bug' | 'partner' | 'press';

export const CONTACT_REASONS: ContactReason[] = [
  'support',
  'sales',
  'bug',
  'partner',
  'press',
];

export type ContactChannel = {
  key: 'mail' | 'chat' | 'help';
  href: string;
  icon: LucideIcon;
  tintClass: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    key: 'mail',
    href: 'mailto:tech@mujibai.net',
    icon: Mail,
    tintClass: 'bg-(--brand)',
  },
  {
    key: 'chat',
    href: '#chat',
    icon: MessageSquare,
    tintClass: 'bg-(--green)',
  },
  {
    key: 'help',
    href: '/help-center',
    icon: BookOpen,
    tintClass: 'bg-(--pink)',
  },
];

export const CONTACT_STATS = [
  { valueKey: 'responseValue', labelKey: 'responseLabel' },
  { valueKey: 'resolvedValue', labelKey: 'resolvedLabel' },
  { valueKey: 'statusValue', labelKey: 'statusLabel' },
] as const;
