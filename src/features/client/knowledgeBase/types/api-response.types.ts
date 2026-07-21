export interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiErrorData {
  message?: string;
  code?: string;
  existingSourceId?: string;
  existingSourceName?: string;
}
