'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/shared/lib/utils';

export function useContactUsForm(t: ReturnType<typeof useTranslations>) {
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

  return {
    form,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    touchedFields,
    fieldBorderClass,
  };
}
