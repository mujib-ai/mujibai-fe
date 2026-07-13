'use client';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

import type { ApiKeyPublic } from '../../types';
import ApiKeysHeader from '../molecules/ApiKeysHeader';
import ApiKeysTable from './ApiKeysTable';

interface ApiKeysContentProps {
  apiKeys: ApiKeyPublic[];
  isLoading: boolean;
  error: string | null;
  onCreateNewKey: () => void;
  onEditKey: (apiKey: ApiKeyPublic) => void;
  onRotateKey: (apiKey: ApiKeyPublic) => void;
  onRevokeKey: (apiKey: ApiKeyPublic) => void;
  locale: string;
  translations: {
    viewUsage: string;
    usagePage: string;
    createNewSecretKey: string;
    name: string;
    secretKey: string;
    environment: string;
    status: string;
    scopes: string;
    createdOn: string;
    expiresAt: string;
    lastUsed: string;
    actions: string;
    errorPrefix: string;
    empty: string;
  };
}

export default function ApiKeysContent({
  apiKeys,
  isLoading,
  error,
  onCreateNewKey,
  onEditKey,
  onRotateKey,
  onRevokeKey,
  locale,
  translations,
}: ApiKeysContentProps) {
  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">
          {translations.errorPrefix}
          {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ApiKeysHeader
        onCreateNewKey={onCreateNewKey}
        viewUsageText={translations.viewUsage}
        usagePageText={translations.usagePage}
        createNewSecretKeyText={translations.createNewSecretKey}
      />
      {apiKeys.length === 0 ? (
        <div className="text-muted-foreground flex h-64 items-center justify-center">
          {translations.empty}
        </div>
      ) : (
        <ApiKeysTable
          apiKeys={apiKeys}
          onEdit={onEditKey}
          onRotate={onRotateKey}
          onRevoke={onRevokeKey}
          locale={locale}
          headers={{
            name: translations.name,
            secretKey: translations.secretKey,
            environment: translations.environment,
            status: translations.status,
            scopes: translations.scopes,
            createdOn: translations.createdOn,
            expiresAt: translations.expiresAt,
            lastUsed: translations.lastUsed,
            actions: translations.actions,
          }}
        />
      )}
    </div>
  );
}
