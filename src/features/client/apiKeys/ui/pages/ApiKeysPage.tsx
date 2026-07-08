'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { useApiKeys } from '../../hooks';
import ApiKeysContent from '../organisms/ApiKeysContent';
import ApiKeysPageTemplate from '../templates/ApiKeysPageTemplate';

export default function ApiKeysPage() {
  const t = useTranslations('APIKeys');
  const locale = useLocale();
  const {
    apiKeys,
    isLoading,
    error,
    createApiKey,
    deleteApiKey,
  } = useApiKeys();

  const handleCreateNewKey = React.useCallback(() => {
    createApiKey({ name: 'New API Key', permissions: ['All'] });
  }, [createApiKey]);

  const handleEditKey = React.useCallback((apiKey: { id: string }) => {
    console.log('Edit API key:', apiKey);
  }, []);

  const handleDeleteKey = React.useCallback(
    (apiKey: { id: string }) => {
      deleteApiKey(apiKey.id);
    },
    [deleteApiKey]
  );

  return (
    <ApiKeysPageTemplate title={t('title')} subtitle={t('subTitle')}>
      <ApiKeysContent
        apiKeys={apiKeys}
        isLoading={isLoading}
        error={error}
        onCreateNewKey={handleCreateNewKey}
        onEditKey={handleEditKey}
        onDeleteKey={handleDeleteKey}
        locale={locale}
        translations={{
          viewUsage: t('viewUsage'),
          usagePage: t('usagePage'),
          createNewSecretKey: t('createNewSecretKey'),
          name: t('name'),
          secretKey: t('secretKey'),
          createdOn: t('createdOn'),
          createdBy: t('createdBy'),
          lastUsed: t('lastUsed'),
          permission: t('permission'),
          actions: t('actions'),
        }}
      />
    </ApiKeysPageTemplate>
  );
}
