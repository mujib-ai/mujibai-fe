'use client';

import GreetingSelectsRow from '../molecules/GreetingSelectsRow';

export default function CallGreetingVoice({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <article>
      <h2 className="text-xl font-semibold">{t('callGreeting')}</h2>
      <GreetingSelectsRow t={t} locale={locale} />
    </article>
  );
}
