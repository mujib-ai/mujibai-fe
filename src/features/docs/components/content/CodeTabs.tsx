'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/atoms/ui/tabs';

import { CodeBlock } from './CodeBlock';

type CodeTabsProps = {
  tabs: {
    label: string;
    code: string;
    language?: string;
  }[];
};

export function CodeTabs({ tabs }: CodeTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.label} className="my-4">
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.label} value={tab.label}>
          <CodeBlock code={tab.code} language={tab.language} className="my-0" />
        </TabsContent>
      ))}
    </Tabs>
  );
}
