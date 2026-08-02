'use client';

import { useEffect, useState } from 'react';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { TicketService } from '../services';
import type { TicketStatus } from '../types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function useTickets() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [status, setStatus] = useState<TicketStatus | undefined>(undefined);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_CONSTANTS.KEYS.TICKETS, page, limit, status],
    queryFn: () => TicketService.getAllTickets({ page, limit, status }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (data && data.page !== page) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(data.page);
    }
  }, [data, page]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(clamped);
  };

  const changeLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(DEFAULT_PAGE);
  };

  const changeStatus = (nextStatus: TicketStatus | undefined) => {
    setStatus(nextStatus);
    setPage(DEFAULT_PAGE);
  };

  return {
    tickets: data?.items ?? [],
    total: data?.total ?? 0,
    page,
    limit,
    totalPages,
    status,
    isLoading,
    error: isError ? getErrorMessage(error, 'Failed to load tickets') : null,
    goToPage,
    changeLimit,
    changeStatus,
  };
}
