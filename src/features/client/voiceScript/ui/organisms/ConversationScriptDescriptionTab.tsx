'use client';

import EmptyScriptCard from '../molecules/EmptyScriptCard';
import EditDescriptionButton from '../molecules/EditDescriptionButton';

export default function ConversationScriptDescriptionTab({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div>
      <EmptyScriptCard
        title={t('descriptionScript')}
        heading={t('noDescriptionAvailable')}
        description={t('startByAddingYourFirstDescription')}
        locale={locale}
      />
      <EditDescriptionButton text={t('editDescription')} />
    </div>
  );
}
