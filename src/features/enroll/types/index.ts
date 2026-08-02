export interface EnrollmentFormValues {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  address: string;
  businessField: string;
  commercialRegister: string;
  taxNumber: string;
  message?: string;
}

export interface EnrollResponse {
  data: unknown;
  message?: string;
}

export interface ApiErrorResponse {
  message?: string;
}
