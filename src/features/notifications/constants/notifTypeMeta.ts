import type { NotifIconName } from '../atoms/NotifIcon';
import type { NotificationSeverity } from '../types';

export const NOTIFICATION_SEVERITY_META: Record<
  NotificationSeverity,
  { icon: NotifIconName; className: string }
> = {
  info: { icon: 'inbox', className: 'bg-sky-500/10 text-sky-600' },
  success: { icon: 'check', className: 'bg-emerald-500/10 text-emerald-600' },
  warning: { icon: 'bolt', className: 'bg-amber-500/10 text-amber-600' },
  critical: { icon: 'shield', className: 'bg-red-500/10 text-red-600' },
};
