'use client';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';

import { API_KEYS_CONSTANTS } from '../../constants';
import type { ApiKeyPublic } from '../../types';
import ApiKeyRowActions from '../atoms/ApiKeyRowActions';

interface ApiKeysCardListProps {
  apiKeys: ApiKeyPublic[];
  onEdit: (apiKey: ApiKeyPublic) => void;
  onRotate: (apiKey: ApiKeyPublic) => void;
  onRevoke: (apiKey: ApiKeyPublic) => void;
  headers: {
    name: string;
    secretKey: string;
    environment: string;
    status: string;
    scopes: string;
    createdOn: string;
    expiresAt: string;
    lastUsed: string;
  };
}

export default function ApiKeysCardList({
  apiKeys,
  onEdit,
  onRotate,
  onRevoke,
  headers,
}: ApiKeysCardListProps) {
  const t = useTranslations('APIKeys');

  return (
    <div className="my-10 flex flex-col gap-3">
      {apiKeys.map(apiKey => (
        <Card
          key={apiKey.id}
          className="border-0 bg-white shadow-none dark:bg-[#00143473]"
        >
          <CardContent className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-foreground text-base font-semibold">
                {apiKey.name}
              </span>
              <Badge
                variant={API_KEYS_CONSTANTS.STATUS_BADGE_VARIANT[apiKey.status]}
              >
                {t(`statuses.${apiKey.status}`)}
              </Badge>
            </div>

            <p className="text-muted-foreground font-mono text-xs">
              {apiKey.keyPrefix}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">{headers.environment}</p>
                <Badge variant="outline">
                  {t(`environments.${apiKey.environment}`)}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">{headers.createdOn}</p>
                <p className="text-foreground font-medium">
                  {new Date(apiKey.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">{headers.expiresAt}</p>
                <p className="text-foreground font-medium">
                  {apiKey.expiresAt
                    ? new Date(apiKey.expiresAt).toLocaleDateString()
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">{headers.lastUsed}</p>
                <p className="text-foreground font-medium">
                  {apiKey.lastUsedAt
                    ? new Date(apiKey.lastUsedAt).toLocaleDateString()
                    : t('lastUsedNever')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {headers.scopes}
              </p>
              <div className="flex flex-wrap gap-1">
                {apiKey.scopes.map(scope => (
                  <Badge key={scope} variant="secondary">
                    {t(`scopes.${scope}`)}
                  </Badge>
                ))}
              </div>
            </div>

            <ApiKeyRowActions
              apiKey={apiKey}
              onEdit={onEdit}
              onRotate={onRotate}
              onRevoke={onRevoke}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
