import { useTranslations } from 'next-intl';

export function TeamOnlineBadge() {
  const t = useTranslations('contact.form');

  return (
    <span className="font- flex items-center gap-1.5 text-[10px] text-(--green)">
      <span className="size-1.5 animate-pulse rounded-full bg-(--green)" />
      {t('online')}
    </span>
  );
}
