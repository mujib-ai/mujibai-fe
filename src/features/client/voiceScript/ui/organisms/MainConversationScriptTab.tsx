'use client';

import EmptyScriptCard from '../molecules/EmptyScriptCard';
import ScriptActionButtons from '../molecules/ScriptActionButtons';

export default function MainConversationScriptTab({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div>
      <EmptyScriptCard
        title={t('conversationScript')}
        heading={t('noConversationScriptAvailable')}
        description={t('startByAddingYourFirstConversationScript')}
        locale={locale}
      />
      <ScriptActionButtons
        addNewLineText={t('addNewLine')}
        createScriptText={t('createScript')}
      />
    </div>
  );
}
