import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
}

export function getErrorMessage(
  error: unknown,
  defaultMessage: string
): string {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
}
