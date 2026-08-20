'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Spinner } from '@/shared/components/atoms/ui/spinner';

import type { SlackIntegration } from '../../types';
import { SlackWorkspaceInfo } from '../molecules';

export default function SlackIntegrationActiveState({
  integration,
  onTestMessage,
  isSendingTestMessage,
  onChangeChannel,
  onDisconnect,
  isDisconnecting,
  t,
}: {
  integration: SlackIntegration;
  onTestMessage: () => void;
  isSendingTestMessage: boolean;
  onChangeChannel: () => void;
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
        <SlackWorkspaceInfo
          workspaceName={integration.workspaceName}
          status={integration.status}
          statusLabel={t('statusActive')}
        />
        <p className="text-muted-foreground text-sm">
          {t('selectedChannel')}:{' '}
          <span className="text-foreground font-medium">
            #{integration.channelName}
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            size="sm"
            onClick={onTestMessage}
            disabled={isSendingTestMessage}
          >
            {isSendingTestMessage ? (
              <span className="flex items-center gap-2">
                <Spinner />
                {t('sendTestMessage')}
              </span>
            ) : (
              t('sendTestMessage')
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onChangeChannel}
          >
            {t('changeChannel')}
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
