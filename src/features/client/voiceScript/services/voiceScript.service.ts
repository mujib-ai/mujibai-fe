import { AxiosAPI } from '@/shared/utils/axiosInstance';

export interface VoiceScriptValues {
  question: string;
  answer: string;
  questionVariants: string[];
  keywords: string[];
  priority: number;
}

export interface VoiceScript extends VoiceScriptValues {
  id: string | number;
}

export const VoiceScriptService = {
  create: async (values: VoiceScriptValues) => {
    const { data } = await AxiosAPI.post('/scripts', values);
    return data;
  },

  getAll: async () => {
    const { data } = await AxiosAPI.get<{data: VoiceScript[]}>('/scripts');
    return data.data;
  },

  update: async (id: string | number, values: Partial<VoiceScriptValues>) => {
    const { data } = await AxiosAPI.patch(`/scripts/${id}`, values);
    return data;
  },

  delete: async (id: string | number) => {
    const { data } = await AxiosAPI.delete(`/scripts/${id}`);
    return data;
  },
};
