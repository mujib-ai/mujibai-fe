'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EnrollService } from '../services/enroll.service';
import { enrollmentsKeys } from './useEnrollments';

export function useUpdateEnrollmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string | number;
      action: 'approve' | 'reject';
    }) =>
      action === 'approve'
        ? EnrollService.approve(id)
        : EnrollService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentsKeys.all });
    },
  });
}
