import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import { Check, Ticket } from 'lucide-react';

type ContactSuccessProps = {
  name: string;
  email: string;
  ticket: string;
  onReset: () => void;
};

export function ContactSuccess({
  name,
  email,
  ticket,
  onReset,
}: ContactSuccessProps) {
  const t = useTranslations('contact.success');

  return (
    <div className="px-1 py-3 text-center">
      <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-(--green)/15 text-(--green)">
        <Check className="size-6" />
      </div>
      <h2 className="mb-2.5 text-2xl font-semibold tracking-[-0.03em] text-(--ink)">
        {t('title')}
      </h2>
      <p className="mb-5 text-sm leading-relaxed text-(--ink-2)">
        {t.rich('body', {
          name: name,
          email,
          strong: chunks => (
            <strong className="font-semibold text-(--ink)">{chunks}</strong>
          ),
        })}
      </p>

      <div className="mb-5 flex items-center gap-3 rounded-xl bg-(--bg) p-4 text-start">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-(--brand-soft) text-(--brand)">
          <Ticket className="size-4.5" />
        </span>
        <span>
          <span className="font- block text-[13px] font-medium text-(--ink)">
            {ticket}
          </span>
          <span className="mt-0.5 block text-[11px] text-(--ink-3)">
            {t('reference')}
          </span>
        </span>
      </div>

      <Button variant="outline" className="w-full" onClick={onReset}>
        {t('again')}
      </Button>
    </div>
  );
}
