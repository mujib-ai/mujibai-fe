export const CALL_STATUSES = ['answered', 'missed', 'failed'] as const;

export type CallStatus = (typeof CALL_STATUSES)[number];

export interface CallItem {
  id: string;
  phone: string;
  duration: string;
  scenario: string;
  date: string;
  status: CallStatus;
}

export interface CallListResponse {
  items: CallItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllCallsParams {
  page: number;
  limit: number;
  status?: CallStatus;
}
