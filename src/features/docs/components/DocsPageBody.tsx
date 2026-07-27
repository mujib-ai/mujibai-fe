import { getTranslations } from 'next-intl/server';

import { DocRichSectionView } from '@/features/docs/components/content/DocBlocks';
import { renderRichText } from '@/features/docs/lib/renderRichText';
import type { DocPageContent } from '@/features/docs/types';
import { Reveal } from '@/shared/components/atoms/Reveal';

export async function DocsPageBody({ pageKey }: { pageKey: string }) {
  const t = await getTranslations();
  const page = t.raw(`docs.pages.${pageKey}`) as DocPageContent;

  return (
    <div>
      <Reveal>
        <p className="text-primary mb-2 text-sm font-medium">{page.eyebrow}</p>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {page.title}
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {renderRichText(page.intro)}
        </p>
      </Reveal>

      <Reveal stagger={0.1}>
        {Object.entries(page.sections).map(([key, section]) => (
          <DocRichSectionView key={key} section={section} />
        ))}
      </Reveal>
    </div>
  );
}
