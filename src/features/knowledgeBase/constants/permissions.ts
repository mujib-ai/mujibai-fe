export const KNOWLEDGE_BASE_PERMISSIONS = {
  VIEW: 'knowledge_base.view',
  SETTINGS_UPDATE: 'knowledge_base.settings.update',
  SOURCE_CREATE: 'knowledge_source.create',
  SOURCE_VIEW: 'knowledge_source.view',
  SOURCE_UPDATE: 'knowledge_source.update',
  SOURCE_RETRY: 'knowledge_source.retry',
  SOURCE_DELETE: 'knowledge_source.delete',
} as const;

export type KnowledgeBasePermission =
  (typeof KNOWLEDGE_BASE_PERMISSIONS)[keyof typeof KNOWLEDGE_BASE_PERMISSIONS];
