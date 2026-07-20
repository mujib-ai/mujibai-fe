import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { VoiceOption } from '../constants';

export interface TextToSpeechDto {
  text: string;
  voice: VoiceOption;
}

export class VoiceScriptService {
  static async textToSpeech(payload: TextToSpeechDto): Promise<Blob> {
    const { data } = await AxiosAPI.post<Blob>('/ai/tts', payload, {
      responseType: 'blob',
    });
    return data;
  }
}
