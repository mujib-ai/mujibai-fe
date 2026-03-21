'use client';

import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useEnroll from './useEnroll';
import type { EnrollmentFormData } from '../validators';
import { enrollFormSchema } from '../validators';

export function useEnrollmentForm() {
  const t = useTranslations('enrollPage.enrollForm');
  const { handleEnroll, isEnrollLoading } = useEnroll();

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      address: '',
      industry: '',
      commercialRegister: '',
      taxId: '',
      message: '',
    },
  });

  const { handleSubmit, formState: { errors, touchedFields }, reset } = form;

  const onSubmit = async (data: EnrollmentFormData) => {
    const res = await handleEnroll({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      address: data.address,
      planId: (data as EnrollmentFormData & { planId?: string }).planId ?? '',
    });

    if (res) {
      toast.success('Enrollment successful');
      reset();
    }
  };

  const getFieldProps = (fieldName: keyof EnrollmentFormData) => ({
    register: form.register(fieldName),
    error: touchedFields[fieldName] ? errors[fieldName]?.message : undefined,
  });

  return {
    form,
    handleSubmit,
    onSubmit,
    isEnrollLoading,
    t,
    getFieldProps,
  };
}
