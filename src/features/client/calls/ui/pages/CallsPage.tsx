import { useLocale, useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

import CallsTable from '../organisms/CallsTable';
import Filtering from '../organisms/Filtering';

export default function CallsPage() {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('callsTitle')} subtitle={t('callsSubTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <section className="flex flex-col">
          <Filtering
            filterPlaceholderOne={t('filterPlaceholderOne')}
            filterPlaceholderTwo={t('filterPlaceholderTwo')}
          />
          <CallsTable t={t} locale={locale} titleKey="callsTitle" />
        </section>
      </div>
    </div>
  );
}
