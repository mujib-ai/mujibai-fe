export interface SupportTicketValues {
  name: string;
  email: string;
  message: string;
}

export interface SupportTicketResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApiErrorResponse {
  message?: string;
}
