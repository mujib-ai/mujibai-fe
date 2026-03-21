export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
  success?: boolean;
}

export enum PlanType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export interface Plan {
  id: string;
  title: string;
  price: number;
  features: string[];
  type: PlanType;
  createdAt: string;
  updatedAt: string;
  description?: string;
  isActive?: boolean;
}

export interface PlanDisplay {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  isPopular?: boolean;
}

export interface CreatePlanDto {
  title: string;
  description?: string;
  price: number;
  type: PlanType;
  features: string[];
}

export interface UpdatePlanDto {
  title?: string;
  description?: string;
  price?: number;
  type?: PlanType;
  features?: string[];
  isActive?: boolean;
}

export interface PlansFilters {
  title?: string;
  type?: PlanType;
  page?: number;
  limit?: number;
}

export interface PaginatedPlansResponse {
  items: Plan[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
