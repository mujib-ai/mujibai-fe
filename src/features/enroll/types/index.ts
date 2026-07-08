export interface EnrollmentFormValues {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  planId: string;
}

export interface EnrollResponse {
  data: unknown;
  message?: string;
}

export interface ApiErrorResponse {
  message?: string;
}
