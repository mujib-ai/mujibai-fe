'use client';

import { useTranslations } from 'next-intl';

import { usePlans } from '@/features/admin/plans';
import {
  type TenantFormValues,
  tenantSchema,
  useTenant,
} from '@/features/admin/tenants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UseCreateTenantFormParams {
  onSuccess?: () => void;
}

export function useCreateTenantForm({ onSuccess }: UseCreateTenantFormParams) {
  const tActions = useTranslations('actions');
  const tDialog = useTranslations('dialogs.createClient');

  const { createTenant, isCreating: isPending } = useTenant();
  const { plans } = usePlans();

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      website: '',
      industry: '',
      planId: '',
      size: '',
      commercialRegister: '',
      taxId: '',
      description: '',
    },
  });

  const onSubmit = (values: TenantFormValues) => {
    createTenant(
      {
        ...values,
        website: values.website || '',
        description: values.description || '',
      },
      {
        onSuccess: data => {
          toast.success(
            (data as { message?: string }).message || tDialog('success')
          );
          form.reset();
          onSuccess?.();
        },
        onError: (error: unknown) => {
          let message: string | undefined;

          if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
          ) {
            const response = (
              error as { response?: { data?: { message?: string } } }
            ).response;
            message = response?.data?.message;
          }

          toast.error(message || tDialog('error'));
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    plans,
    tActions,
    isPending,
  };
}

