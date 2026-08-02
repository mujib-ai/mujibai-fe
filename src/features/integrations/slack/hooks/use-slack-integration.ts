'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { getSlackIntegration } from '../api/get-slack-integration';

export const SLACK_INTEGRATION_QUERY_KEY = [
  QUERY_CONSTANTS.KEYS.SLACK_INTEGRATION,
];

export default function useSlackIntegration() {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: SLACK_INTEGRATION_QUERY_KEY,
    queryFn: getSlackIntegration,
  });

  return {
    integration: data ?? null,
    isLoading,
    isFetching,
    isError,
    error: isError
      ? getErrorMessage(error, 'Failed to load Slack connection status')
      : null,
    refetch,
  };
}
