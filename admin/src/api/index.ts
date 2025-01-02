import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });

export function defineBearerToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
