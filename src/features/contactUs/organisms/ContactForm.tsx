'use client';

import type { ChangeEvent, FormEvent } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Textarea } from '@/shared/components/atoms/ui/textarea';

import { FieldLabel } from '../atoms/FieldLabel';
import { useContactForm } from '../hooks/useContactForm';
import { ContactReasonField } from '../molecules/ContactReasonField';
import { ContactSuccess } from '../molecules/ContactSuccess';

const MESSAGE_MAX = 600;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const form = useContactForm();
  return (
    <div className="w-full rounded-2xl bg-[#FFFFFFCC] p-8 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 dark:bg-[#06B6D40F]">
      {form.ticket ? (
        <ContactSuccess
          name={form.name}
          email={form.email}
          ticket={form.ticket}
          onReset={form.reset}
        />
      ) : (
        <form
          className="flex flex-col gap-3.5"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            form.submit();
          }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
              {t('title')}
            </span>
          </div>

          <ContactReasonField value={form.reason} onChange={form.setReason} />

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-name" required>
                {t('name')}
              </FieldLabel>
              <Input
                id="contact-name"
                placeholder={t('namePlaceholder')}
                value={form.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  form.setName(event.target.value)
                }
              />
            </div>
            <div>
              <FieldLabel htmlFor="contact-email" required>
                {t('email')}
              </FieldLabel>
              <Input
                id="contact-email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={form.email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  form.setEmail(event.target.value)
                }
              />
            </div>
          </div>

          <div>
            <FieldLabel
              htmlFor="contact-company"
              optional={t('companyOptional')}
            >
              {t('company')}
            </FieldLabel>
            <Input
              id="contact-company"
              placeholder={t('companyPlaceholder')}
              value={form.company}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                form.setCompany(event.target.value)
              }
            />
          </div>

          <div>
            <FieldLabel
              htmlFor="contact-message"
              required
              rightSlot={
                <span className="font- text-[10px] text-(--ink-3)">
                  {form.message.length}/{MESSAGE_MAX}
                </span>
              }
            >
              {t('message')}
            </FieldLabel>
            <Textarea
              id="contact-message"
              maxLength={MESSAGE_MAX}
              placeholder={t('messagePlaceholder')}
              value={form.message}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                form.setMessage(event.target.value)
              }
              className="min-h-28 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={!form.isValid}
            className="mt-1 w-full rounded-full py-5"
          >
            {t('submit')}
            <span className="inline-grid size-4 place-items-center" aria-hidden>
              <ThemedIcon name="arrow-left" size={20} className="size-5" />
            </span>
          </Button>

          <p className="mt-1 text-center text-[11px] leading-relaxed text-(--ink-3)">
            {t.rich('consent', {
              link: chunks => (
                <Link
                  href="/privacy-policy"
                  className="text-(--ink-2) underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </form>
      )}
    </div>
  );
}
