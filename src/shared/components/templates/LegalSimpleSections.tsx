import { Reveal } from '@/shared/components/atoms/Reveal';
import { CheckCircle2 } from 'lucide-react';

type LegalSimpleSection = {
  title: string;
  content: string;
};

export function LegalSimpleSections({
  sections,
}: {
  sections: Record<string, LegalSimpleSection>;
}) {
  return (
    <Reveal
      stagger={0.08}
      className="divide-border/70 flex flex-col gap-6 divide-y"
    >
      {Object.entries(sections).map(([key, section]) => (
        <section key={key} className="pt-6 first:pt-0">
          <h2 className="flex items-start gap-2 text-lg font-semibold md:text-xl">
            <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
            <span>{section.title}</span>
          </h2>
          <p className="text-muted-foreground ms-7 mt-2 leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}
    </Reveal>
  );
}
