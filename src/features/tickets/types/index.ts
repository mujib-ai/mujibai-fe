export const TICKET_STATUSES = [
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export interface TicketItem {
  id: string;
  customer: string;
  phone: string;
  duration: string;
  scenario: string;
  date: string;
  status: TicketStatus;
}

export interface TicketListResponse {
  items: TicketItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetAllTicketsParams {
  page: number;
  limit: number;
  status?: TicketStatus;
}
