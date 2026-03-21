export type UserRole = 'ADMIN' | 'CLIENT';

export interface UserWithRole {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
  status: StatusEnum;
  startDate: string;
  users?: number;
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface GetAdminUsersParams {
  q?: string;
  page?: number;
  limit?: number;
}

export interface AdminUsersListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersListResponse {
  data: {
    items: UserWithRole[];
    meta: AdminUsersListMeta;
  };
  message?: string | null;
  statusCode?: number;
}
