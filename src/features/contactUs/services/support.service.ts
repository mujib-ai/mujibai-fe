import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { SupportTicketResponse, SupportTicketValues } from '../types';

export const SupportService = {
  create: async (
    values: SupportTicketValues
  ): Promise<SupportTicketResponse> => {
    const { data } = await AxiosAPI.post<SupportTicketResponse>(
      '/support',
      values
    );
    return data;
  },
};
