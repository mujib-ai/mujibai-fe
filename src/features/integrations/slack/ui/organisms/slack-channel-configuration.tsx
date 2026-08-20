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

import type { SlackChannel, SlackIntegration } from '../../types';
import { SlackChannelSelector, SlackWorkspaceInfo } from '../molecules';

export default function SlackChannelConfiguration({
  integration,
  channels,
  isLoadingChannels,
  onSelectChannel,
  isSelectingChannel,
  onRefreshChannels,
  hasMoreChannels,
  onLoadMoreChannels,
  isLoadingMoreChannels,
  onDisconnect,
  isDisconnecting,
  t,
}: {
  integration: SlackIntegration;
  channels: SlackChannel[];
  isLoadingChannels: boolean;
  onSelectChannel: (channelId: string) => void;
  isSelectingChannel: boolean;
  onRefreshChannels: () => void;
  hasMoreChannels: boolean;
  onLoadMoreChannels: () => void;
  isLoadingMoreChannels: boolean;
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
          statusLabel={t('statusConnected')}
        />
        <p className="text-muted-foreground text-sm">
          {t('selectChannelPrompt')}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <SlackChannelSelector
            channels={channels}
            value={integration.channelId}
            onChange={onSelectChannel}
            placeholder={t('channelPlaceholder')}
            disabled={isSelectingChannel || isLoadingChannels}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRefreshChannels}
            disabled={isLoadingChannels}
          >
            {isLoadingChannels ? <Spinner /> : <RefreshCw className="size-4" />}
            {t('refreshChannels')}
          </Button>
          {hasMoreChannels && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onLoadMoreChannels}
              disabled={isLoadingMoreChannels}
            >
              {isLoadingMoreChannels ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  {t('loadMoreChannels')}
                </span>
              ) : (
                t('loadMoreChannels')
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
