import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GetAllTicketsParams, TicketListResponse } from '../types';

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export class TicketService {
  static async getAllTickets(
    params: GetAllTicketsParams
  ): Promise<TicketListResponse> {
    const { data } = await AxiosAPI.get<ApiEnvelope<TicketListResponse>>(
      '/tickets',
      { params }
    );
    return data.data;
  }
}
