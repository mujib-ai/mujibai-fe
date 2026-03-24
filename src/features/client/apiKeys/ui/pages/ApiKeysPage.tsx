'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useApiKeys } from '../../hooks';
import ApiKeysContent from '../organisms/ApiKeysContent';
import ApiKeysPageTemplate from '../templates/ApiKeysPageTemplate';
import { CreateApiKeyDialog, EditApiKeyDialog, DeleteApiKeyDialog } from '../molecules';
import type { ApiKey } from '../../types';

export default function ApiKeysPage() {
  const t = useTranslations('APIKeys');
  const locale = useLocale();
  const {
    apiKeys,
    isLoading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    revokeApiKey,
  } = useApiKeys();

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedApiKey, setSelectedApiKey] = React.useState<ApiKey | null>(null);

  const handleCreateNewKey = React.useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const handleEditKey = React.useCallback((apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setIsEditOpen(true);
  }, []);

  const handleDeleteKey = React.useCallback(
    (apiKey: ApiKey) => {
      setSelectedApiKey(apiKey);
      setIsDeleteOpen(true);
    },
    []
  );

  const handleRevokeKey = React.useCallback(
    async (id: string) => {
      await revokeApiKey(id);
    },
    [revokeApiKey]
  );

  const onCreateSubmit = async (data: { name: string }) => {
    await createApiKey({ ...data });
  };

  const onEditSubmit = async (id: string, data: { name: string }) => {
    await updateApiKey(id, data);
  };

  const onDeleteConfirm = async (id: string) => {
    await deleteApiKey(id);
  };

  return (
    <>
      <ApiKeysPageTemplate title={t('title')} subtitle={t('subTitle')}>
        <ApiKeysContent
          apiKeys={apiKeys}
          isLoading={isLoading}
          error={error}
          onCreateNewKey={handleCreateNewKey}
          onEditKey={handleEditKey}
          onDeleteKey={handleDeleteKey}
          onRevokeKey={handleRevokeKey}
          locale={locale}
          translations={{
            viewUsage: t('viewUsage'),
            usagePage: t('usagePage'),
            createNewSecretKey: t('createNewSecretKey'),
            name: t('name'),
            secretKey: t('secretKey'),
            createdOn: t('createdOn'),
            lastUsed: t('lastUsed'),
            status: t('status'),
            actions: t('actions'),
            noApiKeysAvailable: t('noApiKeysAvailable'),
            startByAddingYourFirstApiKey: t('startByAddingYourFirstApiKey'),
          }}
        />
      </ApiKeysPageTemplate>

      <CreateApiKeyDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={onCreateSubmit}
        isLoading={isLoading}
      />

      <EditApiKeyDialog
        apiKey={selectedApiKey}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedApiKey(null);
        }}
        onSubmit={onEditSubmit}
        isLoading={isLoading}
      />

      <DeleteApiKeyDialog
        apiKey={selectedApiKey}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedApiKey(null);
        }}
        onSubmit={onDeleteConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
