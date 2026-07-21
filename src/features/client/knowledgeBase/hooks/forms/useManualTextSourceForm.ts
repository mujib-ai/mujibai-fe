'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { ManualTextSourceDialogProps } from '../../interfaces';
import {
  type ManualTextSourceFormData,
  manualTextSourceSchema,
} from '../../schemas/manual-text-source.schema';

type UseManualTextSourceFormOptions = Pick<
  ManualTextSourceDialogProps,
  'open' | 'onClose' | 'onSubmit'
>;

export function useManualTextSourceForm({
  open,
  onClose,
  onSubmit,
}: UseManualTextSourceFormOptions) {
  const form = useForm<ManualTextSourceFormData>({
    resolver: zodResolver(manualTextSourceSchema),
    defaultValues: { title: '', content: '', category: '', language: '' },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  const close = () => {
    form.reset();
    onClose();
  };

  const submit = form.handleSubmit(async values => {
    await onSubmit(values);
    form.reset();
  });

  return { form, close, submit };
}
