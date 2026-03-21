import {
  ApiResponse,
  CreatePlanDto,
  PaginatedPlansResponse,
  Plan,
  PlansFilters,
  UpdatePlanDto,
} from '../types';

import { AxiosAPI } from '@/shared/utils/axiosInstance';

const BASE_PATH = '/plans';

export const PlansService = {
  getAll: async (filters?: PlansFilters): Promise<ApiResponse<PaginatedPlansResponse>> => {
    const { data } = await AxiosAPI.get<ApiResponse<PaginatedPlansResponse>>(BASE_PATH, {
      params: filters,
    });
    return data;
  },

  create: async (payload: CreatePlanDto): Promise<ApiResponse<Plan>> => {
    const body: CreatePlanDto = {
      title: payload.title,
      price: payload.price,
      features: payload.features,
      type: payload.type,
    };

    const { data } = await AxiosAPI.post<ApiResponse<Plan>>(BASE_PATH, body);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await AxiosAPI.delete<ApiResponse<null>>(`${BASE_PATH}/${id}`);
    return data;
  },

  update: async (id: string, payload: UpdatePlanDto): Promise<ApiResponse<Plan>> => {
    const { data } = await AxiosAPI.patch<ApiResponse<Plan>>(`${BASE_PATH}/${id}`, payload);
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Plan>> => {
    const { data } = await AxiosAPI.get<ApiResponse<Plan>>(`${BASE_PATH}/${id}`);
    return data;
  },
};
