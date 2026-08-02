'use client';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { EnrollmentFormData } from '../validators';
import { enrollFormSchema } from '../validators';
import useEnroll from './useEnroll';

export function useEnrollmentForm() {
  const t = useTranslations('enrollPage.enrollForm');
  const { handleEnroll, isEnrollLoading } = useEnroll();

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      companyWebsite: '',
      address: '',
      businessField: '',
      commercialRegister: '',
      taxNumber: '',
      message: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = form;

  const onSubmit = async (data: EnrollmentFormData) => {
    const res = await handleEnroll({
      ...data,
      companyWebsite: `https://${data.companyWebsite}`,
      commercialRegister: data.commercialRegister || undefined,
      taxNumber: data.taxNumber || undefined,
      message: data.message || undefined,
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
