import type { SlackIntegrationStatus } from '../../types';
import { SlackStatusBadge } from '../atoms';

export default function SlackWorkspaceInfo({
  workspaceName,
  status,
  statusLabel,
}: {
  workspaceName: string | null;
  status: SlackIntegrationStatus;
  statusLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-foreground text-base font-semibold">
        {workspaceName}
      </span>
      <SlackStatusBadge status={status} label={statusLabel} />
    </div>
  );
}
