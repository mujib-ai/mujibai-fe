import type { NotificationPublic } from '../types';

export interface NotificationDayGroup {
  key: string;
  labelKind: 'today' | 'yesterday' | 'weekday' | 'date';
  weekday?: string;
  date?: string;
  items: NotificationPublic[];
}

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

export function groupNotificationsByDay(
  notifications: NotificationPublic[],
  locale: string
): NotificationDayGroup[] {
  const todayStart = startOfDay(new Date());
  const groups = new Map<string, NotificationDayGroup>();

  for (const notification of notifications) {
    const createdAt = new Date(notification.createdAt);
    if (Number.isNaN(createdAt.getTime())) continue;

    const dayStart = startOfDay(createdAt);
    const diffDays = Math.round((todayStart - dayStart) / 86_400_000);
    const key = String(dayStart);

    if (!groups.has(key)) {
      if (diffDays === 0) {
        groups.set(key, { key, labelKind: 'today', items: [] });
      } else if (diffDays === 1) {
        groups.set(key, { key, labelKind: 'yesterday', items: [] });
      } else if (diffDays > 1 && diffDays < 7) {
        groups.set(key, {
          key,
          labelKind: 'weekday',
          weekday: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
            createdAt
          ),
          items: [],
        });
      } else {
        groups.set(key, {
          key,
          labelKind: 'date',
          date: new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(createdAt),
          items: [],
        });
      }
    }

    groups.get(key)!.items.push(notification);
  }

  return Array.from(groups.values()).sort(
    (a, b) => Number(b.key) - Number(a.key)
  );
}
