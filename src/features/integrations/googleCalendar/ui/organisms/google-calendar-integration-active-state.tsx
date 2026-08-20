'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Spinner } from '@/shared/components/atoms/ui/spinner';

import type { GoogleCalendarIntegration } from '../../types';
import { GoogleCalendarConnectionInfo } from '../molecules';

export default function GoogleCalendarIntegrationActiveState({
  integration,
  onTestEvent,
  isSendingTestEvent,
  onChangeCalendar,
  onDisconnect,
  isDisconnecting,
  t,
}: {
  integration: GoogleCalendarIntegration;
  onTestEvent: () => void;
  isSendingTestEvent: boolean;
  onChangeCalendar: () => void;
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
          statusLabel={t('statusActive')}
        />
        <p className="text-muted-foreground text-sm">
          {t('selectedCalendar')}:{' '}
          <span className="text-foreground font-medium">
            {integration.calendarName}
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            size="sm"
            onClick={onTestEvent}
            disabled={isSendingTestEvent}
          >
            {isSendingTestEvent ? (
              <span className="flex items-center gap-2">
                <Spinner />
                {t('sendTestEvent')}
              </span>
            ) : (
              t('sendTestEvent')
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onChangeCalendar}
          >
            {t('changeCalendar')}
          </Button>
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
