import type { CallStatus } from '../types';

export const CALL_STATUS_BADGE_VARIANT: Record<
  CallStatus,
  'default' | 'destructive' | 'secondary'
> = {
  answered: 'default',
  missed: 'secondary',
  failed: 'destructive',
};
