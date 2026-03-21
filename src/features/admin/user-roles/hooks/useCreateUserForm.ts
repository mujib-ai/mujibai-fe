'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UserRolesService } from '../services/user-roles.service';
import { createUserFormSchema } from '../validators';
import { userRolesKeys } from './useUserRoles';

export type CreateUserFormValues = import('../validators').CreateUserFormValues;

export function useCreateUserForm(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { handleSubmit, formState: { errors }, reset } = form;

  const createMutation = useMutation({
    mutationFn: (payload: CreateUserFormValues) =>
      UserRolesService.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRolesKeys.all });
      reset();
      toast.success('User created successfully');
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? 'Failed to create user');
    },
  });

  const onSubmit = (data: CreateUserFormValues) => {
    createMutation.mutate(data);
  };

  return {
    form,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: createMutation.isPending,
  };
}
