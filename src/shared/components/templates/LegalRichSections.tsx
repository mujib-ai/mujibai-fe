'use client';

import { useTranslations } from 'next-intl';

import { Reveal } from '@/shared/components/atoms/Reveal';
import { CheckCircle2 } from 'lucide-react';

type LegalListItem = {
  term: string;
  desc: string;
};

type LegalBlock =
  | { type: 'p' | 'h3'; text: string }
  | ({ type: 'item' } & LegalListItem);

type LegalRichSection = {
  title: string;
  body?: string;
  lead?: string;
  items?: LegalListItem[];
  note?: string;
  blocks?: LegalBlock[];
};

type BlockGroup =
  | { type: 'item-group'; items: LegalListItem[] }
  | Exclude<LegalBlock, { type: 'item' }>;

function groupBlocks(blocks: LegalBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = [];
  for (const block of blocks) {
    if (block.type === 'item') {
      const last = groups[groups.length - 1];
      if (last && last.type === 'item-group') {
        last.items.push(block);
      } else {
        groups.push({ type: 'item-group', items: [block] });
      }
    } else {
      groups.push(block);
    }
  }
  return groups;
}

export function LegalRichSections({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as Record<string, LegalRichSection>;

  return (
    <Reveal
      stagger={0.08}
      className="divide-border/70 flex flex-col gap-8 divide-y"
    >
      {Object.entries(sections).map(([key, section]) => (
        <section key={key} className="pt-8 first:pt-0">
          <h2 className="text-xl font-semibold md:text-2xl">{section.title}</h2>

          {section.body && (
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {t.rich(`sections.${key}.body`, {
                b: chunks => <strong>{chunks}</strong>,
                email: chunks => (
                  <a
                    href={`mailto:${chunks}`}
                    className="text-primary underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          )}

          {section.lead && (
            <p className="mt-4 flex items-start gap-2 leading-relaxed font-semibold">
              <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
              <span>{section.lead}</span>
            </p>
          )}

          {section.items && (
            <ul className="ms-7 mt-3 flex list-disc flex-col gap-3 ps-1">
              {section.items.map(item => (
                <li key={item.term}>
                  <span className="font-semibold">{item.term}: </span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </li>
              ))}
            </ul>
          )}

          {section.note && (
            <p className="text-muted-foreground mt-3 flex items-start gap-2 text-sm italic">
              <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{section.note}</span>
            </p>
          )}

          {section.blocks &&
            groupBlocks(section.blocks).map((group, i) => {
              if (group.type === 'item-group') {
                return (
                  <ul
                    key={i}
                    className="ms-7 mt-3 flex list-disc flex-col gap-3 ps-1"
                  >
                    {group.items.map(item => (
                      <li key={item.term}>
                        <span className="font-semibold">{item.term}: </span>
                        <span className="text-muted-foreground">
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (group.type === 'h3') {
                return (
                  <h3
                    key={i}
                    className="mt-5 flex items-center gap-2 text-lg font-semibold"
                  >
                    <CheckCircle2 className="text-primary size-5 shrink-0" />
                    {group.text}
                  </h3>
                );
              }
              return (
                <p
                  key={i}
                  className="text-muted-foreground mt-3 leading-relaxed"
                >
                  {group.text}
                </p>
              );
            })}
        </section>
      ))}
    </Reveal>
  );
}
