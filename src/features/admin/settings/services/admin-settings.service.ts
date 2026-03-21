import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { UpdateAdminSettingsPayload } from '../types';

export const AdminSettingsService = {
  update: async (payload: UpdateAdminSettingsPayload) => {
    const { data } = await AxiosAPI.patch('/admin-settings', payload);
    return data;
  },
};
