import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: 'http://192.168.68.59:5000',
  validateStatus: () => true
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const state = store.getState();
  const token = state.authData.token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default api;