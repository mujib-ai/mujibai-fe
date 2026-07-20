import type { TicketStatus } from '../types';

export const TICKET_STATUS_BADGE_VARIANT: Record<
  TicketStatus,
  'default' | 'destructive' | 'secondary'
> = {
  OPEN: 'destructive',
  IN_PROGRESS: 'secondary',
  RESOLVED: 'default',
  CLOSED: 'secondary',
};
