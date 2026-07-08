import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { EnrollResponse, EnrollmentFormValues } from '../types';

export const EnrollService = {
  create: async (
    values: EnrollmentFormValues
  ): Promise<EnrollResponse> => {
    const { data } = await AxiosAPI.post<EnrollResponse>('/enroll', values);
    return data;
  },
};
