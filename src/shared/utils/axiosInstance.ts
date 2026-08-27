import axios from 'axios';

export const AxiosAPI = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_URL
      : '/api/backend',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});
