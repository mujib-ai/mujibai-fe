'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { EnrollService } from '../services/enroll.service';
import type { ApiErrorResponse, EnrollmentFormValues } from '../types';

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};

export default function useEnroll() {
  const enrollMutation = useMutation({
    mutationFn: EnrollService.create,
    onSuccess: () => {
      toast.success('Enrollment successful');
    },
    onError: error => {
      const errorMessage = getErrorMessage(
        error,
        'Enrollment failed - please try again'
      );
      toast.error(errorMessage);
    },
  });

  const handleEnroll = async (values: EnrollmentFormValues) => {
    try {
      const data = await enrollMutation.mutateAsync(values);
      return data;
    } catch (error) {
      console.error('Enrollment failed:', error);
      return null;
    }
  };


  function formatDate(dateStr?: string) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

  return {
    handleEnroll,
    isEnrollLoading: enrollMutation.isPending,
    formatDate
  };
}
