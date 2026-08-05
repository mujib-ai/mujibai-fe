'use client';

import type { useTranslations } from 'next-intl';

import useSupportTicket from '@/features/contactUs/hooks/useSupportTicket';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export function useContactUsForm(t: ReturnType<typeof useTranslations>) {
  const { handleSubmitTicket, isSubmittingTicket } = useSupportTicket();

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
    formState: { errors, touchedFields },
  } = form;

  const subjectLabels: Record<string, string> = {
    hi: t('radio.hi'),
    quote: t('radio.quote'),
  };

  const onSubmit = async (data: FormData) => {
    const message = `[${subjectLabels[data.subject] ?? data.subject}] ${data.message}`;

    const result = await handleSubmitTicket({
      name: data.name,
      email: data.email,
      message,
    });

    if (result) {
      toast.success(t('form.submitSuccess'));
      form.reset();
    }
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
    isSubmitting: isSubmittingTicket,
    errors,
    touchedFields,
    fieldBorderClass,
  };
}
