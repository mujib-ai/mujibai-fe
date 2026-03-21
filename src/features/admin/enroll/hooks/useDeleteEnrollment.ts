'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EnrollService } from '../services/enroll.service';
import { enrollmentsKeys } from './useEnrollments';

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => EnrollService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentsKeys.all });
    },
  });
}
