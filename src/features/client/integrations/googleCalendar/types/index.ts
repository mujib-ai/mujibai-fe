export type GoogleCalendarIntegrationStatus =
  | 'disconnected'
  | 'connected'
  | 'active'
  | 'error';

export interface GoogleCalendarIntegration {
  status: GoogleCalendarIntegrationStatus;
  connectedAt: string | null;
  calendarId: string | null;
  calendarName: string | null;
  errorMessage: string | null;
}

export interface GoogleCalendarCalendar {
  id: string;
  name: string;
  isPrimary: boolean;
}

export interface GoogleCalendarCalendarsPage {
  calendars: GoogleCalendarCalendar[];
  nextCursor: string | null;
}

export interface GoogleCalendarOAuthStart {
  authorizationUrl: string;
}
