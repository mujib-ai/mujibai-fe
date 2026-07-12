import { getTranslations } from 'next-intl/server';

import { DocRichSectionView } from '@/features/docs/components/content/DocBlocks';
import { renderRichText } from '@/features/docs/lib/renderRichText';
import type { DocPageContent } from '@/features/docs/types';

export async function DocsPageBody({ pageKey }: { pageKey: string }) {
  const t = await getTranslations();
  const page = t.raw(`docs.pages.${pageKey}`) as DocPageContent;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary">{page.eyebrow}</p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {page.title}
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {renderRichText(page.intro)}
      </p>

      {Object.entries(page.sections).map(([key, section]) => (
        <DocRichSectionView key={key} section={section} />
      ))}
    </div>
  );
}
