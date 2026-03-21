export interface EnrollmentFormValues {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  planId: string;
}

export interface EnrollResponse {
  data: unknown;
  message?: string;
}

export enum EnrollStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const ENROLL_STATUS_STYLE_MAP: Record<EnrollStatus, string> = {
  [EnrollStatus.PENDING]: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
  [EnrollStatus.APPROVED]: 'bg-green-500/20 text-green-600 dark:text-green-400',
  [EnrollStatus.REJECTED]: 'bg-red-500/20 text-red-600 dark:text-red-400',
};

export interface ApiErrorResponse {
  message?: string;
}

export interface Enroll {
  id: string | number;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: EnrollStatus;
  submittedOn?: string;
  createdAt?: string;
}

export const SORT_BY_VALUES = [
  'createdAt',
  'name',
  'email',
  'company',
  'status',
] as const;

export const SORT_ORDER_VALUES = ['asc', 'desc'] as const;

export type SortBy = (typeof SORT_BY_VALUES)[number];
export type SortOrder = (typeof SORT_ORDER_VALUES)[number];

export interface EnrollmentsListParams {
  q?: string;
  status?: EnrollStatus;
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface EnrollmentsListResponse {
  data: {
    data: Enroll[];
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
