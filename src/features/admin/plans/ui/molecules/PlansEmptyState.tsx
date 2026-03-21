'use client';

import { useTranslations } from 'next-intl';

import { FileQuestion } from 'lucide-react';

export function PlansEmptyState() {
  const tStates = useTranslations('states.empty');

  return (
    <div className="mt-10 flex min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#FFFFFFBF] p-8 text-center sm:p-12 dark:bg-[#001434A6]">
      <div className="bg-primary/10 rounded-full p-4">
        <FileQuestion className="text-primary h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight">{tStates('noResults')}</h3>
        <p className="text-muted-foreground max-w-xs text-sm">
          {tStates('noPlans')}
        </p>
      </div>
    </div>
  );
}
