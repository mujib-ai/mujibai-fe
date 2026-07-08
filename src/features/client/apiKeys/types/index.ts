export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  lastUsed?: Date;
  expiresAt?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  lastUsed?: Date;
  expiresAt?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateApiKeyDto {
  name: string;
  permissions: string[];
  expiresAt?: Date;
}

export interface UpdateApiKeyDto {
  name?: string;
  permissions?: string[];
  isActive?: boolean;
  expiresAt?: Date;
}

export interface ApiKeyFilters {
  search?: string;
  isActive?: boolean;
  createdBy?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedApiKeysResponse {
  data: ApiKey[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiKeyUsage {
  id: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface ApiKeyUsageFilters {
  apiKeyId?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface ApiKeyUsageResponse {
  data: ApiKeyUsage[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
