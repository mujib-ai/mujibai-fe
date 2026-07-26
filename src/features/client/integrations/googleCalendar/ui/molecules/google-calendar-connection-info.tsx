import type { GoogleCalendarIntegrationStatus } from '../../types';
import { formatConnectedAt } from '../../utils/format-connected-at';
import { GoogleCalendarStatusBadge } from '../atoms';

export default function GoogleCalendarConnectionInfo({
  connectedAt,
  connectedOnLabel,
  status,
  statusLabel,
}: {
  connectedAt: string | null;
  connectedOnLabel: string;
  status: GoogleCalendarIntegrationStatus;
  statusLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-foreground text-base font-semibold">
        {connectedOnLabel} {formatConnectedAt(connectedAt)}
      </span>
      <GoogleCalendarStatusBadge status={status} label={statusLabel} />
    </div>
  );
}
