'use client';

import type { ApiKey } from '../../types';
import ApiKeysHeader from '../molecules/ApiKeysHeader';
import ApiKeysTable from './ApiKeysTable';

interface ApiKeysContentProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
  error: string | null;
  onCreateNewKey: () => void;
  onEditKey: (apiKey: ApiKey) => void;
  onDeleteKey: (apiKey: ApiKey) => void;
  locale: string;
  translations: {
    viewUsage: string;
    usagePage: string;
    createNewSecretKey: string;
    name: string;
    secretKey: string;
    createdOn: string;
    createdBy: string;
    lastUsed: string;
    permission: string;
    actions: string;
  };
}

export default function ApiKeysContent({
  apiKeys,
  isLoading,
  error,
  onCreateNewKey,
  onEditKey,
  onDeleteKey,
  locale,
  translations,
}: ApiKeysContentProps) {
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
      <ApiKeysTable
        apiKeys={apiKeys}
        onEdit={onEditKey}
        onDelete={onDeleteKey}
        locale={locale}
        headers={{
          name: translations.name,
          secretKey: translations.secretKey,
          createdOn: translations.createdOn,
          createdBy: translations.createdBy,
          lastUsed: translations.lastUsed,
          permission: translations.permission,
          actions: translations.actions,
        }}
      />
    </div>
  );
}
