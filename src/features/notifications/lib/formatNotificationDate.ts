function parseNotificationDate(value: string): Date | null {
  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(value);
  const date = new Date(hasTimeZone ? value : `${value}Z`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfLocalDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

export function formatNotificationDate(
  value: string,
  locale: string,
  now = new Date()
): string {
  const date = parseNotificationDate(value);
  if (!date) return '';

  const dayDifference = Math.round(
    (startOfLocalDay(date) - startOfLocalDay(now)) / 86_400_000
  );
  const time = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

  if (dayDifference === 0 || dayDifference === -1) {
    const day = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
    }).format(dayDifference, 'day');

    return `${day}, ${time}`;
  }

  if (dayDifference > -7 && dayDifference < 0) {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
    }).format(date);

    return `${weekday}, ${time}`;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
