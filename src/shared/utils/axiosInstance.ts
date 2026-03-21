import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(^| )access_token=([^;]+)')
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export const AxiosAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

AxiosAPI.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
