import { Badge } from '@/shared/components/atoms/ui/badge';

import type { SlackIntegrationStatus } from '../../types';

const STATUS_BADGE_VARIANT: Record<
  SlackIntegrationStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  disconnected: 'secondary',
  connected: 'outline',
  active: 'default',
  error: 'destructive',
};

export default function SlackStatusBadge({
  status,
  label,
}: {
  status: SlackIntegrationStatus;
  label: string;
}) {
  return <Badge variant={STATUS_BADGE_VARIANT[status]}>{label}</Badge>;
}
