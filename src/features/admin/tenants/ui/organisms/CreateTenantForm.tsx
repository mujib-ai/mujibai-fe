'use client';

import { Button } from '@/shared/components/atoms/ui/button';

import { useCreateTenantForm } from '../../hooks/useCreateTenantForm';
import { CreateTenantFormFields } from '../molecules/CreateTenantFormFields';

interface CreateTenantFormProps {
  onSuccess?: () => void;
}

export function CreateTenantForm({ onSuccess }: CreateTenantFormProps) {
  const { form, onSubmit, plans, tActions, isPending } = useCreateTenantForm({
    onSuccess,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
      <CreateTenantFormFields form={form} plans={plans} />
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : tActions('createClient')}
        </Button>
      </div>
    </form>
  );
}
