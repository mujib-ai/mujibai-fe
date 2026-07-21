'use client';

import type { ComponentType } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Card, Skeleton } from '@heroui/react';
import {
  AlertTriangle,
  CircleCheck,
  Database,
  FileStack,
  Layers,
  Loader2,
} from 'lucide-react';

import type { KnowledgeBaseStats as KnowledgeBaseStatsType } from '../../types';
import { formatDate } from '../../utils/format-date';

const SKELETON_BAR = 'rounded-md bg-black/10 dark:bg-white/10';

interface KnowledgeBaseStatsProps {
  stats: KnowledgeBaseStatsType | undefined;
  isLoading: boolean;
}

interface StatTile {
  key: string;
  labelKey: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
}

export default function KnowledgeBaseStats({
  stats,
  isLoading,
}: KnowledgeBaseStatsProps) {
  const t = useTranslations('KnowledgeBase.stats');
  const locale = useLocale();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            animationType="none"
            className={`${SKELETON_BAR} h-24 w-full rounded-xl`}
          />
        ))}
      </div>
    );
  }

  const tiles: StatTile[] = [
    {
      key: 'total',
      labelKey: 'totalSources',
      value: stats.totalSources,
      icon: Database,
    },
    {
      key: 'ready',
      labelKey: 'readySources',
      value: stats.readySources,
      icon: CircleCheck,
    },
    {
      key: 'processing',
      labelKey: 'processingSources',
      value: stats.processingSources,
      icon: Loader2,
    },
    {
      key: 'failed',
      labelKey: 'failedSources',
      value: stats.failedSources,
      icon: AlertTriangle,
    },
    {
      key: 'documents',
      labelKey: 'totalDocuments',
      value: stats.totalDocuments,
      icon: FileStack,
    },
    {
      key: 'chunks',
      labelKey: 'totalChunks',
      value: stats.totalChunks,
      icon: Layers,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tiles.map(tile => (
        <Card
          key={tile.key}
          className="bg-card text-card-foreground flex flex-col gap-2 rounded-xl border py-4 shadow-sm"
        >
          <Card.Header className="flex flex-row items-center justify-between gap-2 px-4">
            <Card.Title className="text-muted-foreground text-xs font-medium">
              {t(tile.labelKey)}
            </Card.Title>
            <tile.icon className="text-muted-foreground size-4" aria-hidden />
          </Card.Header>
          <Card.Content className="px-4">
            <p className="text-2xl font-semibold">{tile.value}</p>
          </Card.Content>
        </Card>
      ))}
      <Card className="bg-card text-card-foreground col-span-2 flex flex-col gap-2 rounded-xl border py-4 shadow-sm sm:col-span-1 lg:col-span-2">
        <Card.Header className="px-4">
          <Card.Title className="text-muted-foreground text-xs font-medium">
            {t('lastSuccessfulIngestion')}
          </Card.Title>
        </Card.Header>
        <Card.Content className="px-4">
          <p className="text-sm font-semibold">
            {stats.lastSuccessfulIngestionAt
              ? formatDate(stats.lastSuccessfulIngestionAt, locale)
              : t('never')}
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
