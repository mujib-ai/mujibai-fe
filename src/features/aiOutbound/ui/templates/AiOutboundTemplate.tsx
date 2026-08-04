'use client';

import { PageLayout } from '@/shared/components/templates/PageLayout';

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
    <PageLayout title={t('title')} subtitle={t('subTitle')}>
      <ActionButtons
        addCallTaskText={t('addCallTask')}
        importCsvText={t('ImportCSV')}
      />
      <AiOutboundTable t={t} locale={locale} />
    </PageLayout>
  );
}
