import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AxiosAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});
