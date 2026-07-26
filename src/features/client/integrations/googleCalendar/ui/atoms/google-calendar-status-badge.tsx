import { Badge } from '@/shared/components/atoms/ui/badge';

import type { GoogleCalendarIntegrationStatus } from '../../types';

const STATUS_BADGE_VARIANT: Record<
  GoogleCalendarIntegrationStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  disconnected: 'secondary',
  connected: 'outline',
  active: 'default',
  error: 'destructive',
};

export default function GoogleCalendarStatusBadge({
  status,
  label,
}: {
  status: GoogleCalendarIntegrationStatus;
  label: string;
}) {
  return <Badge variant={STATUS_BADGE_VARIANT[status]}>{label}</Badge>;
}
