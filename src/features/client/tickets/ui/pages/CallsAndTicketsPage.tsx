import { useLocale, useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import Filtering from '../organisms/Filtering';
import Table from '../organisms/Table';

type CallsAndTicketsMode = 'calls' | 'tickets';

export default function CallsAndTicketsPage({ mode }: { mode: CallsAndTicketsMode }) {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();
  const titleKey = mode === 'calls' ? 'callsTitle' : 'ticketsTitle';
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t(titleKey)} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <section className="flex flex-col">
          <Filtering
            filterPlaceholderOne={t('filterPlaceholderOne')}
            filterPlaceholderTwo={t('filterPlaceholderTwo')}
          />
          <Table t={t} locale={locale} titleKey={titleKey} />
        </section>
      </div>
    </div>
  );
}
