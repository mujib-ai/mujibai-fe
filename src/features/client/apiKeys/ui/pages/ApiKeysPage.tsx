'use client';

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useApiKeys } from '../../hooks';
import type { ApiKeyPublic, ApiKeyScope } from '../../types';
import ApiKeysContent from '../organisms/ApiKeysContent';
import CreateApiKeyDialog from '../organisms/CreateApiKeyDialog';
import EditApiKeyDialog from '../organisms/EditApiKeyDialog';
import RevealApiKeySecretDialog from '../organisms/RevealApiKeySecretDialog';
import RevokeApiKeyDialog from '../organisms/RevokeApiKeyDialog';
import ApiKeysPageTemplate from '../templates/ApiKeysPageTemplate';

export default function ApiKeysPage() {
  const t = useTranslations('APIKeys');
  const locale = useLocale();
  const {
    apiKeys,
    isLoading,
    error,
    createApiKey,
    createLoading,
    updateName,
    updateNameLoading,
    updateScopes,
    updateScopesLoading,
    updateExpiration,
    updateExpirationLoading,
    rotateApiKey,
    revokeApiKey,
    revokeLoading,
  } = useApiKeys();

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editingKey, setEditingKey] = React.useState<ApiKeyPublic | null>(null);
  const [revokingKey, setRevokingKey] = React.useState<ApiKeyPublic | null>(
    null
  );
  const [revealedSecret, setRevealedSecret] = React.useState<string | null>(
    null
  );

  const handleCreateSubmit = async (payload: {
    name: string;
    environment?: 'sandbox' | 'live';
    scopes?: ApiKeyScope[];
    expiresAt?: string;
  }) => {
    const result = await createApiKey(payload);
    setCreateOpen(false);
    setRevealedSecret(result.fullKey);
  };

  const handleEditSubmit = async (
    apiKeyId: string,
    changes: { name?: string; scopes?: ApiKeyScope[]; expiresAt?: string }
  ) => {
    if (changes.name !== undefined) {
      await updateName(apiKeyId, { name: changes.name });
    }
    if (changes.scopes !== undefined) {
      await updateScopes(apiKeyId, { scopes: changes.scopes });
    }
    if ('expiresAt' in changes) {
      await updateExpiration(apiKeyId, { expiresAt: changes.expiresAt });
    }
    setEditingKey(null);
  };

  const handleRotate = async (apiKey: ApiKeyPublic) => {
    const result = await rotateApiKey(apiKey.id);
    setRevealedSecret(result.fullKey);
  };

  const handleRevokeConfirm = async () => {
    if (!revokingKey) return;
    await revokeApiKey(revokingKey.id);
    setRevokingKey(null);
  };

  return (
    <ApiKeysPageTemplate title={t('title')} subtitle={t('subTitle')}>
      <ApiKeysContent
        apiKeys={apiKeys}
        isLoading={isLoading}
        error={error}
        onCreateNewKey={() => setCreateOpen(true)}
        onEditKey={setEditingKey}
        onRotateKey={handleRotate}
        onRevokeKey={setRevokingKey}
        locale={locale}
        translations={{
          viewUsage: t('viewUsage'),
          usagePage: t('usagePage'),
          createNewSecretKey: t('createNewSecretKey'),
          name: t('name'),
          secretKey: t('secretKey'),
          environment: t('environment'),
          status: t('status'),
          scopes: t('scopesLabel'),
          createdOn: t('createdOn'),
          expiresAt: t('create.expiresAt'),
          lastUsed: t('lastUsed'),
          actions: t('actions'),
          errorPrefix: t('errorPrefix'),
          empty: t('empty'),
        }}
      />

      <CreateApiKeyDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        loading={createLoading}
      />

      <EditApiKeyDialog
        apiKey={editingKey}
        onClose={() => setEditingKey(null)}
        onSubmit={handleEditSubmit}
        loading={
          updateNameLoading || updateScopesLoading || updateExpirationLoading
        }
      />

      <RevokeApiKeyDialog
        apiKey={revokingKey}
        onClose={() => setRevokingKey(null)}
        onConfirm={handleRevokeConfirm}
        loading={revokeLoading}
      />

      <RevealApiKeySecretDialog
        open={!!revealedSecret}
        onClose={() => setRevealedSecret(null)}
        fullKey={revealedSecret}
      />
    </ApiKeysPageTemplate>
  );
}
