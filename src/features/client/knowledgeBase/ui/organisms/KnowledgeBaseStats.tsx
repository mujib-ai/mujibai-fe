'use client';

import type { ComponentType } from 'react';

import { useTranslations } from 'next-intl';

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

const STAT_TILE_KEYS = [
  'total',
  'completed',
  'processing',
  'failed',
  'documents',
  'chunks',
];

export default function KnowledgeBaseStats({
  stats,
  isLoading,
}: KnowledgeBaseStatsProps) {
  const t = useTranslations('KnowledgeBase.stats');

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {STAT_TILE_KEYS.map(key => (
          <>
            <Card
              key={key}
              className="flex min-h-32.25 min-w-45.25 flex-col gap-3 rounded-xl bg-[#FFFFFFBF] p-4 dark:bg-[#FFFFFF0F]"
            >
              <Card.Header className="flex flex-row items-center justify-between gap-2 px-4">
                <Skeleton
                  animationType="none"
                  className={`${SKELETON_BAR} h-3 w-16 rounded`}
                />
                <Skeleton
                  animationType="none"
                  className={`${SKELETON_BAR} size-4 rounded`}
                />
              </Card.Header>
              <Card.Content className="px-4">
                <Skeleton
                  animationType="none"
                  className={`${SKELETON_BAR} h-7 w-10 rounded`}
                />
              </Card.Content>
            </Card>
          </>
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
      key: 'completed',
      labelKey: 'completedSources',
      value: stats.completedSources,
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
          key={tile.labelKey}
          className="flex min-h-32.25 min-w-45.25 flex-col gap-3 rounded-xl bg-[#FFFFFFBF] p-4 dark:bg-[#FFFFFF0F]"
        >
          <Card.Header className="flex flex-row items-center justify-between gap-2 px-4">
            <Card.Title className="text-xs font-medium">
              {t(tile.labelKey)}
            </Card.Title>
            <tile.icon className="text-muted-foreground size-4" aria-hidden />
          </Card.Header>
          <Card.Content className="px-4">
            <p className="text-2xl font-semibold">{tile.value}</p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
