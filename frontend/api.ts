import axios, { AxiosRequestConfig } from 'axios';
import { store } from './store/store';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const state = store.getState();
  console.log(state);
  const token = state.auth.token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default api;