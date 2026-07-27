import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { GenerateTTSDto } from '../types';

export class TTSService {
  static async generate(payload: GenerateTTSDto): Promise<Blob> {
    const { data } = await AxiosAPI.post<Blob>('/ai/tts', payload, {
      responseType: 'blob',
    });
    return data;
  }
}
