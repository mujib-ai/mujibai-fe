'use client';

import ApiKeysHeader from '../molecules/ApiKeysHeader';
import ApiKeysTable from './ApiKeysTable';
import NoApiKeysCard from '../molecules/NoApiKeysCard';
import type { ApiKey } from '../../types';
import { useTranslations } from 'next-intl';

interface ApiKeysContentProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
  error: string | null;
  onCreateNewKey: () => void;
  onEditKey: (apiKey: ApiKey) => void;
  onDeleteKey: (apiKey: ApiKey) => void;
  onRevokeKey: (id: string) => void;
  locale: string;
  translations: {
    viewUsage: string;
    usagePage: string;
    createNewSecretKey: string;
    name: string;
    secretKey: string;
    createdOn: string;
    lastUsed: string;
    actions: string;
    status: string;
    noApiKeysAvailable: string;
    startByAddingYourFirstApiKey: string;
  };
}

export default function ApiKeysContent({
  apiKeys,
  isLoading,
  error,
  onCreateNewKey,
  onEditKey,
  onDeleteKey,
  onRevokeKey,
  locale,
  translations,
}: ApiKeysContentProps) {
  const t = useTranslations('APIKeys');

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading...</div>
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
      {apiKeys.length > 0 ? (
        <ApiKeysTable
          apiKeys={apiKeys}
          onEdit={onEditKey}
          onDelete={onDeleteKey}
          onRevoke={onRevokeKey}
          locale={locale}
          headers={{
            name: translations.name,
            secretKey: translations.secretKey,
            createdOn: translations.createdOn,
            lastUsed: translations.lastUsed,
            status: translations.status,
            actions: translations.actions,
          }}
        />
      ) : (
        <NoApiKeysCard
          title={t('title')}
          heading={translations.noApiKeysAvailable}
          description={translations.startByAddingYourFirstApiKey}
          locale={locale}
        />
      )}
    </div>
  );
}
