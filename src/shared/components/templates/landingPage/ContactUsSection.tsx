'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Container } from '@/shared/components/atoms/Container';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { useContactUsForm } from '@/shared/hooks/useContactUsForm';

export default function ContactUsSection() {
  const t = useTranslations('landingPage.contactUs');
  const {
    form,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    touchedFields,
    fieldBorderClass,
  } = useContactUsForm(t);

  return (
    <section
      id="contact"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10"
    >
      <div>
        <Image
          src={'/landingPage/contact-bg-image.svg'}
          alt="contact us background image"
          width={500}
          height={500}
          className="absolute top-0 left-0 h-full w-screen object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#6EEAFF99] dark:bg-[#001434]/50" />

      <Container className="relative z-10 flex flex-col items-center gap-6 rounded-2xl bg-[#FFFFFFCC] py-10 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 md:px-10 dark:bg-[#06B6D40F]">
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
