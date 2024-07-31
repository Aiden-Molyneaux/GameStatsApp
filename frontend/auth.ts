import api from './api';
import * as Keychain from 'react-native-keychain';

interface LoginResponse {
  token: string;
  // Add any other user data fields here
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('api/auth/login', { username, password });
    const { token } = response.data;
    await Keychain.setGenericPassword(username, token);
    
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export async function logoutUser(): Promise<void> {
  await Keychain.resetGenericPassword();
};