'use client';

import { useQuery } from '@tanstack/react-query';

import { EnrollService } from '../services/enroll.service';
import { enrollmentsKeys } from './useEnrollments';

export function useEnrollment(id: string | number | null) {
  const query = useQuery({
    queryKey: [...enrollmentsKeys.all, 'detail', id],
    queryFn: () => EnrollService.getById(id as string | number),
    enabled: !!id,
  });

  return {
    enrollment: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
