import { AxiosAPI } from '@/shared/utils/axiosInstance';
import type {
  UpdateProfileDto,
  ChangePasswordDto,
  ChangeEmailDto,
  VerifyOtpDto,
} from '../types';

export const SettingsService = {
  updateProfile: async (dto: UpdateProfileDto) => {
    const { data } = await AxiosAPI.patch('/tenants/settings/profile', dto);
    return data;
  },
  changePassword: async (dto: ChangePasswordDto) => {
    const { data } = await AxiosAPI.patch('/tenants/settings/change-password', dto);
    return data;
  },
  requestChangeEmail: async (dto: ChangeEmailDto) => {
    const { data } = await AxiosAPI.patch(
      '/tenants/settings/email/request-change',
      dto
    );
    return data;
  },
  verifyOtp: async (dto: VerifyOtpDto) => {
    const { data } = await AxiosAPI.patch(
      '/tenants/settings/email/verify-otp',
      dto
    );
    return data;
  },
};
