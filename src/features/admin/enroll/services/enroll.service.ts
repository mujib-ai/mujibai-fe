import { AxiosAPI } from '@/shared/utils/axiosInstance';

import {
  EnrollStatus,
  type Enroll,
  type EnrollResponse,
  type EnrollmentFormValues,
  type EnrollmentsListParams,
  type EnrollmentsListResponse,
} from '../types';

const ENROLL_STATUS_VALUES = Object.values(EnrollStatus);

function mapEnroll(item: Record<string, unknown>): Enroll {
  const submittedOn =
    (item.submittedOn as string) ??
    (item.submitted_on as string) ??
    (item.createdAt as string) ??
    (item.created_at as string) ??
    '';
  const rawStatus = item.status as string;
  const status = ENROLL_STATUS_VALUES.includes(rawStatus as EnrollStatus)
    ? (rawStatus as EnrollStatus)
    : EnrollStatus.PENDING;
  return {
    id: item.id as string | number,
    name: String(item.name ?? ''),
    company: String(item.company ?? ''),
    email: String(item.email ?? ''),
    phone: String(item.phone ?? ''),
    industry: String(item.industry ?? ''),
    status,
    submittedOn,
  };
}

export const EnrollService = {
  create: async (
    values: EnrollmentFormValues
  ): Promise<EnrollResponse> => {
    const { data } = await AxiosAPI.post<EnrollResponse>('/enroll', values);
    return data;
  },

  getById: async (id: string | number): Promise<Enroll> => {
    const { data } = await AxiosAPI.get<{ data?: Record<string, unknown> }>(
      `/enroll/${id}`
    );
    const raw = (data as Record<string, unknown>)?.data ?? data ?? {};
    return mapEnroll(raw as Record<string, unknown>);
  },

  getEnrollments: async (
    params?: EnrollmentsListParams
  ): Promise<EnrollmentsListResponse> => {
    const { data } = await AxiosAPI.get<EnrollmentsListResponse>('/enroll', {
      params,
    });
    if (data?.data?.data) {
      data.data.data = data.data.data.map(item =>
        mapEnroll(item as unknown as Record<string, unknown>)
      );
    }
    return data;
  },

  approve: async (id: string | number): Promise<EnrollResponse> => {
    const { data } = await AxiosAPI.patch<EnrollResponse>(`/enroll/${id}/approve`);
    return data;
  },

  reject: async (id: string | number): Promise<EnrollResponse> => {
    const { data } = await AxiosAPI.patch<EnrollResponse>(`/enroll/${id}/reject`);
    return data;
  },

  delete: async (id: string | number): Promise<EnrollResponse> => {
    const { data } = await AxiosAPI.delete<EnrollResponse>(`/enroll/${id}`);
    return data;
  },
};
