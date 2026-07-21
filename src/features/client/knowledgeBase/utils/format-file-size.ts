const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

export function formatFileSize(
  bytes: number | null | undefined,
  locale: string = 'en'
): string {
  if (bytes === null || bytes === undefined) return '—';
  if (bytes <= 0) return `0 ${UNITS[0]}`;

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    UNITS.length - 1
  );
  const value = bytes / 1024 ** exponent;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);

  return `${formatted} ${UNITS[exponent]}`;
}
