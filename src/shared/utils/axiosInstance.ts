import { clearAuthTokens, getAccessToken } from '@/shared/lib/auth-token';
import axios from 'axios';

export const AxiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

AxiosAPI.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

AxiosAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) clearAuthTokens();
    return Promise.reject(error);
  }
);
