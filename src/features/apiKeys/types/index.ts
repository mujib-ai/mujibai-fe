export type ApiKeyEnvironment = 'sandbox' | 'live';

export type ApiKeyStatus = 'active' | 'revoked' | 'expired';

export type ApiKeyScope =
  | 'voice:use'
  | 'landing-chat:use'
  | 'post-call-analysis:use'
  | 'tickets:create';

export interface ApiKeyPublic {
  id: string;
  publicId: string;
  keyPrefix: string;
  name: string;
  environment: ApiKeyEnvironment;
  status: ApiKeyStatus;
  scopes: ApiKeyScope[];
  expiresAt?: string;
  lastUsedAt?: string;
  lastUsedIp?: string;
  createdAt: string;
  updatedAt: string;
  revokedAt?: string;
}

export interface CreateApiKeyDto {
  name: string;
  environment?: ApiKeyEnvironment;
  scopes?: ApiKeyScope[];
  expiresAt?: string;
}

export interface ApiKeyCreatedResponse {
  apiKey: ApiKeyPublic;
  fullKey: string;
}

export interface UpdateApiKeyNameDto {
  name: string;
}

export interface UpdateApiKeyScopesDto {
  scopes: ApiKeyScope[];
}

export interface UpdateApiKeyExpirationDto {
  expiresAt?: string;
}
