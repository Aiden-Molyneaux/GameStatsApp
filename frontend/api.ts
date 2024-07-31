import axios, { AxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${credentials.password}`,
    };
  }
  return config;
});

export default api;