import { useDispatch } from 'react-redux';
import api from './api';
import * as Keychain from 'react-native-keychain';
import { loginSuccess } from './store/authReducer';

interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
  favouriteGame: string | null;
  preferredPlatform: string | null;
  numberOfGames: number | null;
}

export interface LoginResponse {
  token: string;
  user: User;
  // Add other user data fields here if needed
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {  
  try {
    const response = await api.post<LoginResponse>('api/auth/login', { username, password });
    const { token, user } = response.data;
  
    return { token, user };
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export async function logoutUser(): Promise<void> {
  await Keychain.resetGenericPassword();
};