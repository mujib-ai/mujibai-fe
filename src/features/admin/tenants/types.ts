import type {
  Client,
  ClientResponse,
  ClientsListResponse,
  CreateClientPayload,
  UpdateClientPayload,
} from '@/shared/types';

export type {
  Client,
  ClientResponse,
  ClientsListResponse,
  CreateClientPayload,
  UpdateClientPayload,
};

export type TenantStatusFilter = 'all' | 'active' | 'disactive';

export interface TenantListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TenantStatusFilter;
}
