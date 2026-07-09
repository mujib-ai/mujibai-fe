'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function ContactUsSection() {
  const t = useTranslations('landingPage.contactUs');

  const formSchema = z.object({
    name: z.string().trim().min(1, t('form.nameRequired')),
    email: z
      .string()
      .email(t('form.emailInvalid'))
      .min(1, t('form.emailRequired')),
    message: z.string().trim().min(1, t('form.messageRequired')),
    subject: z.string().min(1, t('form.subjectRequired')),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subject: 'hi',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
  } = form;

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    form.reset();
  };

  const fieldBorderClass = (hasError?: boolean) =>
    cn(
      'border-foreground/20 focus-visible:border-primary',
      hasError && 'border-red-400'
    );

  return (
    <section
      id="contact"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10"
    >
      <div className="absolute inset-0 bg-[#6EEAFF]/60 dark:bg-[#001434]/50" />

      <Container className="relative z-10 flex flex-col items-center gap-6 rounded-2xl bg-[#ffffff19] py-10 shadow-md backdrop-blur-sm md:px-10">
        <div className="mb-4 text-center">
          <h2 className="text-foreground text-2xl font-bold md:text-[44px]">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t('description')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <label className="text-foreground flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="hi"
                {...form.register('subject')}
                className="accent-primary h-4 w-4 cursor-pointer"
              />
              <span className="text-sm md:text-lg">{t('radio.hi')}</span>
            </label>

            <label className="text-foreground flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="quote"
                {...form.register('subject')}
                className="accent-primary h-4 w-4 cursor-pointer"
              />
              <span className="text-sm md:text-lg">{t('radio.quote')}</span>
            </label>
          </div>

          {touchedFields.subject && errors.subject && (
            <span className="text-xs text-red-400">
              {errors.subject.message}
            </span>
          )}

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="name"
              className="text-foreground text-sm font-medium md:text-lg"
            >
              {t('form.name')}
            </label>
            <Input
              id="name"
              placeholder={t('form.name')}
              {...form.register('name')}
              className={fieldBorderClass(touchedFields.name && !!errors.name)}
            />
            {touchedFields.name && errors.name && (
              <span className="text-xs text-red-400">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="email"
              className="text-foreground text-sm font-medium md:text-lg"
            >
              {t('form.email')}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t('form.email')}
              {...form.register('email')}
              className={fieldBorderClass(
                touchedFields.email && !!errors.email
              )}
            />
            {touchedFields.email && errors.email && (
              <span className="text-xs text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="message"
              className="text-foreground text-sm font-medium md:text-lg"
            >
              {t('form.message')}
            </label>
            <Textarea
              id="message"
              placeholder={t('form.message')}
              rows={5}
              {...form.register('message')}
              className={fieldBorderClass(
                touchedFields.message && !!errors.message
              )}
            />
            {touchedFields.message && errors.message && (
              <span className="text-xs text-red-400">
                {errors.message.message}
              </span>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded-full px-8 py-3 text-base font-medium text-white shadow-md transition md:text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : t('form.submit')}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
