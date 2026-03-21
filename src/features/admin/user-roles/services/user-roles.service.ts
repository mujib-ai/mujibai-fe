import { AxiosAPI } from '@/shared/utils/axiosInstance';

import {
  StatusEnum,
  type AdminUsersListMeta,
  type AdminUsersListResponse,
  type GetAdminUsersParams,
  type UserWithRole,
} from '../types';

function mapAdminUser(item: Record<string, unknown>): UserWithRole {
  const firstName = String(item.firstName ?? item.first_name ?? '');
  const lastName = String(item.lastName ?? item.last_name ?? '');
  const name =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : String(item.name ?? '');
  const status = StatusEnum.ACTIVE ? StatusEnum.ACTIVE : StatusEnum.INACTIVE;
  const startDate =
    (item.lastActive as string) ??
    (item.last_active as string) ??
    (item.updatedAt as string) ??
    (item.updated_at as string) ??
    (item.createdAt as string) ??
    (item.created_at as string) ??
    '';

  return {
    id: (item.id as number) ?? 0,
    name,
    company: item.company as string | undefined,
    email: String(item.email ?? ''),
    phone: String(item.phone ?? item.phoneNumber ?? item.phone_number ?? ''),
    role: String(item.role ?? ''),
    status,
    users: item.users as number | undefined,
    startDate,
  };
} 

export interface CreateUserRolePayload {
  name: string;
  email: string;
  password: string;
}

export const UserRolesService = {
  create: async (payload: CreateUserRolePayload) => {
    const { data } = await AxiosAPI.post('/user-role', payload);
    return data;
  },

  updateStatus: async (
    id: number,
    status: 'ACTIVE' | 'INACTIVE'
  ) => {
    const { data } = await AxiosAPI.patch(`/user-role/${id}`, { status });
    return data;
  },

  delete: async (id: number) => {
    const { data } = await AxiosAPI.delete(`/user-role/${id}`);
    return data;
  },

  getAdminUsers: async (
    params?: GetAdminUsersParams
  ): Promise<AdminUsersListResponse> => {
    const { data } = await AxiosAPI.get<AdminUsersListResponse>('/user-role', {
      params,
    });

    const raw = data?.data as { items?: unknown[]; data?: unknown[] } | undefined;
    const list = raw?.items ?? raw?.data ?? [];
    const mapped = list.map((item: unknown) =>
      mapAdminUser(item as Record<string, unknown>)
    );

    return {
      ...data,
      data: {
        items: mapped,
        meta: (data?.data as { meta?: AdminUsersListMeta })?.meta ?? {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      },
    } as AdminUsersListResponse;
  },
};
