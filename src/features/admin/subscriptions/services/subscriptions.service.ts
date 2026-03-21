import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type {
  Subscription,
  SubscriptionsListParams,
  SubscriptionsListResponse,
} from '../types';

/** Normalize subscription item - handles API returning plan as object or string */
function mapSubscription(item: Record<string, unknown>): Subscription {
  const plan =
    typeof item.plan === 'object' && item.plan !== null && 'name' in item.plan
      ? String((item.plan as { name: string }).name)
      : String(item.plan ?? '');
  return {
    id: item.id as string | number,
    name: String(item.name ?? ''),
    email: String(item.email ?? ''),
    plan,
    clientUsage: Number(item.clientUsage ?? item.client_usage ?? 0),
  };
}

export class SubscriptionsService {
  static async getSubscriptions(
    params?: SubscriptionsListParams
  ): Promise<SubscriptionsListResponse> {
    const { data } = await AxiosAPI.get<SubscriptionsListResponse>(
      '/subscriptions',
      { params }
    );
    if (data?.data?.items) {
      data.data.items = data.data.items.map(item =>
        mapSubscription(item as unknown as Record<string, unknown>)
      );
    }
    return data;
  }
}
