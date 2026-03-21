'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/atoms/ui/tabs';

import ConversationScriptDescriptionTab from './ConversationScriptDescriptionTab';
import MainConversationScriptTab from './MainConversationScriptTab';

export default function MainConversationScript({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <Tabs defaultValue="conversation" className="w-full">
        <TabsList className="mx-auto w-[30%] rounded-full bg-[#06B6D44D] dark:bg-[#3B82F614]">
          <TabsTrigger
            value="conversation"
            className="w-full rounded-full font-normal data-[state=active]:bg-[#06B6D4] dark:data-[state=active]:bg-[#06B6D440]"
          >
            {t('conversation')}
          </TabsTrigger>
          <TabsTrigger
            value="descriptions"
            className="w-full rounded-full font-normal data-[state=active]:bg-[#06B6D4] dark:data-[state=active]:bg-[#06B6D440]"
          >
            {t('descriptions')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="conversation">
          <MainConversationScriptTab t={t} locale={locale} />
        </TabsContent>
        <TabsContent value="descriptions">
          <ConversationScriptDescriptionTab t={t} locale={locale} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
