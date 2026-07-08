import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import { FieldLabel } from '../atoms/FieldLabel';
import { CONTACT_REASONS, type ContactReason } from '../constants';

type ContactReasonFieldProps = {
  value: ContactReason;
  onChange: (value: ContactReason) => void;
};

export function ContactReasonField({
  value,
  onChange,
}: ContactReasonFieldProps) {
  const t = useTranslations('contact.form');

  return (
    <div>
      <FieldLabel htmlFor="contact-reason">{t('reasonLabel')}</FieldLabel>
      <Select
        value={value}
        onValueChange={(next: string) => onChange(next as ContactReason)}
      >
        <SelectTrigger id="contact-reason" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CONTACT_REASONS.map(reason => (
            <SelectItem key={reason} value={reason}>
              {t(`reasons.${reason}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
