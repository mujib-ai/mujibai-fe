'use client';

import type { useTranslations } from 'next-intl';

import useSupportTicket from '@/shared/hooks/useSupportTicket';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export function useContactUsForm(t: ReturnType<typeof useTranslations>) {
  const { handleSubmitTicket, isSubmittingTicket } = useSupportTicket();

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, t('form.nameMinLength'))
      .max(255, t('form.nameMaxLength')),
    email: z
      .string()
      .trim()
      .min(1, t('form.emailRequired'))
      .email(t('form.emailInvalid')),
    message: z
      .string()
      .trim()
      .min(2, t('form.messageMinLength'))
      .max(5000, t('form.messageMaxLength')),
  });
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, touchedFields },
  } = form;

  const onSubmit = async (data: FormData) => {
    const result = await handleSubmitTicket({
      name: data.name,
      email: data.email,
      message: data.message,
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
