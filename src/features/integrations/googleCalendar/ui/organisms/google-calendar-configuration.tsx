'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Spinner } from '@/shared/components/atoms/ui/spinner';
import { RefreshCw } from 'lucide-react';

import type {
  GoogleCalendarCalendar,
  GoogleCalendarIntegration,
} from '../../types';
import {
  GoogleCalendarConnectionInfo,
  GoogleCalendarSelector,
} from '../molecules';

export default function GoogleCalendarConfiguration({
  integration,
  calendars,
  isLoadingCalendars,
  onSelectCalendar,
  isSelectingCalendar,
  onRefreshCalendars,
  hasMoreCalendars,
  onLoadMoreCalendars,
  isLoadingMoreCalendars,
  onDisconnect,
  isDisconnecting,
  t,
}: {
  integration: GoogleCalendarIntegration;
  calendars: GoogleCalendarCalendar[];
  isLoadingCalendars: boolean;
  onSelectCalendar: (calendarId: string) => void;
  isSelectingCalendar: boolean;
  onRefreshCalendars: () => void;
  hasMoreCalendars: boolean;
  onLoadMoreCalendars: () => void;
  isLoadingMoreCalendars: boolean;
  onDisconnect: () => void;
  isDisconnecting: boolean;
  t: (key: string) => string;
}) {
  return (
    <Card className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <GoogleCalendarConnectionInfo
          connectedAt={integration.connectedAt}
          connectedOnLabel={t('connectedOn')}
          status={integration.status}
          statusLabel={t('statusConnected')}
        />
        <p className="text-muted-foreground text-sm">
          {t('selectCalendarPrompt')}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <GoogleCalendarSelector
            calendars={calendars}
            value={integration.calendarId}
            onChange={onSelectCalendar}
            placeholder={t('calendarPlaceholder')}
            disabled={isSelectingCalendar || isLoadingCalendars}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRefreshCalendars}
            disabled={isLoadingCalendars}
          >
            {isLoadingCalendars ? (
              <Spinner />
            ) : (
              <RefreshCw className="size-4" />
            )}
            {t('refreshCalendars')}
          </Button>
          {hasMoreCalendars && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onLoadMoreCalendars}
              disabled={isLoadingMoreCalendars}
            >
              {isLoadingMoreCalendars ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  {t('loadMoreCalendars')}
                </span>
              ) : (
                t('loadMoreCalendars')
              )}
            </Button>
          )}
        </div>
        <div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onDisconnect}
            disabled={isDisconnecting}
          >
            {isDisconnecting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                {t('disconnect')}
              </span>
            ) : (
              t('disconnect')
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
