'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Skeleton } from '@heroui/react';

import {
  useGoogleCalendarCalendars,
  useGoogleCalendarConnectionActions,
  useGoogleCalendarIntegration,
  useGoogleCalendarOAuthCallback,
} from '../../hooks';
import {
  GoogleCalendarConfiguration,
  GoogleCalendarConnectCard,
  GoogleCalendarIntegrationActiveState,
  GoogleCalendarIntegrationErrorState,
} from '../organisms';

export default function GoogleCalendarIntegrationPage() {
  const t = useTranslations(
    'settings.integrationSettings.googleCalendarIntegration'
  );
  const [isChangingCalendar, setIsChangingCalendar] = useState(false);

  useGoogleCalendarOAuthCallback();

  const { integration, isLoading, isError } = useGoogleCalendarIntegration();
  const {
    connect,
    isConnecting,
    selectCalendar,
    isSelectingCalendar,
    sendTestEvent,
    isSendingTestEvent,
    disconnect,
    isDisconnecting,
  } = useGoogleCalendarConnectionActions();

  const needsCalendarSelection =
    integration?.status === 'connected' || isChangingCalendar;
  const {
    calendars,
    isLoading: isLoadingCalendars,
    isFetchingNextPage: isLoadingMoreCalendars,
    hasMore: hasMoreCalendars,
    loadMore: loadMoreCalendars,
    refetch: refetchCalendars,
  } = useGoogleCalendarCalendars(needsCalendarSelection);

  const handleSelectCalendar = (calendarId: string) => {
    selectCalendar(calendarId, {
      onSuccess: () => setIsChangingCalendar(false),
    });
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
      <GoogleCalendarConnectCard
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
      <GoogleCalendarIntegrationErrorState
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
      <GoogleCalendarConnectCard
        title={t('title')}
        description={t('description')}
        connectLabel={t('connect')}
        onConnect={connect}
        isConnecting={isConnecting}
      />
    );
  }

  if (integration.status === 'active' && !isChangingCalendar) {
    return (
      <GoogleCalendarIntegrationActiveState
        integration={integration}
        onTestEvent={sendTestEvent}
        isSendingTestEvent={isSendingTestEvent}
        onChangeCalendar={() => setIsChangingCalendar(true)}
        onDisconnect={disconnect}
        isDisconnecting={isDisconnecting}
        t={t}
      />
    );
  }

  return (
    <GoogleCalendarConfiguration
      integration={integration}
      calendars={calendars}
      isLoadingCalendars={isLoadingCalendars}
      onSelectCalendar={handleSelectCalendar}
      isSelectingCalendar={isSelectingCalendar}
      onRefreshCalendars={refetchCalendars}
      hasMoreCalendars={hasMoreCalendars}
      onLoadMoreCalendars={loadMoreCalendars}
      isLoadingMoreCalendars={isLoadingMoreCalendars}
      onDisconnect={disconnect}
      isDisconnecting={isDisconnecting}
      t={t}
    />
  );
}
