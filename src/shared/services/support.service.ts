import type {
  SupportTicketResponse,
  SupportTicketValues,
} from '@/shared/types/support';
import { AxiosAPI } from '@/shared/utils/axiosInstance';

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
