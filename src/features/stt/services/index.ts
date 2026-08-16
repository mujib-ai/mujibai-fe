import { AxiosAPI } from '@/shared/utils/axiosInstance';

import type { TranscribeResponseDto } from '../types';

export class STTService {
  static async transcribe(file: File | Blob): Promise<TranscribeResponseDto> {
    const formData = new FormData();
    formData.append(
      'audio',
      file,
      file instanceof File ? file.name : 'audio.wav'
    );

    const { data } = await AxiosAPI.post<TranscribeResponseDto>(
      '/public/landing-agent/speech-to-text',
      formData
    );
    return data;
  }
}
