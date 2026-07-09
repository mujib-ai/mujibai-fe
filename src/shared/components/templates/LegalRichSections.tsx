'use client';

import { useTranslations } from 'next-intl';

type LegalListItem = {
  term: string;
  desc: string;
};

type LegalRichSection = {
  title: string;
  body?: string;
  lead?: string;
  items?: LegalListItem[];
  note?: string;
};

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
        </section>
      ))}
    </div>
  );
}
