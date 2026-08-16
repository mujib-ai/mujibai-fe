'use client';

import { SupportService } from '@/shared/services/support.service';
import type {
  ApiErrorResponse,
  SupportTicketValues,
} from '@/shared/types/support';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.status === 429) {
      return 'Too many requests - please wait a moment and try again';
    }
    if (axiosError.response?.status === 422) {
      return 'Please check your input and try again';
    }
    return axiosError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};

export default function useSupportTicket() {
  const supportMutation = useMutation({
    mutationFn: SupportService.create,
  });

  const handleSubmitTicket = async (values: SupportTicketValues) => {
    try {
      const data = await supportMutation.mutateAsync(values);
      return data;
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        'Something went wrong - please try again'
      );
      toast.error(errorMessage);
      return null;
    }
  };

  return {
    handleSubmitTicket,
    isSubmittingTicket: supportMutation.isPending,
  };
}
