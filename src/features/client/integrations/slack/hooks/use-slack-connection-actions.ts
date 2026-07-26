'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { disconnectSlack } from '../api/disconnect-slack';
import { selectSlackChannel } from '../api/select-slack-channel';
import { startSlackOAuth } from '../api/start-slack-oauth';
import { testSlackIntegration } from '../api/test-slack-integration';
import { SLACK_CHANNELS_QUERY_KEY } from './use-slack-channels';
import { SLACK_INTEGRATION_QUERY_KEY } from './use-slack-integration';

export default function useSlackConnectionActions() {
  const queryClient = useQueryClient();

  const connectMutation = useMutation({
    mutationFn: startSlackOAuth,
    onSuccess: ({ authorizationUrl }) => {
      window.location.href = authorizationUrl;
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to start Slack connection'));
    },
  });

  const selectChannelMutation = useMutation({
    mutationFn: selectSlackChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLACK_INTEGRATION_QUERY_KEY });
      toast.success('Notification channel updated.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to select channel'));
    },
  });

  const testMutation = useMutation({
    mutationFn: testSlackIntegration,
    onSuccess: () => {
      toast.success('Test message sent to Slack.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to send test message'));
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectSlack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLACK_INTEGRATION_QUERY_KEY });
      queryClient.removeQueries({ queryKey: SLACK_CHANNELS_QUERY_KEY });
      toast.success('Slack disconnected.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to disconnect Slack'));
    },
  });

  return {
    connect: connectMutation.mutate,
    isConnecting: connectMutation.isPending,

    selectChannel: selectChannelMutation.mutate,
    isSelectingChannel: selectChannelMutation.isPending,

    sendTestMessage: testMutation.mutate,
    isSendingTestMessage: testMutation.isPending,

    disconnect: disconnectMutation.mutate,
    isDisconnecting: disconnectMutation.isPending,
  };
}
