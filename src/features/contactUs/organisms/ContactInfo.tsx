import { useTranslations } from 'next-intl';

import { CONTACT_CHANNELS } from '../constants';
import { ContactChannelCard } from '../molecules/ContactChannelCard';

export function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <div className="max-w-115 pt-2">
      <div className="eyebrow">{t('eyebrow')}</div>
      <h1 className="text-[clamp(40px,4.5vw,56px)] font-semibold">
        {t('titleLead')}
        <br />
        {t('titleRest')} <span className="italic">{t('titleAccent')}</span>
      </h1>
      <p className="section-sub mt-4 mb-9">{t('subtitle')}</p>

      <div className="flex flex-col gap-2.5">
        {CONTACT_CHANNELS.map(channel => (
          <ContactChannelCard key={channel.key} channel={channel} />
        ))}
      </div>
    </div>
  );
}
