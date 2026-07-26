export const NULL_PLACEHOLDER = '—';

export function formatDuration(seconds: number | null): string {
  if (seconds === null) return NULL_PLACEHOLDER;

  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

export function formatPercentage(
  value: number | null,
  fractionDigits = 1
): string {
  if (value === null) return NULL_PLACEHOLDER;
  const rounded = Number(value.toFixed(fractionDigits));
  return `${rounded}%`;
}

export function formatScore(value: number | null, fractionDigits = 2): string {
  if (value === null) return NULL_PLACEHOLDER;
  return value.toFixed(fractionDigits);
}

export function formatCount(value: number): string {
  return value.toLocaleString();
}
