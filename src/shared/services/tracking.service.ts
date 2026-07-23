import { AxiosAPI } from '@/shared/utils/axiosInstance';
import type { DeviceInfo } from '@/shared/utils/getDeviceInfo';

export interface TrackVisitPayload extends DeviceInfo {
  pageUrl: string;
}

export class TrackingService {
  static async trackVisit(payload: TrackVisitPayload): Promise<void> {
    await AxiosAPI.post('/tracking/visits', payload);
  }
}
