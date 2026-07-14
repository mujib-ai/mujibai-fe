import { useTranslations } from 'next-intl';

import Logo from '@/shared/components/atoms/Logo';
import { CheckCircle } from 'lucide-react';

import { EnrollmentForm } from '../organisms';

const EMAIL_REGEX = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const PHONE_REGEX = /\+\d[\d\s]*\d/;

function linkifyContactInfo(text: string) {
  const email = text.match(EMAIL_REGEX)?.[0];
  if (email) {
    const [before, after] = text.split(email);
    return (
      <>
        {before}
        <a
          href={`mailto:${email}`}
          className="text-primary underline underline-offset-2"
        >
          {email}
        </a>
        {after}
      </>
    );
  }

  const phone = text.match(PHONE_REGEX)?.[0];
  if (phone) {
    const [before, after] = text.split(phone);
    return (
      <>
        {before}
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="text-primary underline underline-offset-2"
        >
          {phone}
        </a>
        {after}
      </>
    );
  }

  return text;
}

export default function EnrollPage() {
  const t = useTranslations('enrollPage');
  const instructions = [
    t('instructions.inst1'),
    t('instructions.inst2'),
    t('instructions.inst3'),
    t('instructions.inst4'),
    t('instructions.inst5'),
    t('instructions.inst6'),
    t('instructions.inst7'),
    t('instructions.inst8'),
    t('instructions.inst9'),
    t('instructions.inst10'),
  ];
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden py-12">
      <div className="fixed top-1/2 left-1/2 z-[-1] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>

      <div className="mb-10">
        <Logo />
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:px-10">
        <div className="max-w-xl flex-1">
          <div>
            <h2 className="text-foreground mb-3 text-2xl font-semibold">
              {t('title')}
            </h2>
            <p className="text-foreground mb-6 text-sm">{t('description')}</p>

            <ul className="space-y-3">
              {instructions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-foreground text-sm leading-relaxed">
                    {linkifyContactInfo(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex-1">
          <EnrollmentForm />
        </div>
      </div>
    </div>
  );
}
