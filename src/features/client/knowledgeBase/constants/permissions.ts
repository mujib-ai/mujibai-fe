export const KNOWLEDGE_BASE_PERMISSIONS = {
  VIEW: 'knowledge_base.view',
  CREATE: 'knowledge_base.create',
  UPLOAD: 'knowledge_base.upload',
  UPDATE: 'knowledge_base.update',
  DELETE: 'knowledge_base.delete',
  RETRY: 'knowledge_base.retry',
} as const;

export type KnowledgeBasePermission =
  (typeof KNOWLEDGE_BASE_PERMISSIONS)[keyof typeof KNOWLEDGE_BASE_PERMISSIONS];
