export interface Subscription {
  id: string | number;
  name: string;
  email: string;
  plan: string;
  clientUsage: number;
}

/** Matches GetSubscriptionsDto from API */
export interface SubscriptionsListParams {
  /** Search by tenant name/email or plan title (case-insensitive) */
  q?: string;
  /** Filter by tenant ID */
  tenantId?: string;
  /** Filter by plan ID */
  planId?: string;
  /** Filter by active status */
  isActive?: boolean;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10, max: 100) */
  limit?: number;
}

export interface SubscriptionsListResponse {
  data: {
    items: Subscription[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string | null;
  statusCode?: number;
}
