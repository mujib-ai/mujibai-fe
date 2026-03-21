'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { usePlans } from '@/features/admin/plans';
import {
  type TenantFormValues,
  tenantSchema,
  useTenant,
} from '@/features/admin/tenants';
import type { Client } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UseUpdateTenantFormParams {
  tenant: Client | null;
  onSuccess?: () => void;
}

export function useUpdateTenantForm({
  tenant,
  onSuccess,
}: UseUpdateTenantFormParams) {
  const tActions = useTranslations('actions');
  const tDialog = useTranslations('dialogs.createClient');

  const { updateTenant, isUpdating: isPending } = useTenant();
  const { plans } = usePlans();

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: tenant?.name ?? '',
      email: tenant?.email ?? '',
      password: '',
      phone: tenant?.phone ?? '',
      address: tenant?.address ?? '',
      website: tenant?.website ?? '',
      industry: tenant?.industry ?? '',
      planId: tenant?.planId ?? '',
      size: tenant?.size ?? '',
      commercialRegister: tenant?.commercialRegister ?? '',
      taxId: tenant?.taxId ?? '',
      description: tenant?.description ?? '',
    },
  });

  useEffect(() => {
    if (!tenant) return;

    form.reset({
      name: tenant.name ?? '',
      email: tenant.email ?? '',
      password: '',
      phone: tenant.phone ?? '',
      address: tenant.address ?? '',
      website: tenant.website ?? '',
      industry: tenant.industry ?? '',
      planId: tenant.planId ?? '',
      size: tenant.size ?? '',
      commercialRegister: tenant.commercialRegister ?? '',
      taxId: tenant.taxId ?? '',
      description: tenant.description ?? '',
    });
  }, [tenant, form]);

  const onSubmit = (values: TenantFormValues) => {
    if (!tenant) return;

    updateTenant(
      {
        id: tenant.id,
        payload: {
          ...values,
          website: values.website || '',
          description: values.description || '',
        },
      },
      {
        onSuccess: data => {
          toast.success(
            (data as { message?: string }).message || tDialog('success')
          );
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

