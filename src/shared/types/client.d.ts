export interface Client {
  id: string;

  name: string;

  description: string;

  domain: string;

  industry: string;

  size: string;

  address: string;

  email: string;

  phone: string;

  website: string;

  commercialRegister: string;

  taxId: string;

  isActive: boolean;

  planId: string | null;

  subscriptionActive: boolean;

  subscriptionExpireAt: string | null;

  createdAt: string;

  updatedAt: string;

  deletedAt: string | null;

  emailNotification: boolean;

  performanceReports: boolean;

  planUsageAlert: boolean;

  ticketEscalationAlert: boolean;

  integrationGoogleCalendar: boolean;

  googleCalendarAccessToken: string | null;

  googleCalendarRefreshToken: string | null;

  googleCalendarCalendarId: string | null;

  googleCalendarExpiryDate: string | null;

  googleCalendarTimeZone: string | null;

  integrationSlack: boolean;

  slackAccessToken: string | null;

  slackTeamId: string | null;

  slackUserId: string | null;

  slackChannel: string | null;

  integrationWhatsapp: boolean;

  whatsappOtp: string | null;
}

export interface CreateClientPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  address?: string;
  website?: string;
  industry?: string;
  planId: string;
  size?: string;
  commercialRegister?: string;
  taxId?: string;
  description?: string;
}

export interface UpdateClientPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  website?: string;
  industry?: string;
  planId?: string;
  size?: string;
  commercialRegister?: string;
  taxId?: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export interface ClientResponse {
  data: Client;
  message?: string;
  statusCode?: number;
}

export interface ClientsListResponse {
  data: {
    items: Client[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string | null;
  statusCode?: number;
}

export interface ClientFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  planId?: string;
  page?: number;
  limit?: number;
}
