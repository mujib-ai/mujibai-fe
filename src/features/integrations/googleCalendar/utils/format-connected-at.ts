export function formatConnectedAt(connectedAt: string | null): string {
  if (!connectedAt) return '—';
  const date = new Date(connectedAt);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
