'use client';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import ActionButtons from '../molecules/ActionButtons';
import AiOutboundTable from '../organisms/AiOutboundTable';

export default function AiOutboundTemplate({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <ActionButtons
          addCallTaskText={t('addCallTask')}
          importCsvText={t('ImportCSV')}
        />
        <AiOutboundTable t={t} locale={locale} />
      </div>
    </div>
  );
}
