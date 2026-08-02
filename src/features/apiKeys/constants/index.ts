import type { ApiKeyEnvironment, ApiKeyScope, ApiKeyStatus } from '../types';

export const API_KEY_SCOPES: ApiKeyScope[] = [
  'voice:use',
  'landing-chat:use',
  'post-call-analysis:use',
  'tickets:create',
];

export const API_KEY_ENVIRONMENTS: ApiKeyEnvironment[] = ['sandbox', 'live'];

export const API_KEYS_CONSTANTS = {
  DEFAULT_ENVIRONMENT: 'live' as ApiKeyEnvironment,
  STATUS_BADGE_VARIANT: {
    active: 'default',
    revoked: 'destructive',
    expired: 'secondary',
  } satisfies Record<ApiKeyStatus, 'default' | 'destructive' | 'secondary'>,
} as const;
