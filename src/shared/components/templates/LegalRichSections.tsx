'use client';

import { useTranslations } from 'next-intl';

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
    <div className="mt-10 flex flex-col gap-8">
      {Object.entries(sections).map(([key, section]) => (
        <section key={key}>
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
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {section.lead}
            </p>
          )}

          {section.items && (
            <ul className="mt-4 flex flex-col gap-3">
              {section.items.map(item => (
                <li key={item.term}>
                  <span className="font-semibold">{item.term}: </span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </li>
              ))}
            </ul>
          )}

          {section.note && (
            <p className="text-muted-foreground mt-3 text-sm italic">
              {section.note}
            </p>
          )}

          {section.blocks &&
            groupBlocks(section.blocks).map((group, i) => {
              if (group.type === 'item-group') {
                return (
                  <ul key={i} className="mt-4 flex flex-col gap-3">
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
                  <h3 key={i} className="mt-5 text-lg font-semibold">
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
    </div>
  );
}
