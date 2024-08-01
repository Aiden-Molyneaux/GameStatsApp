import api from './api';
import * as Keychain from 'react-native-keychain';

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

export async function loginUser(username: string, password: string): Promise<LoginResponse | void> {  
  try {
    const response = await api.post<LoginResponse>('api/auth/login', { username, password });
    const { token, user } = response.data;
  
    return { token, user };
  } catch (error) {
    return console.error(`Error: Invalid credentials, \n${error}`);
  }
};

export async function logoutUser(): Promise<void> {
  await Keychain.resetGenericPassword();
};

export async function registerUser(username: string, password: string): Promise<LoginResponse | void> {  
  try {
    const response = await api.post<LoginResponse>('api/auth/register', { username, password });
    const { token, user } = response.data;
  
    return { token, user };
  } catch (error) {
    return console.error(`Error: Failed registration, \n${error}`);
  }
};