'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Skeleton } from '@heroui/react';

import {
  useSlackChannels,
  useSlackConnectionActions,
  useSlackIntegration,
  useSlackOAuthCallback,
} from '../../hooks';
import {
  SlackChannelConfiguration,
  SlackConnectCard,
  SlackIntegrationActiveState,
  SlackIntegrationErrorState,
} from '../organisms';

export default function SlackIntegrationPage() {
  const t = useTranslations('settings.integrationSettings.slackIntegration');
  const [isChangingChannel, setIsChangingChannel] = useState(false);

  useSlackOAuthCallback();

  const { integration, isLoading, isError } = useSlackIntegration();
  const {
    connect,
    isConnecting,
    selectChannel,
    isSelectingChannel,
    sendTestMessage,
    isSendingTestMessage,
    disconnect,
    isDisconnecting,
  } = useSlackConnectionActions();

  const needsChannelSelection =
    integration?.status === 'connected' || isChangingChannel;
  const {
    channels,
    isLoading: isLoadingChannels,
    isFetchingNextPage: isLoadingMoreChannels,
    hasMore: hasMoreChannels,
    loadMore: loadMoreChannels,
    refetch: refetchChannels,
  } = useSlackChannels(needsChannelSelection);

  const handleSelectChannel = (channelId: string) => {
    selectChannel(channelId, { onSuccess: () => setIsChangingChannel(false) });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4 dark:bg-[#FFFFFF0F]">
        <Skeleton
          animationType="none"
          className="h-10 w-10 rounded-full bg-black/10 dark:bg-white/10"
        />
        <Skeleton
          animationType="none"
          className="h-4 w-24 rounded-md bg-black/10 dark:bg-white/10"
        />
        <Skeleton
          animationType="none"
          className="h-9 w-full rounded-full bg-black/10 dark:bg-white/10"
        />
      </div>
    );
  }

  if (isError || !integration) {
    return (
      <SlackConnectCard
        title={t('title')}
        description={t('description')}
        connectLabel={t('connect')}
        onConnect={connect}
        isConnecting={isConnecting}
      />
    );
  }

  if (integration.status === 'error') {
    return (
      <SlackIntegrationErrorState
        title={t('title')}
        message={integration.errorMessage ?? t('genericError')}
        onRetry={connect}
        isRetrying={isConnecting}
        retryLabel={t('retryConnection')}
      />
    );
  }

  if (integration.status === 'disconnected') {
    return (
      <SlackConnectCard
        title={t('title')}
        description={t('description')}
        connectLabel={t('connect')}
        onConnect={connect}
        isConnecting={isConnecting}
      />
    );
  }

  if (integration.status === 'active' && !isChangingChannel) {
    return (
      <SlackIntegrationActiveState
        integration={integration}
        onTestMessage={sendTestMessage}
        isSendingTestMessage={isSendingTestMessage}
        onChangeChannel={() => setIsChangingChannel(true)}
        onDisconnect={disconnect}
        isDisconnecting={isDisconnecting}
        t={t}
      />
    );
  }

  return (
    <SlackChannelConfiguration
      integration={integration}
      channels={channels}
      isLoadingChannels={isLoadingChannels}
      onSelectChannel={handleSelectChannel}
      isSelectingChannel={isSelectingChannel}
      onRefreshChannels={refetchChannels}
      hasMoreChannels={hasMoreChannels}
      onLoadMoreChannels={loadMoreChannels}
      isLoadingMoreChannels={isLoadingMoreChannels}
      onDisconnect={disconnect}
      isDisconnecting={isDisconnecting}
      t={t}
    />
  );
}
